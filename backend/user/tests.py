from allauth.account.models import EmailAddress
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.core import mail
import re

User = get_user_model()

class AuthTests(APITestCase):

    def setUp(self):
        """Створюємо тестового користувача"""
        self.client = APIClient()

        self.user_data = {
            "email": "testuser@example.com",
            "password": "strongpassword123",  # Замінено на 'password' для логіну
        }
        self.user_reg_data = {
            "email": "testuser@example.com",
            "password1": "strongpassword123",
            "password2": "strongpassword123"
        }

        # URL для реєстрації та логіну
        self.registration_url = reverse("rest_register")
        self.login_url = reverse("user:rest_login")
        self.logout_url = reverse("user:rest_logout")
        self.user_details_url = reverse("user:rest_user_details")  # Приклад захищеного URL

        # 1. Реєструємо користувача
        self.client.post(self.registration_url, self.user_reg_data, format="json")

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
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["detail"], "Verification e-mail sent.")

        # Імітуємо підтвердження email
        email_address = EmailAddress.objects.get(email="new_user@example.com")
        email_address.verified = True
        email_address.save()

        # Логін після підтвердження email
        login_data = {"email": "new_user@example.com", "password": "newpassword123"}
        login_response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", login_response.data)  # JWT access токен отримано

        self.assertIn("refresh_token", self.client.cookies)
        self.assertNotEqual(self.client.cookies["refresh_token"].value, '')

        # Перевірка, що refresh токен НЕ в JSON-відповіді
        self.assertEqual(login_response.data["refresh"], '')

    def test_user_login_after_email_confirmation(self):
        """Тестуємо логін користувача після підтвердження пошти"""
        data = {"email": self.user_data["email"], "password": self.user_data["password"]}
        response = self.client.post(self.login_url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

        # !!! ПРАВИЛЬНА ПЕРЕВІРКА refresh токена (в cookie) !!!
        self.assertIn("refresh_token", self.client.cookies)

    def test_authenticated_access(self):
        """Перевіряємо, чи авторизований користувач може доступити захищений ресурс"""
        # Спочатку логінимося, щоб отримати токен
        login_response = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        access_token = login_response.data["access"]

        # Отримуємо доступ до захищеного ресурсу
        response = self.client.get(self.user_details_url, HTTP_AUTHORIZATION=f'Bearer {access_token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.user_data['email'])

    def test_unauthorized_access(self):
        """Перевіряємо, чи може неавторизований користувач доступити захищений ресурс"""
        response = self.client.get(self.user_details_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_logout(self):
        """Тестуємо вихід користувача з системи"""
        # Спочатку логінимося
        login_response = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

        # Використовуємо refresh токен, який був встановлений в cookie
        refresh_token = self.client.cookies["refresh_token"].value

        # !!! АВТЕНТИФІКУЄМО ЗАПИТ НА ВИХІД !!!
        access_token = login_response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        # Виконуємо запит на вихід
        logout_response = self.client.post(self.logout_url, {"refresh": refresh_token}, format="json")
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
        self.assertEqual(logout_response.data["detail"], "Successfully logged out.")

        self.assertEqual(self.client.cookies["refresh_token"].value, "")
        self.assertEqual(self.client.cookies["access_token"].value, "")

        # Видаляємо credentials, щоб не впливало на інші тести
        self.client.credentials()
