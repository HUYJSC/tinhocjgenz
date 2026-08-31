from rest_framework import serializers
from .models import ClassBatch, Enrollment, Attendance

class ClassBatchSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.title', read_only=True)
    teacher_name = serializers.CharField(source='teacher.get_full_name', read_only=True)
    mode_display = serializers.CharField(source='get_mode_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ClassBatch
        fields = [
            'id', 'course', 'course_name', 'name', 'teacher', 'teacher_name',
            'start_date', 'schedule_time', 'mode', 'mode_display',
            'total_slots', 'remaining_slots', 'status', 'status_display',
            'meet_link', 'created_at'
        ]

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'session_number', 'is_present', 'notes', 'marked_at']

class EnrollmentSerializer(serializers.ModelSerializer):
    batch_detail = ClassBatchSerializer(source='batch', read_only=True)
    attendances = AttendanceSerializer(many=True, read_only=True)
    student_name = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = Enrollment
        fields = [
            'id', 'user', 'student_name', 'batch', 'batch_detail',
            'status', 'academic_warning_count', 'enrolled_at', 'attendances'
        ]
