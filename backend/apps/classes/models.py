from django.db import models
from django.conf import settings
from apps.courses.models import Course

class ClassMode(models.TextChoices):
    ONLINE = 'ONLINE', 'Online qua Zoom / Google Meet'
    ONE_ON_ONE = 'ONE_ON_ONE', 'Kèm 1:1 Cấp Tốc'
    OFFLINE = 'OFFLINE', 'Trực tiếp tại cơ sở liên kết'

class ClassStatus(models.TextChoices):
    OPEN = 'OPEN', 'Đang mở đăng ký'
    ALMOST_FULL = 'ALMOST_FULL', 'Sắp đầy chỗ'
    CLOSED = 'CLOSED', 'Đã khóa sĩ số'

class ClassBatch(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='batches')
    name = models.CharField(max_length=255, verbose_name='Tên lớp học')
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='teaching_classes',
        verbose_name='Giảng viên phụ trách'
    )
    start_date = models.CharField(max_length=150, verbose_name='Ngày khai giảng / Lịch học')
    schedule_time = models.CharField(max_length=150, verbose_name='Ca học trong ngày')
    mode = models.CharField(max_length=30, choices=ClassMode.choices, default=ClassMode.ONLINE)
    total_slots = models.PositiveIntegerField(default=15, verbose_name='Tổng chỉ tiêu')
    remaining_slots = models.PositiveIntegerField(default=5, verbose_name='Chỉ tiêu còn lại')
    status = models.CharField(max_length=30, choices=ClassStatus.choices, default=ClassStatus.OPEN)
    meet_link = models.URLField(blank=True, null=True, verbose_name='Link phòng học ảo')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Lớp học'
        verbose_name_plural = 'Danh sách lớp học'
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.course.title}] {self.name}"

class EnrollmentStatus(models.TextChoices):
    ACTIVE = 'ACTIVE', 'Đang theo học'
    COMPLETED = 'COMPLETED', 'Đã tốt nghiệp'
    DROPPED = 'DROPPED', 'Bảo lưu / Thôi học'

class Enrollment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    batch = models.ForeignKey(ClassBatch, on_delete=models.CASCADE, related_name='enrollments')
    status = models.CharField(max_length=20, choices=EnrollmentStatus.choices, default=EnrollmentStatus.ACTIVE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    academic_warning_count = models.PositiveIntegerField(default=0, verbose_name='Số lần cảnh báo vắng')

    class Meta:
        unique_together = ['user', 'batch']
        verbose_name = 'Ghi danh học viên'
        verbose_name_plural = 'Danh sách ghi danh'

    def __str__(self):
        return f"{self.user.username} -> {self.batch.name}"

class Attendance(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='attendances')
    session_number = models.PositiveIntegerField(verbose_name='Buổi số')
    is_present = models.BooleanField(default=True, verbose_name='Có mặt')
    notes = models.CharField(max_length=255, blank=True, verbose_name='Ghi chú của GV')
    marked_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['enrollment', 'session_number']
        verbose_name = 'Điểm danh'
        verbose_name_plural = 'Bảng điểm danh'
