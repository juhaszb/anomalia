from rest_framework import serializers
from django.db import models
from animation.models import Comment


class AnimationResponse:
    def __init__(self, id, url, bought):
        self.id = id
        self.url = url
        self.bought = bought


class AnimationResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    url = serializers.CharField(max_length=200)
    bought = serializers.BooleanField()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "text"]