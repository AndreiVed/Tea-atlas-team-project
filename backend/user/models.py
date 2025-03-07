import os
import uuid

from django.conf import settings
from django.db import models
from django.db.models import CASCADE
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser, BaseUserManager

from tea_catalog.models import Tea


def user_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.id)}-{uuid.uuid4()}{extension}"
    return os.path.join("uploads/user/", filename)


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """User model."""

    username = None
    email = models.EmailField(_("email address"), unique=True)
    avatar = models.ImageField(null=True, blank=True, upload_to=user_image_file_path)
    favorite = models.ManyToManyField(Tea, related_name="users")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        elif self.last_name:
            return self.last_name
        return self.email


# class Profile(models.Model):
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL, on_delete=CASCADE, related_name="profile"
#     )
#     first_name = models.CharField(max_length=63, null=True, blank=True)
#     last_name = models.CharField(max_length=63, null=True, blank=True)
#     bio = models.TextField(null=True, blank=True)
#     phone = models.CharField(max_length=16, null=True, blank=True)
#     city = models.CharField(max_length=63, null=True, blank=True)
#     country = models.CharField(max_length=63, null=True, blank=True)
#     avatar = models.ImageField(null=True, blank=True, upload_to=profile_image_file_path)
#     followers = models.ManyToManyField(
#         settings.AUTH_USER_MODEL, related_name="following", blank=True
#     )
#
#     def __str__(self):
#         return f"Profile of {self.user}"
#
#     # @property
#     # def followers_count(self):
#     #     return self.followers.count()
#     #
#     # @property
#     # def following_count(self):
#     #     return self.user.following.count()  # Count users this user follows
#
#     @property
#     def full_name(self):
#         return f"{self.first_name} {self.last_name}"
#
#
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#
#
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()
