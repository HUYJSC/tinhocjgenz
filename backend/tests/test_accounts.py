import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from apps.accounts.models import UserRole
from apps.accounts.authentication import generate_tokens_for_user

User = get_user_model()

@pytest.mark.django_db
class TestAccounts:
    def test_user_registration(self):
        client = APIClient()
        data = {
            'username': 'student_test_1',
            'email': 'student1@example.com',
            'password': 'SecurePassword@2026',
            'password_confirm': 'SecurePassword@2026',
            'first_name': 'Nguyễn Văn',
            'last_name': 'A',
            'phone': '0901234567'
        }
        res = client.post('/api/v1/accounts/register/', data, format='json')
        assert res.status_code == 201
        assert res.data['success'] is True
        assert res.data['user']['email'] == 'student1@example.com'
        assert res.data['user']['role'] == 'STUDENT'
        assert 'access' in res.data['tokens']

        # Verify password is hashed with Argon2id
        user = User.objects.get(username='student_test_1')
        assert user.password.startswith('argon2')

    def test_user_login(self):
        User.objects.create_user(
            username='teacher_test',
            email='teacher@example.com',
            password='TeacherPassword@2026',
            role=UserRole.TEACHER
        )
        client = APIClient()
        res = client.post('/api/v1/accounts/login/', {
            'username': 'teacher_test',
            'password': 'TeacherPassword@2026'
        }, format='json')
        assert res.status_code == 200
        assert res.data['success'] is True
        assert res.data['user']['role'] == 'TEACHER'
        assert 'access' in res.data['tokens']

    def test_authenticated_me_endpoint(self):
        user = User.objects.create_user(
            username='academic_test',
            email='academic@example.com',
            password='AcademicPassword@2026',
            role=UserRole.ACADEMIC
        )
        tokens = generate_tokens_for_user(user)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")

        res = client.get('/api/v1/accounts/me/')
        assert res.status_code == 200
        assert res.data['user']['username'] == 'academic_test'
        assert res.data['user']['role'] == 'ACADEMIC'
