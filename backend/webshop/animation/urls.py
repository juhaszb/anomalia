from django.urls import path

from animation import views

urlpatterns = [
    path("", views.animation),
    path("buy", views.animation_buy),
    path("download", views.animation_download),
    path("comment", views.animation_comment),
    path("<int:pk>", views.AnimationDelete.as_view()),
]
