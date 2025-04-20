from allauth.account.models import EmailAddress
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.core import mail
import re


class AuthTests(APITestCase):

    def setUp(self):
        """Створюємо тестового користувача"""
        self.client = APIClient()

        self.user_data = {
            "email": "testuser@example.com",
            "password1": "strongpassword123",
            "password2": "strongpassword123"
        }

        # URL для реєстрації та логіну
        self.registration_url = reverse("rest_register")
        self.login_url = reverse("user:rest_login")
        self.logout_url = reverse("user:rest_logout")

        # 1. Реєструємо користувача
        self.user = self.client.post(self.registration_url, self.user_data, format="json")

        # 2. Отримуємо підтвердження email
        self.email_confirmation()

    def email_confirmation(self):
        """Імітуємо підтвердження email"""
        email_address = EmailAddress.objects.get(email=self.user_data["email"])
        email_address.verified = True  # Позначаємо email підтвердженим
        email_address.save()

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
        email_body = mail.outbox[-1].body  # Отримуємо тіло листа
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
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", login_response.data)  # JWT access токен отримано
        self.assertIn("refresh", login_response.data)  # JWT refresh токен отримано
        self.assertNotEqual(login_response.data["refresh"], '') # JWT refresh токен не пустий

    def test_user_login_after_email_confirmation(self):
        """Тестуємо логін користувача після підтвердження пошти"""
        data = {"email": self.user_data["email"], "password": self.user_data["password1"]}
        response = self.client.post(self.login_url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)  # Переконуємося, що видається токен # Токен має бути в відповіді
        self.assertIn("refresh", response.data)  # Переконуємося, що видається токен # Токен має бути в відповіді

    def test_unauthorized_access(self):
        """Перевіряємо, чи може неавторизований користувач доступити захищений ресурс"""
        protected_url = "/api/v1/auth/user/"  # URL захищеного ресурсу
        response = self.client.get(protected_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_with_invalid_credentials(self):
        """Перевіряємо, чи користувач не може увійти з неправильними даними"""
        data = {
            "email": "wrong_email@example.com",
            "password": "wrongpassword"
        }
        response = self.client.post(self.login_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("non_field_errors", response.data)

    def test_user_logout(self):
        """Тестуємо вихід користувача з системи"""
        # Логін
        data = {"email": self.user_data["email"], "password": self.user_data["password1"]}
        login_response = self.client.post(self.login_url, data, format="json")
        refresh_token = login_response.data["refresh"]

        # Логаут
        logout_response = self.client.post(self.logout_url, {"refresh": refresh_token}, format="json")
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
        self.assertEqual(logout_response.data["detail"], "Successfully logged out.")