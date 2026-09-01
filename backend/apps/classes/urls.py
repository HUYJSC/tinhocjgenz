from django.urls import path
from .views import ClassBatchListView, ClassBatchDetailView, StudentEnrollmentListView, TeacherClassListView

app_name = 'classes'

urlpatterns = [
    path('batches/', ClassBatchListView.as_view(), name='batch-list'),
    path('batches/<int:pk>/', ClassBatchDetailView.as_view(), name='batch-detail'),
    path('my-enrollments/', StudentEnrollmentListView.as_view(), name='my-enrollments'),
    path('teaching-classes/', TeacherClassListView.as_view(), name='teaching-classes'),
]

