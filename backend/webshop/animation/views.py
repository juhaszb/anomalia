import parser

from django.contrib.auth.models import User
from django.http.response import Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)
from rest_framework.views import APIView

from animation.serializers import (
    AnimationResponse,
    AnimationResponseSerializer,
    CommentSerializer,
)

from .models import Animation, Comment


class AnimationListOrSend(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        bought_animations = user.purchased_animation_set.all()

        animation_responses = []
        for animation in Animation.objects.all():
            animation_responses.append(
                AnimationResponse(
                    animation.id,
                    animation.preview_file_url,
                    animation in bought_animations,
                )
            )

        serializer = AnimationResponseSerializer(animation_responses, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):
        pass


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def animation_buy(request, pk):
    user = request.user

    try:
        animation = Animation.objects.get(pk=pk)
    except Animation.DoesNotExist:
        return Http404

    user.animation_set.add(animation)

    return Response(status=HTTP_204_NO_CONTENT)


@api_view(["GET"])
def animation_download(request, pk):
    try:
        animation = Animation.objects.get(pk=pk)
    except Animation.DoesNotExist:
        return Http404

    if request.user in animation.users_purchased:
        with open(animation.caff_file.url, "rb") as f:
            res = Response(f.read())
    else:
        res = Response(status=HTTP_401_UNAUTHORIZED)

    return res


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def animation_comment(request, pk):
    try:
        animation = Animation.objects.get(pk=pk)
    except Animation.DoesNotExist:
        return Http404

    if request.method == "GET":
        comments = animation.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        comment_text = request.data["comment"]
        Comment.objects.create(animation=animation, text=comment_text)

    return Response(status=HTTP_204_NO_CONTENT)


class AnimationDelete(DestroyAPIView):
    queryset = Animation.objects.all()
    permission_classes = [IsAdminUser]
