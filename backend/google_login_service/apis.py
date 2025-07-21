# google_login_service/views.py

from django.contrib.auth import login
from django.shortcuts import redirect
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    GenericAPIView,
)  # Можна використовувати GenericAPIView для більш чистої обробки серіалізаторів

from google_login_service.service import GoogleRawLoginFlowService
from user.selectors import get_or_create_user, generate_jwt_token

# ... (PublicApi залишається без змін) ...


class PublicApi(APIView):
    authentication_classes = ()
    permission_classes = ()


class GoogleLoginRedirectApi(PublicApi):
    """
    Цей ендпоінт ініціює переадресацію на Google для початку OAuth потоку.
    Фронтенд викликає його для старту.
    """

    def get(self, request, *args, **kwargs):
        # Отримуємо URL фронтенду, куди потрібно повернутися після успішного входу
        # Це те, що фронтенд передає як query-параметр до цього ендпоінту
        frontend_redirect_url = request.GET.get("frontend_redirect_url")

        google_login_flow = GoogleRawLoginFlowService()
        authorization_url, state = google_login_flow.get_authorization_url()

        # Зберігаємо state та URL фронтенду в сесії
        request.session["google_oauth2_state"] = state
        if frontend_redirect_url:
            request.session["frontend_redirect_url"] = (
                frontend_redirect_url  # Зберігаємо для подальшого редиректу
            )

        return redirect(authorization_url)


class GoogleLoginApi(PublicApi):
    """
    Цей ендпоінт обробляє POST-запит від фронтенду з Google "code".
    Він обмінює "code" на токени, автентифікує користувача і повертає JWT-токени.
    """

    class InputSerializer(serializers.Serializer):
        # Якщо фронтенд передає code і state через POST, вони повинні бути в тілі запиту
        code = serializers.CharField(required=True)  # Тепер code має бути завжди
        state = serializers.CharField(required=True)  # Тепер state має бути завжди

    class OutputSerializer(serializers.Serializer):
        access = serializers.CharField()
        refresh = serializers.CharField()
        user_id = (
            serializers.IntegerField()
        )  # Додайте, якщо потрібно повернути ID користувача
        email = serializers.EmailField()  # Додайте, якщо потрібно повернути email

    # Змінюємо метод з GET на POST
    def post(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.data)  # data замість GET
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get("code")
        state = validated_data.get("state")

        # Перевірка помилок від Google тепер буде на фронтенді,
        # який буде вирішувати, чи робити POST-запит до бекенду
        # if error is not None: ... (Цю логіку можна перенести на фронтенд)

        session_state = request.session.get("google_oauth2_state")
        # Після успішного використання state, видаляємо його з сесії
        if "google_oauth2_state" in request.session:
            del request.session["google_oauth2_state"]

        if session_state is None or state != session_state:
            # Це дуже важлива перевірка безпеки CSRF
            return Response(
                {"error": "CSRF check failed. Invalid or missing state."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        google_login_flow = GoogleRawLoginFlowService()

        # Отримання токенів Google
        google_tokens = google_login_flow.get_tokens(code=code)
        id_token_decoded = (
            google_tokens.decode_id_token()
        )  # Не обов'язково повертати на фронтенд

        # Отримання інформації про користувача з Google
        user_info = google_login_flow.get_user_info(google_tokens=google_tokens)

        # Отримання або створення користувача у вашій системі
        user, created = get_or_create_user(user_info)

        # Генерація JWT-токенів вашої системи
        jwt_tokens = generate_jwt_token(user)

        # Вхід користувача в сесію Django (якщо ви використовуєте сесії)
        login(request, user)

        # Повертаємо JWT-токени фронтенду
        response_data = {
            "access": jwt_tokens["access"],
            "refresh": jwt_tokens["refresh"],
            "user_id": user.id,  # Додайте, якщо потрібно
            "email": user.email,  # Додайте, якщо потрібно
        }
        return Response(response_data, status=status.HTTP_200_OK)


# from django.contrib.auth import login
# from django.shortcuts import redirect
# from rest_framework import serializers, status
# from rest_framework.response import Response
# from rest_framework.views import APIView
#
# from google_login_service.service import GoogleRawLoginFlowService
# from user.selectors import get_or_create_user, generate_jwt_token
#
#
# class PublicApi(APIView):
#     authentication_classes = ()
#     permission_classes = ()
#
#
# class GoogleLoginRedirectApi(PublicApi):
#     def get(self, request, *args, **kwargs):
#         google_login_flow = GoogleRawLoginFlowService()
#
#         authorization_url, state = google_login_flow.get_authorization_url()
#         request.session["google_oauth2_state"] = state
#         return redirect(authorization_url)
#
#
# class GoogleLoginApi(PublicApi):
#     class InputSerializer(serializers.Serializer):
#         code = serializers.CharField(required=False)
#         error = serializers.CharField(required=False)
#         state = serializers.CharField(required=False)
#
#     def get(self, request, *args, **kwargs):
#         input_serializer = self.InputSerializer(data=request.GET)
#         input_serializer.is_valid(raise_exception=True)
#
#         validated_data = input_serializer.validated_data
#
#         code = validated_data.get("code")
#         error = validated_data.get("error")
#         state = validated_data.get("state")
#         if error is not None:
#             return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
#
#         if code is None or state is None:
#             return Response(
#                 {"error": "Code and state are required."},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#
#         session_state = request.session.get("google_oauth2_state")
#
#         if session_state is None:
#             return Response(
#                 {"error": "CSRF check failed."}, status=status.HTTP_400_BAD_REQUEST
#             )
#
#         del request.session["google_oauth2_state"]
#
#         if state != session_state:
#             return Response(
#                 {"error": "CSRF check failed."}, status=status.HTTP_400_BAD_REQUEST
#             )
#
#         google_login_flow = GoogleRawLoginFlowService()
#
#         google_tokens = google_login_flow.get_tokens(code=code)
#
#         id_token_decoded = google_tokens.decode_id_token()
#
#         user_info = google_login_flow.get_user_info(google_tokens=google_tokens)
#
#         user, created = get_or_create_user(user_info)
#
#         jwt_tokens = generate_jwt_token(user)
#
#         login(request, user)
#
#         result = {
#             "id_token_decoded": id_token_decoded,
#             "user_info": user_info,
#             "tokens": jwt_tokens,
#         }
#
#         return Response(result)
