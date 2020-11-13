from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework.generics import ListAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from user.serializers import UserSerializer


@api_view(["POST"])
def user_register(request):
    username = request.data["username"]
    password = request.data["password"]

    if User.objects.filter(username=username).exists():
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