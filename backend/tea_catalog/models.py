import os
import uuid

from django.db import models
from django.db.models import CASCADE
from django.utils.text import slugify


def tea_image_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads/tea_catalog/", filename)


class Description(models.Model):
    name = models.CharField(max_length=63, unique=True)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=68, unique=True)

    def __str__(self):
        return self.name


class Region(models.Model):
    country = models.ForeignKey(Country, on_delete=CASCADE)
    province = models.CharField(max_length=68, unique=True, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True, upload_to=tea_image_file_path)

    class Meta:
        unique_together = ["country", "province"]
        ordering = ["country"]

    def __str__(self):
        return f"{self.country}, {self.province}"


"""
* Fermentation:
Minimally Oxidized (white and green tea)
Lightly Oxidized (yellow, light oolong)
Moderately Oxidized (medium oolong)
Heavily Oxidized (dark oolong)
Fully Oxidized (red tea)
Post-Fermented (hei cha, shu and shen puerh)
"""


class Category(models.Model):
    class Fermentation(models.Choices):
        MN = "Minimally Oxidized"
        LT = "Lightly Oxidized"
        MD = "Moderately Oxidized"
        HV = "Heavily Oxidized"
        FL = "Fully Oxidized"
        PF = "Post-Fermented"

    name = models.CharField(max_length=255, unique=True)
    region = models.ForeignKey(Region, on_delete=CASCADE)
    fermentation = models.CharField(
        max_length=19, choices=Fermentation.choices, default=Fermentation.MN
    )


class Descriptor(models.Model):
    name = models.CharField(max_length=63, unique=True)


"""
** Effects:
Warming
Cooling
Balancing
Moisturizing
Cleansing
Aids digestion
"""


class Tea(models.Model):
    class Effect(models.Choices):
        WM = "Warming"
        CO = "Cooling"
        BL = "Balancing"
        MO = "Moisturizing"
        CL = "Cleansing"
        AD = "Aids digestion"

    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=CASCADE)
    descriptors = models.ManyToManyField(Descriptor, related_name="tea")
    effect = models.CharField(max_length=14, choices=Effect.choices, default=Effect.BL)
    image = models.ImageField(null=True, blank=True, upload_to=tea_image_file_path)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["category", "name"]
