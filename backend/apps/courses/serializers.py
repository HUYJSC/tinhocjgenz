from rest_framework import serializers
from .models import CourseCategory, Course, Module, Lesson, Skill

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'order', 'title', 'content', 'video_url', 'duration_minutes', 'is_free_preview']

class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'order', 'title', 'description', 'lessons']

class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'name', 'slug', 'description']

class CourseListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'tagline', 'price', 'original_price',
            'duration', 'exam_code', 'badge', 'pass_rate', 'category_name'
        ]

class CourseDetailSerializer(serializers.ModelSerializer):
    category = CourseCategorySerializer(read_only=True)
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'tagline', 'price', 'original_price',
            'duration', 'exam_code', 'badge', 'target_audience', 'pass_rate',
            'description', 'category', 'modules', 'created_at'
        ]
