from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken


def user_get_login_data(*, user):
    return {
        "id": user.id,
        "email": user.email,
        "is_active": user.is_active,
        "is_admin": user.is_admin,
        "is_superuser": user.is_superuser,
    }


def user_list(*, filters=None):
    filters = filters or {}

    queryset = get_user_model().objects.all()

    if "email" in filters:
        queryset = queryset.filter(email=filters["email"])
    if "is_admin" in filters:
        queryset = queryset.filter(is_admin=filters["is_admin"])
    if "id" in filters:
        queryset = queryset.filter(id=filters["id"])

    return queryset


def get_or_create_user(user_info):
    User = get_user_model()

    user_email = user_info["email"].strip()
    user_first_name = user_info.get("given_name", "")
    user_last_name = user_info.get("family_name", "")
    user_avatar = user_info.get("picture", "")

    user, created = User.objects.get_or_create(
        email=user_email,
        defaults={
            "first_name": user_first_name,
            "last_name": user_last_name,
            "avatar": user_avatar,
        },
    )

    return user, created

def generate_jwt_token(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }