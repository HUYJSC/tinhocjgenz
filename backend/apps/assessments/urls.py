from django.urls import path
from .views import ExamListView, ExamDetailView, ExamSubmitView

app_name = 'assessments'

urlpatterns = [
    path('exams/', ExamListView.as_view(), name='exam-list'),
    path('exams/<int:pk>/', ExamDetailView.as_view(), name='exam-detail'),
    path('exams/submit/', ExamSubmitView.as_view(), name='exam-submit'),
]
