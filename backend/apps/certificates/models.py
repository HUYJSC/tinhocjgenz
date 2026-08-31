import hashlib
import uuid
from django.db import models
from django.conf import settings

class Certificate(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='certificates'
    )
    student_name = models.CharField(max_length=200, verbose_name='Họ và tên học viên')
    course_or_exam_title = models.CharField(max_length=255, verbose_name='Khóa học / Chứng chỉ đạt được')
    cert_code = models.CharField(max_length=100, unique=True, verbose_name='Mã số chứng nhận duy nhất')
    score = models.PositiveIntegerField(default=1000, verbose_name='Điểm số đạt được')
    issuer = models.CharField(
        max_length=255,
        default='PH Digital Education / Certiport Authorized Provider',
        verbose_name='Đơn vị cấp'
    )
    issue_date = models.DateField(verbose_name='Ngày cấp chứng nhận')
    sha256_hash = models.CharField(max_length=64, unique=True, blank=True, verbose_name='Mã băm xác thực SHA-256')
    qr_verify_url = models.URLField(blank=True, verbose_name='Đường dẫn QR tra cứu')
    is_valid = models.BooleanField(default=True, verbose_name='Trạng thái hiệu lực')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Chứng nhận'
        verbose_name_plural = 'Danh sách chứng nhận'
        ordering = ['-issue_date']

    def save(self, *args, **kwargs):
        if not self.cert_code:
            self.cert_code = f"CERT-PH-2026-{uuid.uuid4().hex[:8].upper()}"
        if not self.sha256_hash:
            data_to_hash = f"{self.cert_code}:{self.student_name}:{self.course_or_exam_title}:{self.score}:{self.issue_date}"
            self.sha256_hash = hashlib.sha256(data_to_hash.encode('utf-8')).hexdigest()
        if not self.qr_verify_url:
            self.qr_verify_url = f"https://hoctructuyen.tinhocgenz.io.vn/verify?code={self.cert_code}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.cert_code} - {self.student_name} ({self.course_or_exam_title})"
