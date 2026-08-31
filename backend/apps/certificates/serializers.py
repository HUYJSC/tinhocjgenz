from rest_framework import serializers
from .models import Certificate

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = [
            'id', 'student_name', 'course_or_exam_title', 'cert_code',
            'score', 'issuer', 'issue_date', 'sha256_hash', 'qr_verify_url',
            'is_valid', 'created_at'
        ]
        read_only_fields = ['sha256_hash', 'qr_verify_url', 'created_at']

class CertificatePublicVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = [
            'student_name', 'course_or_exam_title', 'cert_code',
            'score', 'issuer', 'issue_date', 'sha256_hash', 'is_valid'
        ]
