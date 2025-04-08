from django.contrib import admin
from .models import Quiz, Question, StudentAnswer, AnswerChoice
# Register your models here.

admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(StudentAnswer)
admin.site.register(AnswerChoice)