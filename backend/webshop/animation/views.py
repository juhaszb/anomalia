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
        data = request.data["file"]
        current_dir = os.path.dirname(__file__)
        preview_filename = str(uuid.uuid4())
        ppm_path = os.path.join(current_dir, preview_filename)
        try:
            caff = parser.Caff([b for b in data.read()])

            parser.ciff_to_ppm_p6(caff.get_ciff_images()[0], ppm_path)

            jpg_out_path = os.path.join(
                current_dir, "static", "animation", preview_filename + ".jpg"
            )
            with Image.open(ppm_path) as im:
                os.makedirs(os.path.dirname(jpg_out_path), exist_ok=True)
                im.save(jpg_out_path)
        except:
            return Response(status=HTTP_400_BAD_REQUEST)
        finally:
            if os.path.exists(ppm_path):
                os.remove(ppm_path)

        user = request.user
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
        return Http404

    user.purchased_animation_set.add(animation)

    return Response(status=HTTP_204_NO_CONTENT)


@api_view(["GET"])
def animation_download(request, pk):
    try:
        animation = Animation.objects.get(pk=pk)
    except Animation.DoesNotExist:
        return Http404

    if request.user in animation.users_purchased.all():
        f = open(os.path.join(settings.MEDIA_ROOT, animation.caff_file.name), "rb")
        res = FileResponse(f)
        res["Content-Length"] = animation.caff_file.size
        res["Content-Disposition"] = f"attachment; filename={animation.id}.caff"
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
