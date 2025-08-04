from unittest.mock import patch

from django.test import TestCase
from rest_framework.test import APITestCase

from django.urls import reverse
from rest_framework import status
from user.models import User


class GoogleLoginRedirectApiTest(TestCase):
    def test_redirect_to_google_auth(self):
        url = reverse("google_auth:google_login_redirect")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertIn("https://accounts.google.com/o/oauth2/auth", response["Location"])


class GoogleLoginApiTests(APITestCase):

    def setUp(self):
        self.url = reverse("google_auth:google_login_process")
        # Імітуємо дані, які ми б отримали від Google
        self.google_tokens_data = {
            "access_token": "fake_access_token_from_google",
            "refresh_token": "fake_refresh_token_from_google",
            "id_token": "fake_id_token_from_google",
        }
        self.user_info_data = {
            "email": "new_user@example.com",
            "name": "New User",
        }

    @patch("google_login_service.service.GoogleRawLoginFlowService.get_tokens")
    @patch("google_login_service.service.GoogleRawLoginFlowService.get_user_info")
    def test_successful_google_login(self, mock_get_user_info, mock_get_tokens):
        """
        Тестуємо повний успішний цикл обміну `code` на токени та автентифікації.
        """
        # 1. Налаштовуємо імітацію (mock)
        # Встановлюємо, що наші імітовані методи повертатимуть фіктивні дані
        mock_get_tokens.return_value = self.google_tokens_data
        mock_get_user_info.return_value = self.user_info_data
        # 2. Створюємо сесію та встановлюємо в неї state
        session = self.client.session
        session["google_oauth2_state"] = "test_state"
        session.save()

        # 3. Відправляємо POST-запит, як це зробив би фронтенд
        response = self.client.post(
            self.url,
            {"code": "fake_code_from_google", "state": "test_state"},
            format="json",
        )

        # 4. Перевіряємо відповідь API
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # 5. Перевіряємо, чи були встановлені cookie
        self.assertIn("access_token", self.client.cookies)
        self.assertIn("refresh_token", self.client.cookies)
        print(self.client.cookies)
        # 6. Перевіряємо, чи був створений новий користувач
        self.assertTrue(User.objects.filter(email="new_user@example.com").exists())

    @patch("google_login_service.service.GoogleRawLoginFlowService.get_tokens")
    def test_google_login_invalid_state(self, mock_get_tokens):
        """
        Перевіряємо, чи запит відхиляється, якщо state не співпадає.
        """
        # Імітуємо стан сесії, який не співпадає
        session = self.client.session
        session["google_oauth2_state"] = "wrong_state"
        session.save()

        response = self.client.post(
            self.url, {"code": "fake_code", "state": "correct_state"}, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("CSRF check failed", str(response.data))

    @patch("google_login_service.service.GoogleRawLoginFlowService.get_tokens")
    def test_google_login_google_error(self, mock_get_tokens):
        """
        Перевіряємо, як обробляються помилки від Google (наприклад, невалідний code).
        """
        # Налаштовуємо імітацію, щоб вона кидала виняток
        mock_get_tokens.side_effect = Exception("Google token request failed")

        session = self.client.session
        session["google_oauth2_state"] = "test_state"
        session.save()

        response = self.client.post(
            self.url, {"code": "invalid_code", "state": "test_state"}, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Google token request failed", str(response.data))
