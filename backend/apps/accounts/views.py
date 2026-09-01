from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model
from .models import UserRole
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .authentication import generate_tokens_for_user
from .permissions import IsSuperAdmin, IsOwnerOrStaff
from apps.audit.models import AuditLog, AuditAction

User = get_user_model()

# Mapping vai trò xác thực từ Database sang URL chuyển hướng máy chủ
ROLE_REDIRECT_MAP = {
    UserRole.STUDENT: '/portal/student',
    UserRole.TEACHER: '/portal/teacher',
    UserRole.ACADEMIC: '/portal/academic',
    UserRole.ADMIN: '/admin',
}

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # Học viên đăng ký tự do luôn nhận vai trò mặc định STUDENT
            user = serializer.save(role=UserRole.STUDENT)
            tokens = generate_tokens_for_user(user)

            # Ghi audit log
            AuditLog.objects.create(
                user=user,
                action=AuditAction.CREATE,
                resource_type='User',
                resource_id=str(user.id),
                ip_address=get_client_ip(request),
                details={'message': 'Đăng ký tài khoản học viên mới qua cổng công khai'}
            )

            return Response({
                'success': True,
                'message': 'Đăng ký tài khoản học viên thành công!',
                'user': UserSerializer(user).data,
                'tokens': tokens,
                'redirect_url': '/portal/student',
            }, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    # Alias
    def POST(self, request):
        return self.post(request)

class LoginView(APIView):
    """
    Cổng xác thực duy nhất cho toàn bộ hệ thống (Học viên, Giảng viên, Giáo vụ, Quản trị).
    Vai trò và quyền hạn được đọc 100% từ Database phía máy chủ.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data['username'].strip()
        password = serializer.validated_data['password']
        ip_addr = get_client_ip(request)

        user = authenticate(request, username=username, password=password)
        if not user:
            # Tìm theo email
            try:
                user_obj = User.objects.get(email__iexact=username)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None

        if not user:
            # Kiểm tra nếu tài khoản tồn tại và đúng mật khẩu nhưng đã bị khóa
            try:
                check_user = User.objects.filter(username=username).first() or User.objects.filter(email__iexact=username).first()
                if check_user and not check_user.is_active and check_user.check_password(password):
                    return Response({
                        'success': False,
                        'error': 'Tài khoản này đã bị khóa. Vui lòng liên hệ ban quản trị.'
                    }, status=status.HTTP_403_FORBIDDEN)
            except Exception:
                pass

            # Ghi nhận audit log đăng nhập thất bại
            AuditLog.objects.create(
                user=None,
                action=AuditAction.LOGIN,
                resource_type='Auth',
                resource_id=username[:50],
                ip_address=ip_addr,
                details={'status': 'FAILED', 'reason': 'Sai tài khoản hoặc mật khẩu'}
            )
            # Thông báo trung lập, không tiết lộ sự tồn tại của tài khoản
            return Response({
                'success': False,
                'error': 'Tài khoản hoặc mật khẩu không chính xác.'
            }, status=status.HTTP_401_UNAUTHORIZED)


        if not user.is_active:
            return Response({
                'success': False,
                'error': 'Tài khoản này đã bị khóa. Vui lòng liên hệ ban quản trị.'
            }, status=status.HTTP_403_FORBIDDEN)

        # Đọc vai trò thật từ database phía server (Tuyệt đối không nhận từ client)
        actual_role = user.role
        redirect_url = ROLE_REDIRECT_MAP.get(actual_role, '/portal/student')

        # Cấp token và tạo session
        tokens = generate_tokens_for_user(user)

        # Cập nhật thông tin đăng nhập
        if hasattr(user, 'profile'):
            user.profile.last_login_ip = ip_addr
            user.profile.save(update_fields=['last_login_ip'])

        # Ghi audit log đăng nhập thành công
        AuditLog.objects.create(
            user=user,
            action=AuditAction.LOGIN,
            resource_type='Auth',
            resource_id=str(user.id),
            ip_address=ip_addr,
            details={
                'status': 'SUCCESS',
                'role': actual_role,
                'redirect_url': redirect_url
            }
        )

        return Response({
            'success': True,
            'message': 'Xác thực thành công!',
            'user': UserSerializer(user).data,
            'tokens': tokens,
            'redirect_url': redirect_url,
        }, status=status.HTTP_200_OK)

class MeView(APIView):
    """Lấy thông tin hồ sơ của chính người dùng đã đăng nhập"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({
            'success': True,
            'user': serializer.data
        }, status=status.HTTP_200_OK)

class UserRoleUpdateView(APIView):
    """
    Chỉ duy nhất Super Admin mới có quyền cập nhật quyền hạn hoặc thăng cấp người dùng.
    Chặn triệt để lỗ hổng Horizontal & Vertical Privilege Escalation.
    """
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            target_user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'success': False, 'error': 'Người dùng không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)

        new_role = request.data.get('role')
        is_superuser_requested = request.data.get('is_superuser')

        # Nếu có hành vi thay đổi vai trò hoặc cấp Super Admin
        if new_role is not None or is_superuser_requested is not None:
            if not request.user.is_superuser:
                # Ghi audit log cảnh báo hành vi leo thang quyền bất hợp pháp
                AuditLog.objects.create(
                    user=request.user,
                    action=AuditAction.PERMISSION_CHANGE,
                    resource_type='User',
                    resource_id=str(target_user.id),
                    ip_address=get_client_ip(request),
                    details={
                        'status': 'BLOCKED',
                        'attempted_role': new_role,
                        'warning': 'Non-superuser attempted privilege escalation'
                    }
                )
                return Response({
                    'success': False,
                    'error': 'Từ chối truy cập: Bạn không có quyền thay đổi vai trò hoặc cấp quyền quản trị.'
                }, status=status.HTTP_403_FORBIDDEN)

            old_role = target_user.role
            if new_role and new_role in UserRole.values:
                target_user.role = new_role
            if is_superuser_requested is not None:
                target_user.is_superuser = bool(is_superuser_requested)
            target_user.save()

            # Ghi audit log thành công
            AuditLog.objects.create(
                user=request.user,
                action=AuditAction.PERMISSION_CHANGE,
                resource_type='User',
                resource_id=str(target_user.id),
                ip_address=get_client_ip(request),
                details={
                    'status': 'SUCCESS',
                    'old_role': old_role,
                    'new_role': target_user.role,
                    'is_superuser': target_user.is_superuser
                }
            )

        return Response({
            'success': True,
            'message': 'Cập nhật thông tin người dùng thành công!',
            'user': UserSerializer(target_user).data
        }, status=status.HTTP_200_OK)
