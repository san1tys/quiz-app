
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import IsTeacherOrReadOnly
from .models import Quiz, QuizEnrollment, QuizSubmission
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from .serializers import QuizDetailSerializer, QuizListSerializer, QuizSubmissionSerializer
from drf_yasg import openapi

class AuthenticatedAPIView(APIView):
    permission_classes = [IsAuthenticated]


class QuizAPIView(AuthenticatedAPIView):
    """
        Getting all quizzes that is created by teacher
        or
        View all quizzes that is exists in system by student
    """

    @swagger_auto_schema(
        responses={200: QuizListSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        if request.user.role == 'teacher':
            quizzes = Quiz.objects.filter(created_by=request.user)
        else:
            quizzes = Quiz.objects.all()
        serializer = QuizListSerializer(quizzes, many=True)
        return Response(serializer.data)

    
    
class QuizDetailAPIView(AuthenticatedAPIView):

    @swagger_auto_schema(
        operation_description="Get deatiled view of quiz(questions, answers)",
        responses={200: QuizDetailSerializer()}
    )
    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        quiz = get_object_or_404(Quiz, pk=id)
        serializer = QuizDetailSerializer(quiz)
        return Response(serializer.data)


class QuizCreateAPIView(AuthenticatedAPIView):
    """
        Create quiz by teacher only
    """
    permission_classes = [IsTeacherOrReadOnly]

    @swagger_auto_schema(request_body=QuizDetailSerializer, responses={201: 'Quiz created'})
    def post(self, request):
        serializer = QuizDetailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user)
        return Response({"detail": "Quiz created successfully"}, status=201)

class QuizEnrollAPIView(AuthenticatedAPIView):
    @swagger_auto_schema(
        operation_description="Enroll to the quiz by id",
        responses={
            201: openapi.Response("Enrolled successfully"),
            400: "Already enrolled"
        }
    )
    def post(self, request, quiz_id):
        user = request.user
        quiz = get_object_or_404(Quiz, pk=quiz_id)

        if QuizEnrollment.objects.filter(user=user, quiz=quiz).exists():
            return Response({"detail": "Already enrolled."}, status=400)

        QuizEnrollment.objects.create(user=user, quiz=quiz)
        return Response({"detail": "Enrolled successfully!"}, status=201)


class QuizUnenrollAPIView(AuthenticatedAPIView):
    """
        Unenroll from the quiz by student
    """

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Unenrolled successfully"),
            400: "Not enrolled in this quiz"
        }
    )
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


class MyQuizzesAPIView(AuthenticatedAPIView):
    """
        View of all quizzes that were enrolled by student.
    """

    def get(self, request):
        enrollments = QuizEnrollment.objects.filter(user=request.user).select_related('quiz')
        quizzes = [e.quiz for e in enrollments]
        serializer = QuizListSerializer(quizzes, many=True)
        return Response(serializer.data)

class QuizSubmitAPIView(AuthenticatedAPIView):

    @swagger_auto_schema(
        operation_description="Submit answers to the quiz. Evaluate score",
        request_body=QuizSubmissionSerializer,
        responses={
            200: QuizSubmissionSerializer(),
            400: "Validation error",
            403: "have not enrollet to the quiz",
            404: "Quiz not found"
        }
    )
    def post(self, request, quiz_id):
        user = request.user

        try:
            enrollment = QuizEnrollment.objects.filter(user=user).first()
        except QuizEnrollment.DoesNotExist:
            return Response({"detail": "You have not enrolled to the quiz."}, status=403)

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


class StudentScoresAPIView(AuthenticatedAPIView):
    """
        Checking student's answers, only for teachers
    """

    permission_classes = [IsTeacherOrReadOnly]

    def get(self, request, quiz_id):
        if request.user.role == 'teacher':
            quiz = Quiz.objects.filter(id = quiz_id, created_by=request.user).first()
            print(quiz)
            data = QuizSubmission.objects.filter(quiz=quiz)
            print(data)
            if not data:
                return Response({"detail" : "No one passed the quiz"}, status=200)
        else:
            return Response({"detail" : "You can't see student's answers"}, status=500)
        serializer = QuizSubmission(data, many=True)
        return Response(serializer.data)
 
 