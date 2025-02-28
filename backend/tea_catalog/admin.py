from django.contrib import admin

from tea_catalog.models import Descriptor, Country, Region, Category, Tea

admin.site.register(Descriptor)
admin.site.register(Country)
admin.site.register(Region)
admin.site.register(Category)
admin.site.register(Tea)
