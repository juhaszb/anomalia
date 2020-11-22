from django.db import models
from django.contrib.auth.models import User

class Animation(models.Model):
    ownerId = models.IntegerField()
    previewImageURL =   models.CharField(max_length=300)
    caffAnimationURL =  models.CharField(max_length=300)
    usersPurchased = models.ManyToManyField(User)

class Comment(models.Model):
    animation = models.ForeignKey(Animation, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
