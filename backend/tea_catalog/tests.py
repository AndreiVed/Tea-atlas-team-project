from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from yaml import serialize

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


class TeaFavoriteTests(TestCase):
    def setUp(self):
        """Налаштування тестових даних"""
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email="test@user.com", password="testpass"
        )
        self.client.force_authenticate(self.user)

        self.country = Country.objects.create(name="China")
        self.region = Region.objects.create(country=self.country, province="Yunnan")
        self.category = Category.objects.create(name="Pu-erh", region=self.region)

        self.tea = Tea.objects.create(
            name="Sheng Pu-erh",
            description="Raw Pu-erh tea",
            category=self.category,
            impact="Warming",
        )
        self.favorite_url = reverse("tea_catalog:tea-add-favorite", args=[self.tea.id])

    def test_add_favorite(self):
        """Перевірка додавання чаю до улюбленого"""
        response = self.client.post(self.favorite_url)
        self.user.refresh_from_db()  # Оновити користувача з БД
        self.assertEqual(response.status_code, 201)
        self.assertIn(self.tea, self.user.favorite.all())

    def test_remove_favorite(self):
        """Перевірка видалення чаю з улюбленого"""
        self.user.favorite.add(self.tea)  # Спочатку додаємо чай
        response = self.client.post(self.favorite_url)
        self.user.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertNotIn(self.tea, self.user.favorite.all())

    def test_unauthorized_access(self):
        """Перевірка доступу без авторизації"""
        self.client.logout()  # Вийти з акаунту
        response = self.client.post(self.favorite_url)
        self.assertEqual(response.status_code, 401)

    def test_favorite_list(self):
        """Перевірка відображення списку улюбленого чаю"""
        self.client.post(self.favorite_url)
        self.user.refresh_from_db()
        res = self.client.get(reverse("user:favorite_list"))
        serializer = TeaListSerializer(self.tea, many=False)
        self.assertEqual(res.data, [serializer.data])
