from allauth.account.views import ConfirmEmailView
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView

from user.serializers import CustomConfirmEmailView
from user.views import (
    FavoriteListView,
)

app_name = "user"

urlpatterns = [
    path("", include("dj_rest_auth.urls")),  # dj_rest_auth
    re_path(
        "registration/account-confirm-email/(?P<key>[-:\w]+)/$",
        CustomConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
    path(
        "user/favorite_list/",
        FavoriteListView.as_view(),
        name="favorite_list",
    ),
]
