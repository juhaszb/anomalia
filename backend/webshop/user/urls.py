from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from user import views

urlpatterns = [
    path("register", views.user_register),
    path("login", TokenObtainPairView.as_view()),
    path("refresh", TokenRefreshView.as_view()),
    path("logout", views.user_logout),
    path("", views.UserList.as_view()),
    path("user/<int:pk>", views.UserDelete.as_view()),
]
