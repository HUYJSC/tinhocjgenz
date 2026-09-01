from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import ClassBatch, Enrollment
from .serializers import ClassBatchSerializer, EnrollmentSerializer
from apps.accounts.permissions import IsTeacher, IsClassTeacherOrStaff

class ClassBatchListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClassBatchSerializer

    def get_queryset(self):
        queryset = ClassBatch.objects.select_related('course', 'teacher').all()
        course_id = self.request.query_params.get('course_id')
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        return queryset

class ClassBatchDetailView(generics.RetrieveAPIView):
    """
    Chỉ giảng viên được giao lớp hoặc nhân sự quản lý (Academic/Admin) mới xem được chi tiết lớp
    """
    permission_classes = [permissions.IsAuthenticated, IsClassTeacherOrStaff]
    queryset = ClassBatch.objects.all()
    serializer_class = ClassBatchSerializer

class StudentEnrollmentListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user).select_related('batch__course')

class TeacherClassListView(generics.ListAPIView):
    """Chỉ giảng viên (TEACHER) hoặc Admin mới được phép gọi danh sách lớp giảng dạy"""
    permission_classes = [permissions.IsAuthenticated, IsTeacher]
    serializer_class = ClassBatchSerializer

    def get_queryset(self):
        return ClassBatch.objects.filter(teacher=self.request.user).select_related('course')

