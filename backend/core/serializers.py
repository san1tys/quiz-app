from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username']


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'role']

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

