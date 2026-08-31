from django.contrib.auth.models import AbstractUser
from django.db import models

class UserRole(models.TextChoices):
    STUDENT = 'STUDENT', 'Học viên'
    TEACHER = 'TEACHER', 'Giảng viên'
    ACADEMIC = 'ACADEMIC', 'Giáo vụ'
    ADMIN = 'ADMIN', 'Quản trị viên'

class User(AbstractUser):
    email = models.EmailField(unique=True, verbose_name='Email liên hệ')
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.STUDENT,
        verbose_name='Vai trò người dùng'
    )
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name='Số điện thoại')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = 'Người dùng'
        verbose_name_plural = 'Danh sách người dùng'

    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.get_role_display()})"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    organization = models.CharField(max_length=255, blank=True, verbose_name='Trường / Cơ quan')
    avatar_url = models.URLField(blank=True, null=True, verbose_name='Ảnh đại diện')
    bio = models.TextField(blank=True, verbose_name='Tiểu sử')
    is_mfa_enabled = models.BooleanField(default=False, verbose_name='Kích hoạt 2FA/MFA')
    last_login_ip = models.GenericIPAddressField(blank=True, null=True)

    def __str__(self):
        return f"Hồ sơ của {self.user.username}"
