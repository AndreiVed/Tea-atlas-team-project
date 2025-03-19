from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.core import mail
import re


User = get_user_model()


class AuthTests(APITestCase):

    def setUp(self):
        """Створюємо тестового користувача"""
        self.user_data = {
            "email": "test@example.com",
            "password": "password123"
        }
        self.user = User.objects.create_user(**self.user_data)

        # URL для реєстрації та логіну
        self.registration_url = "/api/v1/auth/registration/"
        self.login_url = "/api/v1/auth/login/"
        self.verify_email_url = "api/v1/auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$"  # URL підтвердження email


    def test_user_registration(self):
        """Перевіряємо, чи можна зареєструвати нового користувача"""
        data = {
            "email": "new_user@example.com",
            "password1": "newpassword123",
            "password2": "newpassword123"
        }
        response = self.client.post(self.registration_url, data, format="json")
        # Реєстрація користувача
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["detail"], "Verification e-mail sent.")

        # Переконуємось, що лист відправлено
        self.assertEqual(len(mail.outbox), 1)  # Має бути 1 лист
        email_body = mail.outbox[0].body  # Отримуємо тіло листа

        match = re.search(r"account-confirm-email/([-:\w]+)/", email_body)
        self.assertIsNotNone(match, "Email confirmation key not found in email body")
        confirmation_key = match.group(1)  # Отримуємо ключ

        # Підтверджуємо email
        verify_response = self.client.post(
            f"/api/v1/auth/registration/account-confirm-email/{confirmation_key}/"
        )
        self.assertEqual(verify_response.status_code, status.HTTP_302_FOUND)

        # Логін після підтвердження email
        login_data = {"email": "new_user@example.com", "password": "newpassword123"}
        login_response = self.client.post(self.login_url, login_data, format="json")
        print(login_response.data["refresh"])
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", login_response.data)  # JWT access токен отримано
        self.assertIn("refresh", login_response.data)  # JWT refresh токен отримано
        self.assertNotEqual(login_response.data["refresh"], '') # JWT refresh токен не пустий


    def test_user_login(self):
        """Перевіряємо, чи може користувач увійти в систему"""
        # Спочатку логінімся
        data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(self.login_url, data, format="json")
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("key", response.data)  # Токен має бути в відповіді

    def test_unauthorized_access(self):
        """Перевіряємо, чи може неавторизований користувач доступити захищений ресурс"""
        protected_url = reverse("some-protected-view-url")  # URL захищеного ресурсу
        response = self.client.get(protected_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_with_invalid_credentials(self):
        """Перевіряємо, чи користувач не може увійти з неправильними даними"""
        data = {
            "email": "wrong_email@example.com",
            "password": "wrongpassword"
        }
        response = self.client.post(self.login_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("non_field_errors", response.data)