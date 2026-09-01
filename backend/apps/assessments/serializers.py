from rest_framework import serializers
from .models import Exam, Question, ExamAttempt, ExamAnswer

class SanitizedQuestionSerializer(serializers.ModelSerializer):
    """Excludes correct_index and explanation to prevent client cheating"""
    class Meta:
        model = Question
        fields = ['id', 'content', 'options', 'skill', 'points']

class ExamDetailSerializer(serializers.ModelSerializer):
    questions = SanitizedQuestionSerializer(many=True, read_only=True)
    subject_display = serializers.CharField(source='get_subject_display', read_only=True)

    class Meta:
        model = Exam
        fields = [
            'id', 'title', 'subject', 'subject_display', 'duration_minutes',
            'pass_score', 'total_points', 'questions'
        ]

class ExamSubmissionSerializer(serializers.Serializer):
    exam_id = serializers.IntegerField(required=True)
    answers = serializers.DictField(
        child=serializers.IntegerField(),
        required=True,
        help_text="Dictionary map of question_id -> chosen_option_index"
    )
    guest_name = serializers.CharField(required=False, allow_blank=True)
    guest_phone = serializers.CharField(required=False, allow_blank=True)

class ExamAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamAttempt
        fields = ['id', 'user', 'exam', 'score', 'total_questions', 'correct_count', 'passed', 'started_at']
        read_only_fields = ['id', 'user', 'exam', 'score', 'total_questions', 'correct_count', 'passed', 'started_at']


