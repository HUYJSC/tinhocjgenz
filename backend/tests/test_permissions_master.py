import pytest
import time
import jwt
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.accounts.models import UserRole
from apps.accounts.authentication import generate_tokens_for_user, JWT_SECRET, JWT_ALGORITHM
from apps.classes.models import ClassBatch
from apps.courses.models import Course, CourseCategory
from apps.assessments.models import Exam, ExamAttempt
from apps.audit.models import AuditLog, AuditAction

User = get_user_model()

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def student_user(db):
    user = User.objects.create_user(
        username='student_test',
        email='student@tinhocgenz.io.vn',
        password='StrongPassword123!',
        role=UserRole.STUDENT
    )
    return user

@pytest.fixture
def student_other(db):
    user = User.objects.create_user(
        username='student_other',
        email='other@tinhocgenz.io.vn',
        password='StrongPassword123!',
        role=UserRole.STUDENT
    )
    return user

@pytest.fixture
def teacher_user(db):
    user = User.objects.create_user(
        username='teacher_test',
        email='teacher@tinhocgenz.io.vn',
        password='StrongPassword123!',
        role=UserRole.TEACHER
    )
    return user

@pytest.fixture
def teacher_other(db):
    user = User.objects.create_user(
        username='teacher_other',
        email='teacher_other@tinhocgenz.io.vn',
        password='StrongPassword123!',
        role=UserRole.TEACHER
    )
    return user

@pytest.fixture
def academic_user(db):
    user = User.objects.create_user(
        username='academic_test',
        email='academic@tinhocgenz.io.vn',
        password='StrongPassword123!',
        role=UserRole.ACADEMIC
    )
    return user

@pytest.fixture
def admin_user(db):
    user = User.objects.create_user(
        username='admin_test',
        email='admin@tinhocgenz.io.vn',
        password='StrongPassword123!',
        role=UserRole.ADMIN
    )
    return user

@pytest.fixture
def superuser(db):
    user = User.objects.create_superuser(
        username='super_test',
        email='super@tinhocgenz.io.vn',
        password='StrongPassword123!'
    )
    return user

# =========================================================================
# NHÓM 1: KIỂM THỬ KHÁCH TRUY CẬP TRỰC TIẾP (UNAUTHENTICATED)
# =========================================================================
@pytest.mark.django_db
def test_01_guest_access_me_unauthorized(api_client):
    """Khách chưa đăng nhập truy cập API hồ sơ -> Từ chối (401/403)"""
    res = api_client.get(reverse('accounts:me'))
    assert res.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]

@pytest.mark.django_db
def test_02_guest_access_teaching_classes_unauthorized(api_client):
    """Khách chưa đăng nhập truy cập API giảng viên -> Từ chối (401/403)"""
    res = api_client.get(reverse('classes:teaching-classes'))
    assert res.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]

@pytest.mark.django_db
def test_03_guest_access_audit_logs_unauthorized(api_client):
    """Khách chưa đăng nhập truy cập nhật ký quản trị -> Từ chối (401/403)"""
    res = api_client.get(reverse('audit:audit-logs'))
    assert res.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]

# =========================================================================
# NHÓM 2: KIỂM THỬ HỌC VIÊN TRUY CẬP VƯỢT QUYỀN (VERTICAL PRIVILEGE ESCALATION)
# =========================================================================
@pytest.mark.django_db
def test_04_student_access_teacher_classes_forbidden(api_client, student_user):
    """Học viên gọi API lớp giảng dạy của giáo viên -> 403 Forbidden"""
    api_client.force_authenticate(user=student_user)
    res = api_client.get(reverse('classes:teaching-classes'))
    assert res.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
def test_05_student_access_audit_logs_forbidden(api_client, student_user):
    """Học viên gọi API nhật ký quản trị -> 403 Forbidden"""
    api_client.force_authenticate(user=student_user)
    res = api_client.get(reverse('audit:audit-logs'))
    assert res.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
def test_06_teacher_access_audit_logs_forbidden(api_client, teacher_user):
    """Giảng viên gọi API nhật ký quản trị -> 403 Forbidden"""
    api_client.force_authenticate(user=teacher_user)
    res = api_client.get(reverse('audit:audit-logs'))
    assert res.status_code == status.HTTP_403_FORBIDDEN

# =========================================================================
# NHÓM 3: CHỐNG LỖ HỔNG IDOR (OBJECT-LEVEL PERMISSION)
# =========================================================================
@pytest.mark.django_db
def test_07_student_read_other_student_exam_attempt_idor_forbidden(api_client, student_user, student_other):
    """Học viên A thay ID trên URL để đọc kết quả thi của Học viên B -> 403 Forbidden"""
    exam = Exam.objects.create(
        title='MOS Word Test',
        subject='MOS_WORD',
        duration_minutes=50,
        pass_score=700,
        total_points=1000
    )
    attempt_b = ExamAttempt.objects.create(
        user=student_other,
        exam=exam,
        score=950,
        total_questions=35,
        correct_count=33,
        passed=True
    )

    api_client.force_authenticate(user=student_user)
    res = api_client.get(reverse('assessments:attempt-detail', kwargs={'pk': attempt_b.pk}))
    assert res.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
def test_08_student_read_own_exam_attempt_allowed(api_client, student_user):
    """Học viên A đọc kết quả thi của chính mình -> 200 OK"""
    exam = Exam.objects.create(
        title='MOS Word Test',
        subject='MOS_WORD',
        duration_minutes=50,
        pass_score=700,
        total_points=1000
    )
    attempt_a = ExamAttempt.objects.create(
        user=student_user,
        exam=exam,
        score=850,
        total_questions=35,
        correct_count=30,
        passed=True
    )

    api_client.force_authenticate(user=student_user)
    res = api_client.get(reverse('assessments:attempt-detail', kwargs={'pk': attempt_a.pk}))
    assert res.status_code == status.HTTP_200_OK
    assert res.data['score'] == 850

@pytest.mark.django_db
def test_09_teacher_access_unassigned_class_batch_forbidden(api_client, teacher_user, teacher_other):
    """Giảng viên A truy cập chi tiết lớp của Giảng viên B -> 403 Forbidden"""
    category = CourseCategory.objects.create(name='MOS', slug='mos')
    course = Course.objects.create(category=category, title='MOS Excel 2019', slug='mos-excel-2019', price=1000000)
    batch_b = ClassBatch.objects.create(
        course=course,
        teacher=teacher_other,
        name='Lớp MOS B',
        start_date='2026-09-10',
        schedule_time='19:30 - 21:00',
        total_slots=20
    )

    api_client.force_authenticate(user=teacher_user)
    res = api_client.get(reverse('classes:batch-detail', kwargs={'pk': batch_b.pk}))
    assert res.status_code == status.HTTP_403_FORBIDDEN

# =========================================================================
# NHÓM 4: CHỐNG TỰ THĂNG CẤP VAI TRÒ (PRIVILEGE ESCALATION VIA REQUEST BODY)
# =========================================================================
@pytest.mark.django_db
def test_10_registration_role_tamper_ignored(api_client):
    """Người dùng gửi role='ADMIN' khi đăng ký công khai -> Bị bỏ qua, ép về STUDENT"""
    res = api_client.post(reverse('accounts:register'), {
        'username': 'attacker_user',
        'email': 'attacker@tinhocgenz.io.vn',
        'password': 'StrongPassword123!',
        'password_confirm': 'StrongPassword123!',
        'role': 'ADMIN'
    })
    assert res.status_code == status.HTTP_201_CREATED
    user = User.objects.get(username='attacker_user')
    assert user.role == UserRole.STUDENT, "Role phải bị ép về STUDENT, không được nhận ADMIN từ client"

@pytest.mark.django_db
def test_11_regular_user_cannot_update_own_role(api_client, student_user):
    """Người dùng thường tự gọi API update_role để nâng lên ADMIN -> 403 Forbidden"""
    api_client.force_authenticate(user=student_user)
    res = api_client.patch(reverse('accounts:update_role', kwargs={'pk': student_user.pk}), {
        'role': 'ADMIN'
    })
    assert res.status_code == status.HTTP_403_FORBIDDEN
    student_user.refresh_from_db()
    assert student_user.role == UserRole.STUDENT

@pytest.mark.django_db
def test_12_superuser_can_update_role_with_audit(api_client, superuser, student_user):
    """Super Admin có quyền hợp pháp đổi vai trò -> 200 OK và ghi AuditLog"""
    api_client.force_authenticate(user=superuser)
    res = api_client.patch(reverse('accounts:update_role', kwargs={'pk': student_user.pk}), {
        'role': 'TEACHER'
    })
    assert res.status_code == status.HTTP_200_OK
    student_user.refresh_from_db()
    assert student_user.role == UserRole.TEACHER

    # Kiểm tra Audit Log
    log = AuditLog.objects.filter(action=AuditAction.PERMISSION_CHANGE, resource_id=str(student_user.id)).first()
    assert log is not None
    assert log.details['new_role'] == 'TEACHER'

# =========================================================================
# NHÓM 5: XÁC THỰC DUY NHẤT & ĐIỀU HƯỚNG THEO ROLE TỪ DATABASE
# =========================================================================
@pytest.mark.django_db
def test_13_login_student_redirects_to_student_portal(api_client, student_user):
    """Học viên đăng nhập tại cổng chung -> Nhận URL chuyển hướng /portal/student"""
    res = api_client.post(reverse('accounts:login'), {
        'username': student_user.username,
        'password': 'StrongPassword123!'
    })
    assert res.status_code == status.HTTP_200_OK
    assert res.data['redirect_url'] == '/portal/student'

@pytest.mark.django_db
def test_14_login_teacher_redirects_to_teacher_portal(api_client, teacher_user):
    """Giảng viên đăng nhập tại cổng chung -> Nhận URL chuyển hướng /portal/teacher"""
    res = api_client.post(reverse('accounts:login'), {
        'username': teacher_user.username,
        'password': 'StrongPassword123!'
    })
    assert res.status_code == status.HTTP_200_OK
    assert res.data['redirect_url'] == '/portal/teacher'

@pytest.mark.django_db
def test_15_login_academic_redirects_to_academic_portal(api_client, academic_user):
    """Giáo vụ đăng nhập tại cổng chung -> Nhận URL chuyển hướng /portal/academic"""
    res = api_client.post(reverse('accounts:login'), {
        'username': academic_user.username,
        'password': 'StrongPassword123!'
    })
    assert res.status_code == status.HTTP_200_OK
    assert res.data['redirect_url'] == '/portal/academic'

@pytest.mark.django_db
def test_16_login_admin_redirects_to_admin_dashboard(api_client, admin_user):
    """Quản trị viên đăng nhập tại cổng chung -> Nhận URL chuyển hướng /admin"""
    res = api_client.post(reverse('accounts:login'), {
        'username': admin_user.username,
        'password': 'StrongPassword123!'
    })
    assert res.status_code == status.HTTP_200_OK
    assert res.data['redirect_url'] == '/admin'

# =========================================================================
# NHÓM 6: BẢO VỆ TÀI KHOẢN, PHÒNG THỦ & SESSION
# =========================================================================
@pytest.mark.django_db
def test_17_locked_account_cannot_login(api_client, student_user):
    """Tài khoản bị khóa (is_active=False) -> 403 Forbidden"""
    student_user.is_active = False
    student_user.save()

    res = api_client.post(reverse('accounts:login'), {
        'username': student_user.username,
        'password': 'StrongPassword123!'
    })
    assert res.status_code == status.HTTP_403_FORBIDDEN
    assert 'khóa' in res.data['error']

@pytest.mark.django_db
def test_18_invalid_login_generic_error_no_user_enumeration(api_client):
    """Đăng nhập sai -> Báo lỗi trung lập, không làm lộ tài khoản có tồn tại hay không"""
    res = api_client.post(reverse('accounts:login'), {
        'username': 'non_existent_account_123',
        'password': 'WrongPassword!'
    })
    assert res.status_code == status.HTTP_401_UNAUTHORIZED
    assert res.data['error'] == 'Tài khoản hoặc mật khẩu không chính xác.'

@pytest.mark.django_db
def test_19_expired_token_rejected(api_client, student_user):
    """Token hết hạn -> Bị từ chối (401/403)"""
    now = int(time.time())
    expired_payload = {
        'user_id': student_user.id,
        'username': student_user.username,
        'email': student_user.email,
        'role': student_user.role,
        'type': 'access',
        'iat': now - 7200,
        'exp': now - 3600, # Hết hạn 1 giờ trước
    }
    expired_token = jwt.encode(expired_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {expired_token}')
    res = api_client.get(reverse('accounts:me'))
    assert res.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]

@pytest.mark.django_db
def test_20_tampered_role_in_token_ignored(api_client, student_user):
    """
    Kẻ tấn công can thiệp JWT tự ký role='ADMIN'.
    Backend JWTAuthentication từ chối token có chữ ký sai (401/403).
    """
    fake_token = jwt.encode({
        'user_id': student_user.id,
        'role': 'ADMIN',
        'type': 'access',
        'exp': int(time.time()) + 3600
    }, 'wrong_secret_key_tampered_1234567890123456', algorithm=JWT_ALGORITHM)

    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {fake_token}')
    res = api_client.get(reverse('audit:audit-logs'))
    assert res.status_code in [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN]
