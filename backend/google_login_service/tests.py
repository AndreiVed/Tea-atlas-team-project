from unittest.mock import patch

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from user.models import User


class GoogleLoginRedirectApiTest(TestCase):
    def test_redirect_to_google_auth(self):
        url = reverse("google_auth:redirect-raw")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertIn("https://accounts.google.com/o/oauth2/auth", response["Location"])


class GoogleLoginApiTest(TestCase):
    @patch("google_login_service.service.GoogleRawLoginFlowService.get_tokens")
    @patch("google_login_service.service.GoogleRawLoginFlowService.get_user_info")
    @patch(
        "google_login_service.service.GoogleRawLoginFlowService.get_authorization_url"
    )
    @patch("user.selectors.get_or_create_user")
    @patch("google_login_service.apis.generate_jwt_token")
    def test_successful_google_login(
        self,
        mock_generate_jwt,
        mock_get_or_create_user,
        mock_get_auth_url,
        mock_get_user_info,
        mock_get_tokens,
    ):
        # Моки
        mock_get_tokens.return_value.decode_id_token.return_value = {"sub": "123"}
        mock_get_user_info.return_value = {"email": "test@example.com"}
        mock_get_or_create_user.return_value = (
            User(id=1, email="test@example.com"),
            True,
        )
        mock_generate_jwt.return_value = {
            "access": "mock_access_token",
            "refresh": "mock_refresh_token",
        }
        print(mock_generate_jwt.return_value)

        mock_get_auth_url.return_value = ("https://mock-auth-url", "mock_state")

        # Симуляція сесії
        session = self.client.session
        session["google_oauth2_state"] = "mock_state"
        session.save()

        # Запит до API
        url = reverse("google_auth:callback-raw")
        response = self.client.get(url, {"code": "mock_code", "state": "mock_state"})

        # Перевірка відповіді
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("tokens", response.data)
        self.assertEqual(response.data["tokens"]["access"], "mock_access_token")
        self.assertEqual(response.data["tokens"]["refresh"], "mock_refresh_token")

    def test_google_login_fails_on_csrf_check(self):
        url = reverse("google_auth:callback-raw")

        # Симуляція сесії з неправильним `state`
        session = self.client.session
        session["google_oauth2_state"] = "valid_state"
        session.save()

        response = self.client.get(url, {"code": "mock_code", "state": "invalid_state"})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "CSRF check failed.")

    def test_google_login_fails_without_code(self):
        url = reverse("google_auth:callback-raw")

        response = self.client.get(url, {"state": "valid_state"})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Code and state are required.")

    def test_google_login_fails_with_error_param(self):
        url = reverse("google_auth:callback-raw")

        response = self.client.get(url, {"error": "access_denied"})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "access_denied")
