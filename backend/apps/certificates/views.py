from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Certificate
from .serializers import CertificateSerializer, CertificatePublicVerifySerializer

class CertificateListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CertificateSerializer

    def get_queryset(self):
        # Admins and Academics can view all certificates; students only view their own
        user = self.request.user
        if user.role in ['ADMIN', 'ACADEMIC']:
            return Certificate.objects.all()
        return Certificate.objects.filter(student=user)

class CertificateVerifyView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, cert_code):
        try:
            cert = Certificate.objects.get(cert_code__iexact=cert_code.strip())
            return Response({
                'success': True,
                'verified': True,
                'certificate': CertificatePublicVerifySerializer(cert).data
            }, status=status.HTTP_200_OK)
        except Certificate.DoesNotExist:
            return Response({
                'success': False,
                'verified': False,
                'error': f'Không tìm thấy chứng chỉ với mã số "{cert_code}". Vui lòng kiểm tra lại.'
            }, status=status.HTTP_404_NOT_FOUND)
