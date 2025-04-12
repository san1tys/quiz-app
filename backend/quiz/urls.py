# urls.py
from django.urls import path
from .views import QuizAPIView, QuizCreateAPIView, QuizEnrollAPIView, MyQuizzesAPIView, QuizSubmitAPIView, QuizUnenrollAPIView, QuizDetailAPIView, StudentScoresAPIView


urlpatterns = [
    path('quizzes/', QuizAPIView.as_view(), name='quiz-list'),
    path('create/', QuizCreateAPIView.as_view(), name='create-quiz-by-teacher'),
    path('my-quizzes/', MyQuizzesAPIView.as_view(), name='my-quizzes'),
    path('my-quizzes/<int:quiz_id>/submit/', QuizSubmitAPIView.as_view(), name='quiz-submit'),
    path('<int:quiz_id>/enroll/', QuizEnrollAPIView.as_view(), name='quiz-enroll'),
    path('<int:quiz_id>/unenroll/', QuizUnenrollAPIView.as_view(), name='quiz-unenroll'),
    path('<int:quiz_id>/scores/', StudentScoresAPIView.as_view(), name='quiz-scores'),    
    path('<int:id>/', QuizDetailAPIView.as_view(), name='quiz-detail'),
]
