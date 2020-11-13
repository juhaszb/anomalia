from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST


@api_view(["POST"])
def user_register(request):
    username = request.data["username"]
    password = request.data["password"]

    if User.objects.filter(username=username).exists():
        return Response("Username already exists", HTTP_400_BAD_REQUEST)

    User.objects.create_user(username=username, password=password)
    return Response()
