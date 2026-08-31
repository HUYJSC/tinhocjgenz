import pytest
from datetime import date
from rest_framework.test import APIClient
from apps.certificates.models import Certificate

@pytest.mark.django_db
class TestCertificates:
    def test_certificate_creation_generates_sha256(self):
        cert = Certificate.objects.create(
            student_name="Nguyễn Hoàng Nam",
            course_or_exam_title="MOS Excel 2019 Associate",
            score=1000,
            issue_date=date(2026, 8, 20)
        )
        assert cert.cert_code.startswith("CERT-PH-2026-")
        assert len(cert.sha256_hash) == 64
        assert cert.is_valid is True

    def test_public_certificate_verification_success(self):
        cert = Certificate.objects.create(
            student_name="Trần Thị Thu Thảo",
            course_or_exam_title="IC3 Digital Literacy GS6",
            cert_code="CERT-IC3-2026-TEST",
            score=980,
            issue_date=date(2026, 8, 18)
        )
        client = APIClient()
        res = client.get('/api/v1/certificates/verify/CERT-IC3-2026-TEST/')
        assert res.status_code == 200
        assert res.data['verified'] is True
        assert res.data['certificate']['student_name'] == "Trần Thị Thu Thảo"
        assert res.data['certificate']['score'] == 980

    def test_public_certificate_verification_not_found(self):
        client = APIClient()
        res = client.get('/api/v1/certificates/verify/NON-EXISTING-CODE/')
        assert res.status_code == 404
        assert res.data['verified'] is False
