"""
Animation views

This module contains the views of the animation app.
The app has the following features:

- List animations: get a list of animations with id, preview image,
and whether the logged in user has bought it.
- Upload animation: upload an animation to the server.
- Buy animation: buy an animation for the logged in user.
- Download animation: send the CAFF file to the user if they are logged in
and if they have bought the animation.
- Comment animation: a logged in user can post a comment on an animation,
or get all comments posted for an animation.
- Delete animation: an admin user can delete an animation.
"""

import logging
import os
import uuid

from django.conf import settings
from django.http.response import FileResponse, Http404
from PIL import Image
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.views import APIView

from animation.serializers import (
    AnimationResponse,
    AnimationResponseSerializer,
    CommentSerializer,
)

from . import parser
from .models import Animation, Comment


logger = logging.getLogger(__name__)


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
        user = request.user
        current_dir = os.path.dirname(__file__)
        preview_filename = str(uuid.uuid4())
        ppm_path = os.path.join(current_dir, preview_filename)

        try:
            data = request.data["file"]
            caff = parser.Caff([b for b in data.read()])

            parser.ciff_to_ppm_p6(caff.get_ciff_images()[0], ppm_path)

            jpg_out_path = os.path.join(
                current_dir, "static", "animation", preview_filename + ".jpg"
            )
            with Image.open(ppm_path) as im:
                os.makedirs(os.path.dirname(jpg_out_path), exist_ok=True)
                im.save(jpg_out_path)
        except:
            logger.error("Error while uploading. User: %s", user.username)
            return Response(status=HTTP_400_BAD_REQUEST)
        finally:
            if os.path.exists(ppm_path):
                os.remove(ppm_path)

        animation = Animation.objects.create(
            owner=user,
            preview_file_path=jpg_out_path,
            preview_file_url=request.build_absolute_uri(
                f"{settings.STATIC_URL}animation/{preview_filename}.jpg"
            ),
            caff_file=data,
        )
        animation.users_purchased.add(user)

        return Response(status=HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def animation_buy(request, pk):
    user = request.user

    try:
        animation = Animation.objects.get(pk=pk)
    except Animation.DoesNotExist:
        logger.error("Animation to buy doesn't exist. User: %s", user.username)
        return Http404

    user.purchased_animation_set.add(animation)

    return Response(status=HTTP_204_NO_CONTENT)


@api_view(["GET"])
def animation_download(request, pk):
    user = request.user

    try:
        animation = Animation.objects.get(pk=pk)
    except Animation.DoesNotExist:
        logger.error("Animation to download doesn't exist. User: %s", user.username)
        return Http404

    if user in animation.users_purchased.all():
        f = open(os.path.join(settings.MEDIA_ROOT, animation.caff_file.name), "rb")
        res = FileResponse(f)
        res["Content-Length"] = animation.caff_file.size
        res["Content-Disposition"] = f"attachment; filename={animation.id}.caff"
    else:
        logger.error(
            "Animation to download isn't owned by user. User: %s", user.username
        )
        res = Response(status=HTTP_401_UNAUTHORIZED)

    return res


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def animation_comment(request, pk):
    try:
        animation = Animation.objects.get(pk=pk)
    except Animation.DoesNotExist:
        logger.error(
            "Animation to comment doesn't exist. User: %s", request.user.username
        )
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
