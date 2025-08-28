from django.contrib.auth import login
from django.shortcuts import redirect, render
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from google_login_service.service import GoogleRawLoginFlowService
from tea_atlas_service import settings
from user.selectors import get_or_create_user, generate_jwt_token


class PublicApi(APIView):
    authentication_classes = ()
    permission_classes = ()


class GoogleLoginRedirectApi(PublicApi):
    def get(self, request, *args, **kwargs):
        google_login_flow = GoogleRawLoginFlowService()

        authorization_url, state = google_login_flow.get_authorization_url()
        print(111, authorization_url)
        print(f"111 STATE: {state}")
        request.session["google_oauth2_state"] = state
        return redirect(authorization_url)


class GoogleLoginApi(PublicApi):
    """
    This endpoint handles the GET request from Google after successful
    authorization. It validates the state, retrieves user info and tokens,
    and redirects back to the frontend with the tokens in the URL.
    """

    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=True)
        state = serializers.CharField(required=True)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.query_params)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data
        code = validated_data.get("code")
        state = validated_data.get("state")
        print(f"222 CODE: {code}")
        print(f"222 STATE: {state}")
        session_state = request.session.get("google_oauth2_state")
        print(f"222 SESSION_STATE: {session_state}")
        print(f"222 REQUEST: {request.session}")
        if "google_oauth2_state" in request.session:
            del request.session["google_oauth2_state"]

        if session_state is None or state != session_state:
            return Response(
                {"error": "CSRF check failed. Invalid or missing state."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        google_login_flow = GoogleRawLoginFlowService()

        try:
            google_tokens = google_login_flow.get_tokens(code=code)
            user_info = google_login_flow.get_user_info(google_tokens=google_tokens)

            user, created = get_or_create_user(user_info)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            # Determine the redirect URL based on the environment
            if settings.DEBUG:
                frontend_url = "http://localhost:5173"
            else:
                frontend_url = "https://tea-atlas.onrender.com"

            # Construct the final redirect URL with tokens in the query parameters
            redirect_url = (
                f"{frontend_url}/callback?"
                f"access={str(refresh.access_token)}&"
                f"refresh={str(refresh)}&"
                f"user_id={user.id}&"
                f"email={user.email}"
            )
            return redirect(redirect_url)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# class GoogleAuthCallbackHtmlView(PublicApi):
#     """
#     Цей ендпоінт обробляє GET-запит від Google після успішної авторизації.
#     Він рендерить HTML-сторінку з JavaScript, який потім зробить POST-запит до бекенду.
#     """
#
#     def get(self, request, *args, **kwargs):
#         # Цей метод важливий для того, щоб браузер отримав HTML, а не JSON.
#
#         return render(
#             request,
#             "callback.html",
#             {
#                 "code": request.GET.get("code"),
#                 "state": request.GET.get("state"),
#                 "error": request.GET.get("error"),  # Якщо Google поверне помилку
#             },
#         )
#
#
# class GoogleLoginApi(PublicApi):
#     """
#     Цей ендпоінт обробляє POST-запит від фронтенду з Google "code" та "state".
#     Він обмінює "code" на токени, автентифікує користувача і повертає JWT-токени в JSON.
#     """
#
#     class InputSerializer(serializers.Serializer):
#         code = serializers.CharField(required=True)
#         state = serializers.CharField(required=True)
#         error = serializers.CharField(
#             required=False
#         )  # Обробка помилок Google буде на фронтенді
#
#     class OutputSerializer(serializers.Serializer):
#         access = serializers.CharField()
#         refresh = serializers.CharField()
#         user_id = serializers.IntegerField(required=False)  # Додайте, якщо потрібно
#         email = serializers.EmailField(required=False)  # Додайте, якщо потрібно
#
#     def post(self, request, *args, **kwargs):
#         input_serializer = self.InputSerializer(data=request.data)
#         input_serializer.is_valid(raise_exception=True)
#
#         validated_data = input_serializer.validated_data
#         code = validated_data.get("code")
#         state = validated_data.get("state")
#
#         session_state = request.session.get("google_oauth2_state")
#         if "google_oauth2_state" in request.session:
#             del request.session["google_oauth2_state"]
#
#         if session_state is None or state != session_state:
#             return Response(
#                 {"error": "CSRF check failed. Invalid or missing state."},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#
#         google_login_flow = GoogleRawLoginFlowService()
#
#         try:
#             google_tokens = google_login_flow.get_tokens(code=code)
#             user_info = google_login_flow.get_user_info(google_tokens=google_tokens)
#
#             user, created = get_or_create_user(user_info)
#
#             # Створення JWT-токенів
#             refresh = RefreshToken.for_user(user)
#
#             response = Response(status=status.HTTP_200_OK)
#
#             # Встановлюємо access_token cookie
#             response.set_cookie(
#                 key="access_token",
#                 value=str(refresh.access_token),
#                 httponly=True,
#                 secure=not settings.DEBUG,  # Правильна логіка
#                 samesite="Lax",
#             )
#             # Встановлюємо refresh_token cookie
#             response.set_cookie(
#                 key="refresh_token",
#                 value=str(refresh),
#                 httponly=True,
#                 secure=not settings.DEBUG,  # Правильна логіка
#                 samesite="Lax",
#             )
#
#             # Ви можете повернути JSON з інформацією про користувача,
#             # але токени вже будуть у cookie
#             response.data = {
#                 "user_id": user.id,
#                 "email": user.email,
#             }
#
#             return response
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
