import pytest
from rest_framework.test import APIClient
from apps.assessments.models import QuestionBank, Question, Exam, ExamSubject

@pytest.mark.django_db
class TestAssessments:
    @pytest.fixture
    def setup_exam(self):
        bank = QuestionBank.objects.create(
            title="Ngân hàng MOS Excel Thực Chiến",
            subject=ExamSubject.MOS_EXCEL
        )
        q1 = Question.objects.create(
            bank=bank,
            content="Hàm nào thay thế INDEX và MATCH trong Excel 2019/365?",
            options=["VLOOKUP", "XLOOKUP", "HLOOKUP", "SEARCH"],
            correct_index=1,
            explanation="XLOOKUP hỗ trợ tìm kiếm đa chiều.",
            skill="Công thức & Hàm"
        )
        q2 = Question.objects.create(
            bank=bank,
            content="Để cố định dòng 1 và cột A, chọn ô nào trước khi bấm Freeze Panes?",
            options=["A1", "B1", "A2", "B2"],
            correct_index=3,
            explanation="Freeze Panes khóa góc trên bên trái ô B2.",
            skill="Bố cục Bảng tính"
        )
        exam = Exam.objects.create(
            title="Đề thi thử MOS Excel 2019 Chuẩn Certiport",
            subject=ExamSubject.MOS_EXCEL,
            duration_minutes=50,
            pass_score=700,
            total_points=1000
        )
        exam.questions.add(q1, q2)
        return exam, q1, q2

    def test_exam_detail_sanitizes_answers(self, setup_exam):
        exam, q1, q2 = setup_exam
        client = APIClient()
        res = client.get(f'/api/v1/assessments/exams/{exam.id}/')
        assert res.status_code == 200
        assert len(res.data['questions']) == 2

        # Verify correct_index and explanation are NOT leaked to client
        for q in res.data['questions']:
            assert 'correct_index' not in q
            assert 'explanation' not in q
            assert 'content' in q
            assert 'options' in q

    def test_exam_submission_and_server_grading_pass(self, setup_exam):
        exam, q1, q2 = setup_exam
        client = APIClient()
        submission = {
            'exam_id': exam.id,
            'answers': {
                str(q1.id): 1,  # correct
                str(q2.id): 3   # correct
            },
            'guest_name': 'Thí sinh A',
            'guest_phone': '0332298065'
        }
        res = client.post('/api/v1/assessments/exams/submit/', submission, format='json')
        assert res.status_code == 200
        assert res.data['success'] is True
        assert res.data['score'] == 1000
        assert res.data['passed'] is True
        assert res.data['correct_count'] == 2
        assert len(res.data['skill_analysis']) == 2
        assert res.data['skill_analysis'][0]['status'] == 'Thành thạo'

    def test_exam_submission_and_server_grading_fail(self, setup_exam):
        exam, q1, q2 = setup_exam
        client = APIClient()
        submission = {
            'exam_id': exam.id,
            'answers': {
                str(q1.id): 0,  # wrong
                str(q2.id): 3   # correct
            }
        }
        res = client.post('/api/v1/assessments/exams/submit/', submission, format='json')
        assert res.status_code == 200
        assert res.data['score'] == 500  # 1/2 correct = 500/1000
        assert res.data['passed'] is False  # 500 < 700
