from django.contrib.auth import login
from django.shortcuts import redirect, render
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from google_login_service.service import GoogleRawLoginFlowService
from user.selectors import get_or_create_user, generate_jwt_token


class PublicApi(APIView):
    authentication_classes = ()
    permission_classes = ()


class GoogleLoginRedirectApi(PublicApi):
    def get(self, request, *args, **kwargs):
        google_login_flow = GoogleRawLoginFlowService()

        authorization_url, state = google_login_flow.get_authorization_url()
        request.session["google_oauth2_state"] = state
        return redirect(authorization_url)


class GoogleAuthCallbackHtmlView(PublicApi):
    """
    Цей ендпоінт обробляє GET-запит від Google після успішної авторизації.
    Він рендерить HTML-сторінку з JavaScript, який потім зробить POST-запит до бекенду.
    """

    def get(self, request, *args, **kwargs):
        # Тут ми просто передаємо code та state в шаблон,
        # щоб JavaScript міг їх зчитати.
        # Хоча JavaScript може зчитати їх і безпосередньо з window.location.search
        # Цей метод важливий для того, щоб браузер отримав HTML, а не JSON.
        print(f"CODE: {request.GET.get("code")}")
        print(f"STATE: {request.GET.get("state")}")
        return render(
            request,
            "callback.html",
            {
                "code": request.GET.get("code"),
                "state": request.GET.get("state"),
                "error": request.GET.get("error"),  # Якщо Google поверне помилку
            },
        )


class GoogleLoginApi(PublicApi):
    """
    Цей ендпоінт обробляє POST-запит від фронтенду з Google "code" та "state".
    Він обмінює "code" на токени, автентифікує користувача і повертає JWT-токени в JSON.
    """

    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=True)
        state = serializers.CharField(required=True)
        # error = serializers.CharField(required=False) # Обробка помилок Google буде на фронтенді

    class OutputSerializer(serializers.Serializer):
        access = serializers.CharField()
        refresh = serializers.CharField()
        user_id = serializers.IntegerField(required=False)  # Додайте, якщо потрібно
        email = serializers.EmailField(required=False)  # Додайте, якщо потрібно

    def post(self, request, *args, **kwargs):  # Змінено на POST
        input_serializer = self.InputSerializer(
            data=request.data
        )  # Використовуємо request.data для POST
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get("code")
        state = validated_data.get("state")

        session_state = request.session.get("google_oauth2_state")
        # Після успішного використання state, видаляємо його з сесії
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
            # id_token_decoded = google_tokens.decode_id_token() # Не обов'язково повертати на фронтенд
            print(f"GOOGLE TOKEN: {google_tokens}")
            user_info = google_login_flow.get_user_info(google_tokens=google_tokens)

            user, created = get_or_create_user(user_info)

            jwt_tokens = generate_jwt_token(user)

            login(
                request, user
            )  # Вхід користувача в сесію Django (якщо використовуєте сесії)

            response_data = {
                "access": jwt_tokens["access"],
                "refresh": jwt_tokens["refresh"],
                "user_id": user.id,
                "email": user.email,
            }
            print(f"resp data: {response_data}")
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            # Обробка будь-яких помилок під час обміну коду або отримання інформації про користувача
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
