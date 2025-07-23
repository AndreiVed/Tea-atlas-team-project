from allauth.account.models import EmailAddress
from allauth.account.views import ConfirmEmailView
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from rest_framework import serializers
from allauth.account import app_settings as allauth_account_settings
from rest_framework.validators import UniqueValidator
from django.utils.translation import gettext_lazy as _


class UserSerializer(RegisterSerializer):
    username = None
    email = serializers.EmailField(
        required=allauth_account_settings.EMAIL_REQUIRED,
        validators=[UniqueValidator(
            queryset=EmailAddress.objects.all(),
            message=_('A user with this e-mail address already exists.')
        )]
    )

    first_name = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    last_name = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )

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
        return redirect("https://tea-atlas.onrender.com/#/login")  # редірект на сторінку входу
