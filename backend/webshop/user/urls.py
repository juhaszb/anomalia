from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from user import views
from user.views import TokenObtainPairViewWithUserType

urlpatterns = [
    path("register", views.user_register),
    path("login", TokenObtainPairViewWithUserType.as_view()),
    path("refresh", TokenRefreshView.as_view()),
    path("logout", views.user_logout),
    path("", views.UserList.as_view()),
    path("user/<int:pk>", views.UserDelete.as_view()),
]
