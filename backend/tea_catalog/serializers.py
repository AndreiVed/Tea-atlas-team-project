from rest_framework import serializers

from tea_catalog.models import Tea, Region, Category


class TeaListSerializer(serializers.ModelSerializer):
    descriptors = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="name"
    )
    category = serializers.SlugRelatedField(
        many=False, read_only=True, slug_field="name"
    )

    class Meta:
        model = Tea
        fields = ["name", "category", "descriptors", "image"]


class RegionSerializer(serializers.ModelSerializer):
    country = serializers.SlugRelatedField(
        many=False, read_only=True, slug_field="name"
    )

    class Meta:
        model = Region
        fields = ["country", "province"]


class CategorySerializer(serializers.ModelSerializer):
    region = RegionSerializer()
    fermentation = serializers.SerializerMethodField()

    def get_fermentation(self, obj):
        return obj.get_fermentation_display()

    class Meta:
        model = Category
        fields = ["name", "region", "fermentation"]


class TeaDetailSerializer(TeaListSerializer):
    category = CategorySerializer()

    class Meta:
        model = Tea
        fields = [
            "name",
            "category",
            "description",
            "descriptors",
            "impact",
            "image",
        ]
