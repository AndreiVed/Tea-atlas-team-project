from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from tea_catalog.models import Tea, Category, Region, Country, Descriptor
from tea_catalog.serializers import TeaListSerializer, TeaDetailSerializer


TEA_URL = reverse("tea_catalog:tea-list")


class TeaViewSetTestCase(TestCase):
    """Тести для TeaViewSet"""

    def setUp(self):
        self.client = APIClient()

        self.country = Country.objects.create(name="China")
        self.region = Region.objects.create(country=self.country, province="Yunnan")
        self.category = Category.objects.create(name="Pu-erh", region=self.region)
        self.descriptor1 = Descriptor.objects.create(name="Floral")
        self.descriptor2 = Descriptor.objects.create(name="Earthy")

        self.tea1 = Tea.objects.create(
            name="Sheng Pu-erh",
            description="Raw Pu-erh tea",
            category=self.category,
            impact="Warming",
        )
        self.tea1.descriptors.add(self.descriptor1)

        self.tea2 = Tea.objects.create(
            name="Shu Pu-erh",
            description="Ripe Pu-erh tea",
            category=self.category,
            impact="Balancing",
        )
        self.tea2.descriptors.add(self.descriptor2)

    def test_list_teas(self):
        """Перевірка отримання списку чаїв"""
        response = self.client.get(TEA_URL)

        teas = Tea.objects.all()
        serializer = TeaListSerializer(teas, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_retrieve_tea(self):
        """Перевірка отримання конкретного чаю"""
        url = reverse("tea_catalog:tea-detail", kwargs={"pk": self.tea1.id})
        response = self.client.get(url)

        serializer = TeaDetailSerializer(self.tea1)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_filter_by_name(self):
        """Перевірка фільтрації за назвою"""
        response = self.client.get(TEA_URL, {"name": "Sheng"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Sheng Pu-erh")

    def test_filter_by_category(self):
        """Перевірка фільтрації за категорією"""
        response = self.client.get(TEA_URL, {"type": "Pu-erh"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_country(self):
        """Перевірка фільтрації за країною"""
        response = self.client.get(TEA_URL, {"country": "China"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_impact(self):
        """Перевірка фільтрації за впливом"""
        response = self.client.get(TEA_URL, {"impact": "Warming"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
