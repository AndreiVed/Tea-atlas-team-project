from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

from user.views import GoogleLogin, GoogleLoginCallback, LoginPage

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/catalog/", include("tea_catalog.urls", namespace="tea_catalog")),
    path("api/v1/auth/", include("user.urls", namespace="user")),  # build in simple JWT

    # documentation
    path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/v1/schema/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/v1/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
