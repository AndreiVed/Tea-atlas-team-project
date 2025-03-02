from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/catalog/", include("tea_catalog.urls", namespace="tea_catalog")),
]
