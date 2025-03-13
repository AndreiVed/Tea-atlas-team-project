from urllib.parse import urljoin

import requests
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from django.shortcuts import render
from django.urls import reverse
from django.views import View
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from tea_catalog.serializers import TeaListSerializer




class FavoriteListView(APIView):
    def get(self, request):
        """
        List of all favorite tea
        """
        user = self.request.user
        favorite_tea = user.favorite.all()
        serializer = TeaListSerializer(favorite_tea, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_object(self):
        return self.request.user


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_OAUTH_CALLBACK_URL
    client_class = OAuth2Client


class GoogleLoginCallback(APIView):
    def get(self, request, *args, **kwargs):
        """
        If you are building a fullstack application (eq. with React app next to Django)
        you can place this endpoint in your frontend application to receive
        the JWT tokens there - and store them in the state
        """

        code = request.GET.get("code")
        if code is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Remember to replace the localhost:8000 with the actual domain name before deployment

        token_endpoint_url = urljoin(
            "http://localhost:8000", reverse("user:google_login")
        )

        response = requests.post(url=token_endpoint_url, data={"code": code})
        print(f"RESPONSE: {response}")
        return Response(response.json(), status=status.HTTP_200_OK)


class LoginPage(View):
    def get(self, request, *args, **kwargs):
        return render(
            request,
            "pages/login.html",
            {
                "google_callback_uri": settings.GOOGLE_OAUTH_CALLBACK_URL,
                "google_client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
            },
        )
