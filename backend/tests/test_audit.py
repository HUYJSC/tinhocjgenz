import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from apps.accounts.models import UserRole
from apps.accounts.authentication import generate_tokens_for_user
from apps.audit.models import AuditLog, AuditAction

User = get_user_model()

@pytest.mark.django_db
class TestAudit:
    def test_audit_log_rbac_restriction(self):
        admin = User.objects.create_user(
            username='admin_boss',
            email='admin@example.com',
            password='AdminPass@2026',
            role=UserRole.ADMIN
        )
        student = User.objects.create_user(
            username='student_user',
            email='student@example.com',
            password='StudentPass@2026',
            role=UserRole.STUDENT
        )

        AuditLog.objects.create(
            user=admin,
            action=AuditAction.GRADE_CHANGE,
            resource_type='ExamAttempt',
            resource_id='101',
            details={'old_score': 680, 'new_score': 720}
        )

        client = APIClient()

        # Student cannot access audit logs (403 Forbidden)
        student_tokens = generate_tokens_for_user(student)
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {student_tokens['access']}")
        res_student = client.get('/api/v1/audit/logs/')
        assert res_student.status_code == 403

        # Admin can access audit logs
        admin_tokens = generate_tokens_for_user(admin)
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {admin_tokens['access']}")
        res_admin = client.get('/api/v1/audit/logs/')
        assert res_admin.status_code == 200
        assert res_admin.data['count'] == 1
        assert res_admin.data['results'][0]['action'] == 'GRADE_CHANGE'
