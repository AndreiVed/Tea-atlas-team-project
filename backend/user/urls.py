from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from user.views import (
    # CreateUserView,
    # ManageUserView,
    FavoriteListView,
    GoogleLogin,
    GoogleLoginCallback,
    LoginPage,
    # LogoutView,
)

app_name = "user"

urlpatterns = [
    # path("register/", CreateUserView.as_view(), name="create"),
    # path("me/", ManageUserView.as_view(), name="manage"),
    # path("login/", TokenObtainPairView.as_view(), name="login"),
    # path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    # path("logout/", LogoutView.as_view(), name="logout"),
    path("google_login/", LoginPage.as_view(), name="google_login_page"),
    path("", include("dj_rest_auth.urls")),  # dj_rest_auth
    path("registration/", include("dj_rest_auth.registration.urls")),
    re_path("accounts/", include("allauth.urls")),
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path(
        "google/callback/",
        GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
    path(
        "user/favorite_list/",
        FavoriteListView.as_view(),
        name="favorite_list",
    ),
]
