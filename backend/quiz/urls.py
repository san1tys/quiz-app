# urls.py
from django.urls import path
from .views import QuizAPIView, QuizEnrollAPIView, MyQuizzesAPIView, QuizSubmitAPIView, QuizUnenrollAPIView, QuizDetailAPIView


urlpatterns = [
    path('quizzes/', QuizAPIView.as_view(), name='quiz-list'),
    path('<int:id>/', QuizDetailAPIView.as_view(), name='quiz_detail'),
    path('<int:quiz_id>/enroll/', QuizEnrollAPIView.as_view(), name='quiz-enroll'),
    path('<int:quiz_id>/unenroll/', QuizUnenrollAPIView.as_view(), name='quiz-unenroll'),
    path('my-quizzes/', MyQuizzesAPIView.as_view(), name='my-quizzes'),
    path('<int:quiz_id>/submit/', QuizSubmitAPIView.as_view(), name='quiz-submit')
]