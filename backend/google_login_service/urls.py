from django.urls import path

from google_login_service.apis import GoogleLoginApi, GoogleLoginRedirectApi

app_name = "google_auth"

urlpatterns = [
    # Ендпоінт, який фронтенд викликає для початку Google OAuth
    path("redirect/", GoogleLoginRedirectApi.as_view(), name="google_login_redirect"),
    # Ендпоінт, куди фронтенд відправляє "code" після отримання його від Google
    path("login/", GoogleLoginApi.as_view(), name="google_login_process"),
    # path("callback/", GoogleLoginApi.as_view(), name="callback-raw"),
    # path("redirect/", GoogleLoginRedirectApi.as_view(), name="redirect-raw"),
]
