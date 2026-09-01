from rest_framework import permissions
from .models import UserRole

class IsStudent(permissions.BasePermission):
    """Quyền truy cập dành cho Học viên"""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == UserRole.STUDENT)

class IsTeacher(permissions.BasePermission):
    """Quyền truy cập dành cho Giảng viên hoặc Quản trị viên"""
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and 
            (request.user.role in [UserRole.TEACHER, UserRole.ADMIN] or request.user.is_superuser)
        )

class IsAcademic(permissions.BasePermission):
    """Quyền truy cập dành cho Giáo vụ hoặc Quản trị viên"""
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and 
            (request.user.role in [UserRole.ACADEMIC, UserRole.ADMIN] or request.user.is_superuser)
        )

class IsAdmin(permissions.BasePermission):
    """Quyền truy cập dành cho Quản trị viên hệ thống"""
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and 
            (request.user.role == UserRole.ADMIN or request.user.is_superuser)
        )

class IsSuperAdmin(permissions.BasePermission):
    """Quyền truy cập tối cao dành cho Super Admin"""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)

class IsOwnerOrStaff(permissions.BasePermission):
    """
    Object-level permission: Chỉ chủ sở hữu bản ghi hoặc nhân sự quản lý (Academic/Admin)
    mới được phép xem hoặc chỉnh sửa.
    """
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        # Quản trị viên và giáo vụ có quyền quản lý
        if request.user.is_superuser or request.user.role in [UserRole.ADMIN, UserRole.ACADEMIC]:
            return True

        # Kiểm tra quyền chủ sở hữu
        if obj == request.user:
            return True
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
        if hasattr(obj, 'student') and obj.student == request.user:
            return True

        return False

class IsClassTeacherOrStaff(permissions.BasePermission):
    """
    Object-level permission: Chỉ giảng viên được phân công đứng lớp hoặc Admin/Academic
    mới được xem và nhập điểm học viên của lớp đó.
    """
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.is_superuser or request.user.role in [UserRole.ADMIN, UserRole.ACADEMIC]:
            return True

        # Nếu obj là lớp học (Class)
        if hasattr(obj, 'teacher') and obj.teacher == request.user:
            return True

        # Nếu obj là bản ghi điểm/nộp bài thuộc lớp học
        if hasattr(obj, 'classroom') and hasattr(obj.classroom, 'teacher') and obj.classroom.teacher == request.user:
            return True

        return False
