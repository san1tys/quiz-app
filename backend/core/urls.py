from django.urls import path

from .views import RegistrationAPIView, CurrentUserAPIView

urlpatterns = [
    path('registration/', RegistrationAPIView.as_view()),
    path('user/', CurrentUserAPIView.as_view())
]