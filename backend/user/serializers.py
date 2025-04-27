from allauth.account.views import ConfirmEmailView
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from rest_framework import serializers


class UserSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = get_user_model()
        fields = ("id", "first_name", "last_name", "email", "password", "is_staff")

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get("first_name", "")
        user.last_name = self.validated_data.get("last_name", "")
        user.save()
        return user


class UserLoginSerializer(LoginSerializer):
    username = None


class UserProfileSerializer(UserDetailsSerializer):
    class Meta:
        model = get_user_model()

        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "avatar",
        )


class CustomConfirmEmailView(ConfirmEmailView):
    def post(self, *args, **kwargs):
        self.get_object().confirm(self.request)
        return redirect("user:rest_login")  # редірект на сторінку входу
