from rest_framework import views, generics, permissions, status
from rest_framework.response import Response
from .models import Exam, Question, ExamAttempt, ExamAnswer
from .serializers import ExamDetailSerializer, ExamSubmissionSerializer, ExamAttemptSerializer
from apps.accounts.permissions import IsOwnerOrStaff

class ExamListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Exam.objects.filter(is_active=True)
    serializer_class = ExamDetailSerializer

class ExamDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Exam.objects.filter(is_active=True)
    serializer_class = ExamDetailSerializer

class ExamSubmitView(views.APIView):
    """
    Submits student answers, performs server-side grading on 1000-point Certiport scale,
    and returns score, pass/fail status, skill breakdown and expert explanations.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ExamSubmissionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        exam_id = serializer.validated_data['exam_id']
        answers_dict = serializer.validated_data['answers']
        guest_name = serializer.validated_data.get('guest_name', '')
        guest_phone = serializer.validated_data.get('guest_phone', '')

        try:
            exam = Exam.objects.prefetch_related('questions').get(id=exam_id, is_active=True)
        except Exam.DoesNotExist:
            return Response({'success': False, 'error': 'Bài thi không tồn tại hoặc đã đóng.'}, status=status.HTTP_404_NOT_FOUND)

        questions = list(exam.questions.all())
        total_questions = len(questions)
        if total_questions == 0:
            return Response({'success': False, 'error': 'Bài thi hiện chưa có câu hỏi.'}, status=status.HTTP_400_BAD_REQUEST)

        correct_count = 0
        review_items = []
        skill_map = {}

        # Authenticated user or anonymous candidate
        user = request.user if request.user.is_authenticated else None

        attempt = ExamAttempt.objects.create(
            user=user,
            exam=exam,
            guest_name=guest_name,
            guest_phone=guest_phone,
            total_questions=total_questions
        )

        for q in questions:
            chosen = answers_dict.get(str(q.id))
            if chosen is None:
                chosen = answers_dict.get(q.id)

            is_correct = (chosen == q.correct_index)
            if is_correct:
                correct_count += 1

            ExamAnswer.objects.create(
                attempt=attempt,
                question=q,
                chosen_index=chosen,
                is_correct=is_correct
            )

            review_items.append({
                'question_id': q.id,
                'content': q.content,
                'options': q.options,
                'chosen_index': chosen,
                'correct_index': q.correct_index,
                'is_correct': is_correct,
                'explanation': q.explanation,
                'skill': q.skill,
            })

            curr = skill_map.get(q.skill, {'total': 0, 'correct': 0})
            curr['total'] += 1
            if is_correct:
                curr['correct'] += 1
            skill_map[q.skill] = curr

        scaled_score = round((correct_count / total_questions) * exam.total_points)
        passed = scaled_score >= exam.pass_score

        attempt.score = scaled_score
        attempt.passed = passed
        attempt.correct_count = correct_count
        attempt.save()

        skill_analysis = [
            {
                'skill': skill,
                'total': data['total'],
                'correct': data['correct'],
                'percentage': round((data['correct'] / data['total']) * 100),
                'status': 'Thành thạo' if (data['correct'] / data['total']) >= 0.8 else 'Cần cải thiện' if (data['correct'] / data['total']) >= 0.5 else 'Yếu'
            }
            for skill, data in skill_map.items()
        ]

        return Response({
            'success': True,
            'attempt_id': attempt.id,
            'exam_title': exam.title,
            'score': scaled_score,
            'total_points': exam.total_points,
            'pass_score': exam.pass_score,
            'passed': passed,
            'correct_count': correct_count,
            'total_questions': total_questions,
            'percentage': round((correct_count / total_questions) * 100),
            'skill_analysis': skill_analysis,
            'review_items': review_items,
        }, status=status.HTTP_200_OK)

class ExamAttemptDetailView(generics.RetrieveAPIView):
    """
    Object-level security: Chỉ thí sinh sở hữu bài thi hoặc nhân sự đào tạo (Academic/Admin)
    mới có quyền xem kết quả bài thi này. Chặn triệt để lỗ hổng IDOR.
    """
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]
    queryset = ExamAttempt.objects.all()
    serializer_class = ExamAttemptSerializer
