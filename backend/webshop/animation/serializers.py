"""
Animation serializers

This module provides serializers for the REST API.

Animation response is an item of the list when getting all animations.

Comments are serialized with their ID and text.
"""

from rest_framework import serializers

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
