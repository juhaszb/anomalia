import logging

from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.generics import DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser
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
