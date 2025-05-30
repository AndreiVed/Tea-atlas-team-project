from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/catalog/", include("tea_catalog.urls", namespace="tea_catalog")),
    path("api/v1/auth/", include("user.urls", namespace="user")),  # build in simple JWT
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "api/v1/google_auth/",
        include("google_login_service.urls", namespace="google_auth"),
    ),
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
