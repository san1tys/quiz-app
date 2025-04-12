from django.urls import path

from .views import RegistrationAPIView, CurrentUserAPIView

urlpatterns = [
    path('registration/', RegistrationAPIView.as_view(), name='registration'),
    path('user/', CurrentUserAPIView.as_view(), name='get-user-info')
]