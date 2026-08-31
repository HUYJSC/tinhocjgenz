from django.urls import path
from .views import CourseListView, CourseDetailView, CourseCategoryListView

app_name = 'courses'

urlpatterns = [
    path('', CourseListView.as_view(), name='course-list'),
    path('categories/', CourseCategoryListView.as_view(), name='category-list'),
    path('<slug:slug>/', CourseDetailView.as_view(), name='course-detail'),
]
