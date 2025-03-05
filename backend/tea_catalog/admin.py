from django.contrib import admin

from tea_catalog.models import Country, Region, Descriptor, Category, Tea


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ("province", "country")
    list_filter = ("country",)
    search_fields = ("province", "country__name")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "region", "fermentation")
    list_filter = ("fermentation", "region__country")
    search_fields = ("name", "region__province", "region__country__name")
    autocomplete_fields = ("region",)


@admin.register(Descriptor)
class DescriptorAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Tea)
class TeaAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "get_country", "impact")
    list_filter = ("category__region__country", "category", "impact", "descriptors")
    search_fields = ("name", "category__name", "category__region__province")
    autocomplete_fields = ("category", "descriptors")
    prepopulated_fields = {"image": ("name",)}

    def get_country(self, obj):
        return obj.category.region.country

    get_country.short_description = "Country"
    get_country.admin_order_field = "category__region__country"
