from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id','user_name','user_email','last_update','created_on')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ('user_id','user_name','user_email','password')

    def create(self, validated_data):
        user = User.objects.create_user(
            user_email=validated_data['user_email'],
            user_name=validated_data['user_name'],
            password=validated_data['password']
        )
        return user
