from django.urls import path, include
from rest_framework import routers

from tea_catalog.views import TeaViewSet

app_name = "tea_catalog"

router = routers.DefaultRouter()
router.register("", TeaViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
