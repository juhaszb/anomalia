"""
User serializers

This module provides serializers for the REST API.

The user type token serializer includes the user type in the
JWT token pair returned after logging in.

The user serializer returns the ID and username of users.
"""

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserTypeTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["usertype"] = "admin" if user.is_staff else "normal"

        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]
