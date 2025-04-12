from rest_framework import serializers
from .models import *


class AnswerChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerChoice
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    answer_choices = AnswerChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ['text', 'answer_choices']

class QuizDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    class Meta:
        model = Quiz
        fields = ['title', 'description', 'questions']
        read_only_fields = ['created_by']
    
    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        quiz = Quiz.objects.create(**validated_data)

        for question_data in questions_data:
            answer_choices_data = question_data.pop('answer_choices')
            question = Question.objects.create(quiz=quiz, **question_data)

            for choice_data in answer_choices_data:
                AnswerChoice.objects.create(question=question, **choice_data)

        return quiz

class QuizListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description']

        

class QuizSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSubmission
        fields = ['answers', 'user', 'quiz', 'score', 'is_passed', 'submitted_at']
        read_only_fields = ['user', 'quiz', 'score', 'is_passed', 'submitted_at']

