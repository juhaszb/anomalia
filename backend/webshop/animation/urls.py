"""
This file contains the URL mappings for the animation app.
"""

from django.urls import path

from animation import views

urlpatterns = [
    path("", views.AnimationListOrSend.as_view()),
    path("<int:pk>/buy", views.animation_buy),
    path("<int:pk>/download", views.animation_download),
    path("<int:pk>/comment", views.animation_comment),
    path("<int:pk>", views.AnimationDelete.as_view()),
]
