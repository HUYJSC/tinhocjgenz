from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .authentication import generate_tokens_for_user

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def POST(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = generate_tokens_for_user(user)
            return Response({
                'success': True,
                'message': 'Đăng ký tài khoản học viên thành công!',
                'user': UserSerializer(user).data,
                'tokens': tokens,
            }, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    # Alias for DRF lowercase post
    def post(self, request):
        return self.POST(request)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(request, username=username, password=password)
        if not user:
            # Check by email as well
            try:
                user_obj = User.objects.get(email=username)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None

        if not user:
            return Response({
                'success': False,
                'error': 'Tài khoản hoặc mật khẩu không chính xác.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({
                'success': False,
                'error': 'Tài khoản này đã bị khóa.'
            }, status=status.HTTP_403_FORBIDDEN)

        tokens = generate_tokens_for_user(user)
        return Response({
            'success': True,
            'message': 'Đăng nhập thành công!',
            'user': UserSerializer(user).data,
            'tokens': tokens,
        }, status=status.HTTP_200_OK)

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({
            'success': True,
            'user': serializer.data
        }, status=status.HTTP_200_OK)
