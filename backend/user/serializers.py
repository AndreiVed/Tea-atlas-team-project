from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer, LoginSerializer
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from django.utils.translation import gettext as _


class UserSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

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


# class UserJWTSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(write_only=True, required=True, min_length=5)
#
#     class Meta:
#         model = get_user_model()
#         fields = (
#             "id",
#             "first_name",
#             "last_name",
#             "email",
#             "password",
#             "password2",
#             "is_staff",
#         )
#         read_only_fields = ("is_staff",)
#         extra_kwargs = {"password": {"write_only": True, "min_length": 5}}
#
#     def validate(self, attrs):
#         """Перевіряє, чи паролі співпадають."""
#         if attrs["password"] != attrs["password2"]:
#             raise serializers.ValidationError({"password2": "Passwords do not match."})
#         return attrs
#
#     def create(self, validated_data):
#         """Створює нового користувача, видаляючи `password2` перед передачею в `create_user`."""
#         validated_data.pop("password2")  # Видаляємо підтвердження пароля
#         return get_user_model().objects.create_user(**validated_data)


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


# class AuthTokenSerializer(serializers.Serializer):
#     email = serializers.CharField(label=_("Email"))
#     password = serializers.CharField(
#         label=_("Password"), style={"input_type": "password"}
#     )
#
#     def validate(self, attrs):
#         email = attrs.get("email")
#         password = attrs.get("password")
#
#         if email and password:
#             user = authenticate(email=email, password=password)
#
#             if user:
#                 if not user.is_active:
#                     msg = _("User account is disabled.")
#                     raise serializers.ValidationError(msg, code="authorization")
#             else:
#                 msg = _("Unable to log in with provided credentials.")
#                 raise serializers.ValidationError(msg, code="authorization")
#         else:
#             msg = _("Must include 'username' and 'password'.")
#             raise serializers.ValidationError(msg, code="authorization")
#
#         attrs["user"] = user
#         return attrs
