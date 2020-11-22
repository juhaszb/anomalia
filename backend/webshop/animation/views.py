from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.generics import DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Animation
from animation.serializers import AnimationResponseSerializer, AnimationResponse,CommentSerializer
from django.contrib.auth.models import User

@api_view(['GET', 'POST'])
def animation(request):

    if request.method == 'GET':    
       return animation_list(request)
        
    elif request.method == 'POST':
       return animation_upload(request)

    

@api_view(["POST"])
def animation_buy(request):

    try:
        userId = request.user.id
        user = User.objects.get(pk = userId)

        animationId = request.data["id"]
        animation = Animation.objects.get(pk = animationId)

        user.animation_set.add(animation)

    except:
        return Response("Purchase error!", HTTP_400_BAD_REQUEST)

    return Response( status=HTTP_204_NO_CONTENT)


@api_view(["GET"])
def animation_download(request):

    return Response( status=HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def animation_comment(request):
    try:
        animationId = request.data["animationId"]   
        animation = Animation.objects.get(pk = animationId)

        if request.method == 'GET':    
            comments = animation.comment_set.all() 
            data = CommentSerializer(comments, many = True)
            return Response(data = data.data, status=HTTP_204_NO_CONTENT)   

        elif request.method == 'POST':
            commentText = request.data["comment"]
            animation.comment_set.create(text = commentText)

    except:
        return Response("Comment error!", HTTP_400_BAD_REQUEST)

    return Response( status=HTTP_204_NO_CONTENT)


def animation_list(request):

    userId = request.user.id

    if userId is None:
         return Response("No user logged in!", HTTP_400_BAD_REQUEST)

    try:

        user = User.objects.get(pk = userId)
        boughtAnimations = user.animation_set.all()

        animationResponseList = []
        for animation in Animation.objects.all(): 
            animationResponseList.append(AnimationResponse(animation.id,animation.previewImageURL, animation in boughtAnimations))
            
        data = AnimationResponseSerializer(animationResponseList,many = True)

    except:
        return Response("Invalid User!", HTTP_400_BAD_REQUEST)

    return Response( data = data.data ,status=HTTP_204_NO_CONTENT)

def animation_upload(request):
    return Response( status=HTTP_204_NO_CONTENT)

class AnimationDelete(DestroyAPIView):
    queryset = Animation.objects.all()
    permission_classes = [IsAdminUser]