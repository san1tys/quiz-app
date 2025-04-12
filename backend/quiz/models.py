from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text

class AnswerChoice(models.Model):
    question = models.ForeignKey(Question, related_name='answer_choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class QuizEnrollment(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)  
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)  
    enrolled_at = models.DateTimeField(auto_now_add=True) 

    class Meta:
        unique_together = ('user', 'quiz')  

    def __str__(self):
        return f"{self.user.username} enrolled in {self.quiz.title}"

class QuizSubmission(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    answers = models.JSONField()  
    score = models.IntegerField(null=True, blank=True)  
    is_passed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'quiz')  
    
