
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Quiz, QuizEnrollment, QuizSubmission
from django.shortcuts import get_object_or_404
from .serializers import QuizDetailSerializer, QuizListSerializer, QuizSubmissionSerializer

class QuizAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.role == 'teacher':
            quizzes = Quiz.objects.all().filter(created_by=request.user)  
        else:
            quizzes = Quiz.objects.all()
        serializer = QuizListSerializer(quizzes, many=True)
        return Response(serializer.data)
    
    
class QuizDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        print(id)
        quiz = get_object_or_404(Quiz, pk=id)
        serializer = QuizDetailSerializer(quiz)
        return Response(serializer.data)


class QuizEnrollAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_id):
        user = request.user

        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"detail": "Quiz not found."}, status=404)
        
        if QuizEnrollment.objects.filter(user=user, quiz=quiz).exists():
            return Response({"detail": "Already enrolled."}, status=400)

        QuizEnrollment.objects.create(user=user, quiz=quiz)
        return Response({"detail": "Enrolled successfully!"}, status=201)


class QuizUnenrollAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_id):
        user = request.user

        try:
            enrollment = QuizEnrollment.objects.get(user=user, quiz__id=quiz_id)
            
        except QuizEnrollment.DoesNotExist:
            return Response({"detail": "You are not enrolled in this quiz."}, status=404)

        submissions = QuizSubmission.objects.filter(user=user, quiz=quiz_id).first()

        if submissions:
            submissions.delete()

        enrollment.delete()

        return Response({"detail": "Unenrolled successfully!"}, status=200)


class MyQuizzesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        enrollments = QuizEnrollment.objects.filter(user=request.user).select_related('quiz')
        quizzes = [e.quiz for e in enrollments]
        serializer = QuizListSerializer(quizzes, many=True)
        return Response(serializer.data)

class QuizSubmitAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_id):
        user = request.user

        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"detail": "Quiz not found."}, status=404)

        if QuizSubmission.objects.filter(user=user, quiz=quiz).exists():
            return Response({"detail": "You already submitted this quiz."}, status=400)

        answers = request.data.get("answers")  
        if not answers:
            return Response({"detail": "No answers provided."}, status=400)


        score = self.evaluate_quiz(quiz, answers)


        serializer = QuizSubmissionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                user=user,
                quiz=quiz,
                score=score,
                is_passed=score >= 50
            )
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)

    def evaluate_quiz(self, quiz, answers):
        correct = 0
        questions = quiz.questions.all()

        print(answers)
        print(questions)

        for q in questions:
            print(q)
            correct_answer = q.answer_choices.filter(is_correct=True).first()
            print(correct_answer)
            if str(q.id) in answers and answers[str(q.id)].strip().lower() == correct_answer.text.lower():
                    correct += 1

        return int((correct / questions.count()) * 100)
