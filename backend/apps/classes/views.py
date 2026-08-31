from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import ClassBatch, Enrollment
from .serializers import ClassBatchSerializer, EnrollmentSerializer

class ClassBatchListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClassBatchSerializer

    def get_queryset(self):
        queryset = ClassBatch.objects.select_related('course', 'teacher').all()
        course_id = self.request.query_params.get('course_id')
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        return queryset

class StudentEnrollmentListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user).select_related('batch__course')

class TeacherClassListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ClassBatchSerializer

    def get_queryset(self):
        return ClassBatch.objects.filter(teacher=self.request.user).select_related('course')
