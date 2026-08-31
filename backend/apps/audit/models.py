from django.db import models
from django.conf import settings

class AuditAction(models.TextChoices):
    LOGIN = 'LOGIN', 'Đăng nhập'
    LOGOUT = 'LOGOUT', 'Đăng xuất'
    CREATE = 'CREATE', 'Tạo mới'
    UPDATE = 'UPDATE', 'Chỉnh sửa'
    DELETE = 'DELETE', 'Xóa'
    GRADE_CHANGE = 'GRADE_CHANGE', 'Sửa điểm số'
    CERTIFICATE_ISSUED = 'CERTIFICATE_ISSUED', 'Cấp chứng nhận'
    PERMISSION_CHANGE = 'PERMISSION_CHANGE', 'Thay đổi quyền hạn'

class AuditLog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='audit_logs'
    )
    action = models.CharField(max_length=30, choices=AuditAction.choices)
    resource_type = models.CharField(max_length=100, verbose_name='Đối tượng tác động')
    resource_id = models.CharField(max_length=100, blank=True, verbose_name='ID đối tượng')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, blank=True)
    details = models.JSONField(default=dict, blank=True, verbose_name='Chi tiết thay đổi')
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Nhật ký kiểm toán'
        verbose_name_plural = 'Danh sách nhật ký kiểm toán'
        ordering = ['-timestamp']

    def __str__(self):
        actor = self.user.username if self.user else "Hệ thống"
        return f"[{self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}] {actor} -> {self.get_action_display()} {self.resource_type} ({self.resource_id})"
