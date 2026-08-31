from django.db import models
from django.conf import settings

class ExamSubject(models.TextChoices):
    MOS_EXCEL = 'MOS_EXCEL', 'MOS Excel 2019/365'
    MOS_WORD = 'MOS_WORD', 'MOS Word 2019/365'
    MOS_POWERPOINT = 'MOS_POWERPOINT', 'MOS PowerPoint 2019/365'
    IC3_GS6 = 'IC3_GS6', 'IC3 Digital Literacy GS6'
    PYTHON = 'PYTHON', 'Python Ứng Dụng'

class QuestionBank(models.Model):
    title = models.CharField(max_length=255, verbose_name='Tên ngân hàng câu hỏi')
    subject = models.CharField(max_length=50, choices=ExamSubject.choices)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.get_subject_display()})"

class Question(models.Model):
    bank = models.ForeignKey(QuestionBank, on_delete=models.CASCADE, related_name='questions')
    content = models.TextField(verbose_name='Nội dung câu hỏi')
    options = models.JSONField(default=list, verbose_name='Danh sách phương án (A, B, C, D)')
    correct_index = models.PositiveIntegerField(verbose_name='Index đáp án đúng (0-based)')
    explanation = models.TextField(verbose_name='Giải thích chi tiết của chuyên gia')
    skill = models.CharField(max_length=150, default='Kỹ năng thao tác cốt lõi', verbose_name='Nhóm kỹ năng')
    points = models.PositiveIntegerField(default=10, verbose_name='Điểm câu hỏi')

    def __str__(self):
        return f"[{self.bank.get_subject_display()}] {self.content[:60]}..."

class Exam(models.Model):
    title = models.CharField(max_length=255, verbose_name='Tiêu đề bài thi')
    subject = models.CharField(max_length=50, choices=ExamSubject.choices)
    duration_minutes = models.PositiveIntegerField(default=50, verbose_name='Thời gian thi (phút)')
    pass_score = models.PositiveIntegerField(default=700, verbose_name='Điểm đỗ (Chuẩn 700/1000)')
    total_points = models.PositiveIntegerField(default=1000, verbose_name='Thang điểm tối đa')
    questions = models.ManyToManyField(Question, related_name='exams')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ExamAttempt(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='exam_attempts'
    )
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='attempts')
    guest_name = models.CharField(max_length=150, blank=True, null=True, verbose_name='Họ tên thí sinh tự do')
    guest_phone = models.CharField(max_length=20, blank=True, null=True, verbose_name='SĐT thí sinh tự do')
    score = models.PositiveIntegerField(default=0, verbose_name='Điểm đạt được (thang 1000)')
    passed = models.BooleanField(default=False, verbose_name='Kết quả Đạt / Không đạt')
    correct_count = models.PositiveIntegerField(default=0)
    total_questions = models.PositiveIntegerField(default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        candidate = self.user.username if self.user else self.guest_name or "Khách thi thử"
        return f"{candidate} - {self.exam.title}: {self.score}/1000 ({'ĐẠT' if self.passed else 'TRƯỢT'})"

class ExamAnswer(models.Model):
    attempt = models.ForeignKey(ExamAttempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    chosen_index = models.IntegerField(null=True, blank=True)
    is_correct = models.BooleanField(default=False)
