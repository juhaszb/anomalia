"""
User views

This module contains the views of the user app.
The app has the following features:

- Login: a user can login with a username and password, then
they receive a JWT token pair.
- Register: add a new user with the given username and password.
- Logout: a user can log out of the system, which blacklists
their JWT refresh token.
- List users: an admin user can list all user IDs and usernames in the system.
- Delete user: an admin user can delete a user.
"""

import logging

from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from user.serializers import UserSerializer, UserTypeTokenObtainPairSerializer


logger = logging.getLogger(__name__)


class TokenObtainPairViewWithUserType(TokenObtainPairView):
    serializer_class = UserTypeTokenObtainPairSerializer


@api_view(["POST"])
def user_register(request):
    username = request.data["username"]
    password = request.data["password"]

    if User.objects.filter(username=username).exists():
        logger.error("Username already exists: %s", username)
        return Response("Username already exists", HTTP_400_BAD_REQUEST)

    User.objects.create_user(username=username, password=password)
    return Response(status=HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes(IsAuthenticated)
def user_logout(request):
    refresh = RefreshToken(request.data["refresh"])
    refresh.blacklist()

    return Response(status=HTTP_204_NO_CONTENT)


class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class UserDelete(DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]
