from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutViewTestCase(APITestCase):
    def setUp(self):
        # Create a test user
        self.client = APIClient()

        self.user = get_user_model().objects.create_user(
            email="testuser@example.com", password="testpassword"
        )
        # Generate JWT tokens
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.refresh_token = str(refresh)

        # Set URL for logout
        self.logout_url = "/api/v1/user/logout/"

    def test_successful_logout(self):
        """
        Test that logout succeeds with a valid refresh token.
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")
        response = self.client.post(self.logout_url, {"refresh": self.refresh_token})
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

    def test_missing_refresh_token(self):
        """
        Test that logout fails when the refresh token is not provided.
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")
        response = self.client.post(self.logout_url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Refresh token is required")

    def test_invalid_refresh_token(self):
        """
        Test that logout fails when an invalid refresh token is provided.
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")
        response = self.client.post(self.logout_url, {"refresh": "invalid_token"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Invalid token")

    def test_unauthorized_access(self):
        """
        Test that logout fails when the user is not authenticated.
        """
        response = self.client.post(self.logout_url, {"refresh": self.refresh_token})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
