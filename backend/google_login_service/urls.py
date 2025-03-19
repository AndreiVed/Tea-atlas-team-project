from django.urls import path

from google_login_service.apis import GoogleLoginApi, GoogleLoginRedirectApi

app_name = "google_auth"

urlpatterns = [
    path("callback/", GoogleLoginApi.as_view(), name="callback-raw"),
    path("redirect/", GoogleLoginRedirectApi.as_view(), name="redirect-raw"),
]
