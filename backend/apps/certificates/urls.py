from django.urls import path
from .views import CertificateListView, CertificateVerifyView

app_name = 'certificates'

urlpatterns = [
    path('', CertificateListView.as_view(), name='certificate-list'),
    path('verify/<str:cert_code>/', CertificateVerifyView.as_view(), name='certificate-verify'),
]
