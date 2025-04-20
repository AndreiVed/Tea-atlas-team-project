import os
import uuid

from django.db import models
from django.db.models import CASCADE
from django.utils.text import slugify


def tea_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads/tea_catalog/", filename)


class Descriptor(models.Model):
    name = models.CharField(max_length=63, unique=True)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=68, unique=True)

    class Meta:
        verbose_name_plural = "Countries"

    def __str__(self):
        return self.name


class Region(models.Model):
    country = models.ForeignKey(Country, on_delete=CASCADE)
    province = models.CharField(max_length=68, unique=True, null=True, blank=True)

    class Meta:
        unique_together = ["country", "province"]
        ordering = ["country"]

    def __str__(self):
        return f"{self.country}, {self.province}"


class Category(models.Model):
    class Fermentation(models.Choices):
        MINIMALLY = "Minimally Oxidized"
        LIGHTLY = "Lightly Oxidized"
        MODERATELY = "Moderately Oxidized"
        HEAVY = "Heavily Oxidized"
        FULLY = "Fully Oxidized"
        POST_FERMENTED = "Post-Fermented"

    name = models.CharField(max_length=255)
    region = models.ForeignKey(Region, on_delete=CASCADE)
    fermentation = models.CharField(
        max_length=19, choices=Fermentation.choices, default=Fermentation.MINIMALLY
    )

    class Meta:
        verbose_name_plural = "Categories"
        unique_together = ["name", "region"]

    def __str__(self):
        return f"{self.name}"


class Tea(models.Model):
    class Effect(models.Choices):
        WARMING = "Warming"
        COOLING = "Cooling"
        BALANCING = "Balancing"
        MOISTURIZING = "Moisturizing"
        CLEANSING = "Cleansing"
        AIDS_DIGESTION = "Aids digestion"

    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=CASCADE)
    descriptors = models.ManyToManyField(Descriptor, related_name="tea")
    impact = models.CharField(
        max_length=14, choices=Effect.choices, default=Effect.BALANCING
    )
    image = models.ImageField(null=True, blank=True, upload_to=tea_image_file_path)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["category", "name"]


class Steeping(models.Model):
    tea_category = models.OneToOneField(Category, on_delete=CASCADE)
    leaves = models.IntegerField()
    water_volume = models.IntegerField()
    water_temperature = models.IntegerField()
    steep_time = models.IntegerField()
    infusion = models.IntegerField()

    class Meta:
        ordering = ["tea_category"]
