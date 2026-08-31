from django.db import models

class CourseCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name='Tên danh mục')
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Danh mục khóa học'
        verbose_name_plural = 'Danh mục khóa học'

    def __str__(self):
        return self.name

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Tên kỹ năng')
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.SET_NULL, null=True, related_name='courses')
    title = models.CharField(max_length=255, verbose_name='Tên khóa học')
    slug = models.SlugField(max_length=255, unique=True)
    tagline = models.CharField(max_length=300, blank=True, verbose_name='Khẩu hiệu / Tóm tắt ngắn')
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0, verbose_name='Học phí ưu đãi')
    original_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, verbose_name='Học phí gốc')
    duration = models.CharField(max_length=100, default='3 - 5 buổi', verbose_name='Thời lượng')
    exam_code = models.CharField(max_length=100, blank=True, verbose_name='Mã khảo thí')
    badge = models.CharField(max_length=50, blank=True, verbose_name='Huy hiệu nổi bật')
    target_audience = models.TextField(blank=True, verbose_name='Đối tượng học viên')
    pass_rate = models.CharField(max_length=50, default='99.2% Đỗ chứng chỉ', verbose_name='Tỷ lệ đỗ')
    description = models.TextField(verbose_name='Mô tả chi tiết')
    is_published = models.BooleanField(default=True, verbose_name='Đã phát hành')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Khóa học'
        verbose_name_plural = 'Danh sách khóa học'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    order = models.PositiveIntegerField(default=1, verbose_name='Thứ tự')
    title = models.CharField(max_length=255, verbose_name='Tiêu đề Module')
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['order']
        unique_together = ['course', 'order']

    def __str__(self):
        return f"{self.course.title} - Buổi {self.order}: {self.title}"

class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    order = models.PositiveIntegerField(default=1, verbose_name='Thứ tự')
    title = models.CharField(max_length=255, verbose_name='Tên bài học')
    content = models.TextField(blank=True, verbose_name='Nội dung bài giảng')
    video_url = models.URLField(blank=True, null=True, verbose_name='Link Video bài giảng')
    duration_minutes = models.PositiveIntegerField(default=30, verbose_name='Thời lượng (phút)')
    is_free_preview = models.BooleanField(default=False, verbose_name='Xem thử miễn phí')

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.module.title} - Bài {self.order}: {self.title}"
