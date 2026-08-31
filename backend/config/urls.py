"""
URL configuration for PH Digital Education project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/accounts/', include('apps.accounts.urls')),
    path('api/v1/courses/', include('apps.courses.urls')),
    path('api/v1/classes/', include('apps.classes.urls')),
    path('api/v1/assessments/', include('apps.assessments.urls')),
    path('api/v1/certificates/', include('apps.certificates.urls')),
    path('api/v1/audit/', include('apps.audit.urls')),
]
