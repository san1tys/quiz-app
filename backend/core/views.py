from rest_framework.views import APIView
from .serializers import RegistrationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema

class RegistrationAPIView(APIView):
    serializer_class = RegistrationSerializer


    @swagger_auto_schema(
        operation_description="Registration",
        request_body=RegistrationSerializer,
        responses={
            200: RegistrationSerializer(),
        }
    )
    def post(self, request):
        user = request.data

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


class CurrentUserAPIView(APIView):
    """
        Get user's detailed info
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "role": user.role
        })