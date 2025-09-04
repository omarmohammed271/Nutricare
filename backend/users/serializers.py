from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    # username = serializers.CharField(max_length=150, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    role = serializers.ChoiceField(choices=[('admin', 'Admin'), ('streamer', 'Streamer'), ('guest', 'Guest')], default='streamer')

    