import os

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.signals import pre_delete
from django.dispatch import receiver


class Animation(models.Model):
    owner = models.ForeignKey(
        User, on_delete=CASCADE, related_name="owned_animation_set"
    )
    preview_file_path = models.CharField(max_length=200)
    preview_file_url = models.CharField(max_length=200)
    caff_file = models.FileField(upload_to="uploads")
    users_purchased = models.ManyToManyField(
        User, related_name="purchased_animation_set"
    )


@receiver(pre_delete, sender=Animation)
def delete_animation(sender, **kwargs):
    animation = kwargs["instance"]
    caff_path = os.path.join(settings.MEDIA_ROOT, animation.caff_file.name)
    preview_path = animation.preview_file_path
    if os.path.exists(caff_path):
        os.remove(caff_path)
    if os.path.exists(preview_path):
        os.remove(preview_path)


class Comment(models.Model):
    animation = models.ForeignKey(Animation, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
