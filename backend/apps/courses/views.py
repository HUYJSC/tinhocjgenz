from rest_framework import generics, permissions, filters
from .models import Course, CourseCategory
from .serializers import CourseListSerializer, CourseDetailSerializer, CourseCategorySerializer

class CourseListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'tagline', 'description', 'category__name']
    ordering_fields = ['price', 'created_at']

    def get_queryset(self):
        queryset = Course.objects.filter(is_published=True).select_related('category')
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset

class CourseDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Course.objects.filter(is_published=True).prefetch_related('modules__lessons')

class CourseCategoryListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
