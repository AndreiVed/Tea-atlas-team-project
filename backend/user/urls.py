from django.urls import path, include

from user.views import (
    FavoriteListView,
)

app_name = "user"

urlpatterns = [
    path("", include("dj_rest_auth.urls")),  # dj_rest_auth
    path("registration/", include("dj_rest_auth.registration.urls")),
    path(
        "user/favorite_list/",
        FavoriteListView.as_view(),
        name="favorite_list",
    ),
]
