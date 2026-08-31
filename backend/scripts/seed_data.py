"""
Seed initial rich educational data for PH Digital Education
Converts mock data into real relational database records.
"""
import os
import sys
import django
from datetime import date

# Set up django environment
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.accounts.models import UserRole, UserProfile
from apps.courses.models import CourseCategory, Course, Module, Lesson, Skill
from apps.classes.models import ClassBatch, ClassMode, ClassStatus
from apps.assessments.models import QuestionBank, Question, Exam, ExamSubject
from apps.certificates.models import Certificate

User = get_user_model()

def seed():
    print("[SEED] Dang khoi tao du lieu mau cho PH Digital Education...")

    # 1. Admin & Teacher Accounts
    admin_user, _ = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@tinhocgenz.io.vn',
            'first_name': 'Quản Trị Viên',
            'last_name': 'Hệ Thống',
            'role': UserRole.ADMIN,
            'is_staff': True,
            'is_superuser': True,
        }
    )
    admin_user.set_password('Admin@PHDigital2026')
    admin_user.save()
    UserProfile.objects.get_or_create(user=admin_user, defaults={'organization': 'PH Digital Education'})

    teacher_user, _ = User.objects.get_or_create(
        username='thayhuy_master',
        defaults={
            'email': 'thayhuy@tinhocgenz.io.vn',
            'first_name': 'Thầy Huy',
            'last_name': 'MOS Master',
            'role': UserRole.TEACHER,
        }
    )
    teacher_user.set_password('Teacher@Huy2026')
    teacher_user.save()
    UserProfile.objects.get_or_create(user=teacher_user, defaults={'organization': 'Certiport Master Trainer'})

    # 2. Categories
    cat_mos, _ = CourseCategory.objects.get_or_create(
        slug='mos-ic3',
        defaults={'name': 'Chứng Chỉ Quốc Tế MOS & IC3', 'description': 'Luyện thi chứng chỉ tin học quốc tế chuẩn Certiport'}
    )
    cat_office, _ = CourseCategory.objects.get_or_create(
        slug='practical-office',
        defaults={'name': 'Tin Học Văn Phòng Thực Chiến', 'description': 'Kỹ năng Excel, Word, PowerPoint cho người đi làm'}
    )

    # 3. Courses
    course_mos, _ = Course.objects.get_or_create(
        slug='mos-master-combo',
        defaults={
            'category': cat_mos,
            'title': 'Luyện Thi MOS 2019 / 365 Master Combo (Word, Excel, PPT)',
            'tagline': 'Cam kết bao đỗ 100% - Đạt chứng chỉ quốc tế chỉ sau 3 - 5 buổi',
            'price': 2490000,
            'original_price': 3500000,
            'duration': '3 - 5 buổi / môn',
            'exam_code': 'MOS 2019 / Microsoft 365 Apps',
            'badge': 'Bán Chạy Nhất',
            'pass_rate': '99.8% Đỗ ngay lần 1',
            'description': 'Khóa học toàn diện trang bị kỹ năng thực chiến và mẹo làm bài chuẩn Certiport.',
            'target_audience': 'Sinh viên xét chuẩn đầu ra tốt nghiệp, người đi làm cần bổ sung hồ sơ'
        }
    )

    m1, _ = Module.objects.get_or_create(course=course_mos, order=1, defaults={'title': 'MOS Word Master: Cấu Trúc & TOC'})
    Lesson.objects.get_or_create(module=m1, order=1, defaults={'title': 'Bài 1: Làm chủ Heading Styles và Mục lục tự động', 'duration_minutes': 45})
    Lesson.objects.get_or_create(module=m1, order=2, defaults={'title': 'Bài 2: Mail Merge trộn văn bản tự động', 'duration_minutes': 50})

    m2, _ = Module.objects.get_or_create(course=course_mos, order=2, defaults={'title': 'MOS Excel Specialist: Hàm & Công Thức'})
    Lesson.objects.get_or_create(module=m2, order=1, defaults={'title': 'Bài 1: XLOOKUP, INDEX/MATCH và hàm logic IF/AND', 'duration_minutes': 60})
    Lesson.objects.get_or_create(module=m2, order=2, defaults={'title': 'Bài 2: Báo cáo động với PivotTable & Slicer', 'duration_minutes': 55})

    # 4. Classes
    ClassBatch.objects.get_or_create(
        course=course_mos,
        name='Lớp MOS Cấp Tốc Tối 2-4-6',
        defaults={
            'teacher': teacher_user,
            'start_date': 'Thứ 2 hàng tuần (19h30 - 21h30)',
            'schedule_time': '3 buổi ôn + luyện máy ảo',
            'mode': ClassMode.ONLINE,
            'total_slots': 15,
            'remaining_slots': 3,
            'status': ClassStatus.ALMOST_FULL,
            'meet_link': 'https://meet.google.com/ph-digital-mos'
        }
    )

    # 5. Question Bank & Exam
    bank, _ = QuestionBank.objects.get_or_create(
        title='Ngân Hàng Khảo Thí MOS Excel 2019',
        subject=ExamSubject.MOS_EXCEL
    )
    q1, _ = Question.objects.get_or_create(
        bank=bank,
        content='Trong Excel 2019/365, hàm nào được khuyến nghị thay thế cho sự kết hợp giữa INDEX và MATCH?',
        defaults={
            'options': ['Hàm VLOOKUP', 'Hàm XLOOKUP', 'Hàm HLOOKUP', 'Hàm SEARCH'],
            'correct_index': 1,
            'explanation': 'XLOOKUP là hàm tìm kiếm thế hệ mới linh hoạt hai chiều và tự động bắt lỗi #N/A.',
            'skill': 'Hàm Tìm Kiếm'
        }
    )
    q2, _ = Question.objects.get_or_create(
        bank=bank,
        content='Khi cố định hàng 1 và cột A bằng Freeze Panes, bạn đặt con trỏ ở ô nào?',
        defaults={
            'options': ['Ô A1', 'Ô B1', 'Ô A2', 'Ô B2'],
            'correct_index': 3,
            'explanation': 'Freeze Panes cố định phía trên và bên trái của ô hiện hành, vì vậy chọn B2.',
            'skill': 'Bố cục Bảng tính'
        }
    )

    exam, _ = Exam.objects.get_or_create(
        title='Đề Thi Thử MOS Excel 2019 Chuẩn Quốc Tế',
        subject=ExamSubject.MOS_EXCEL,
        defaults={
            'duration_minutes': 50,
            'pass_score': 700,
            'total_points': 1000,
            'is_active': True,
        }
    )
    exam.questions.add(q1, q2)

    # 6. Certificates
    Certificate.objects.get_or_create(
        cert_code='CERT-MOS-2026-9842',
        defaults={
            'student_name': 'Nguyễn Hoàng Nam',
            'course_or_exam_title': 'MOS Excel 2019 Associate',
            'score': 1000,
            'issue_date': date(2026, 8, 20),
            'issuer': 'Certiport Official / IIG Vietnam & PH Digital',
            'is_valid': True
        }
    )
    Certificate.objects.get_or_create(
        cert_code='CERT-IC3-2026-5512',
        defaults={
            'student_name': 'Trần Thị Thu Thảo',
            'course_or_exam_title': 'IC3 Digital Literacy GS6',
            'score': 980,
            'issue_date': date(2026, 8, 18),
            'issuer': 'Certiport Official / IIG Vietnam & PH Digital',
            'is_valid': True
        }
    )

    print("[SUCCESS] Hoan thanh khoi tao du lieu mau thanh cong!")

if __name__ == '__main__':
    seed()
