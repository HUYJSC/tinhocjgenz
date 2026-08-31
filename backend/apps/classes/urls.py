from django.urls import path
from .views import ClassBatchListView, StudentEnrollmentListView, TeacherClassListView

app_name = 'classes'

urlpatterns = [
    path('batches/', ClassBatchListView.as_view(), name='batch-list'),
    path('my-enrollments/', StudentEnrollmentListView.as_view(), name='my-enrollments'),
    path('teaching-classes/', TeacherClassListView.as_view(), name='teaching-classes'),
]
