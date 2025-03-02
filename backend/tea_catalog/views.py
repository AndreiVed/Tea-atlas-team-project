from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from tea_catalog.models import Tea
from tea_catalog.serializers import TeaDetailSerializer, TeaListSerializer


class TeaViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    queryset = Tea.objects.prefetch_related("descriptors").select_related("category")

    def get_queryset(self):
        queryset = self.queryset
        name = self.request.query_params.get("name")
        category = self.request.query_params.get("type")
        country = self.request.query_params.get("country")
        impact = self.request.query_params.get("impact")
        fermentation = self.request.query_params.get("fermentation")

        if name:
            queryset = queryset.filter(name__icontains=name)

        if category:
            queryset = queryset.filter(category__name__icontains=category)

        if country:
            queryset = queryset.filter(
                category__region__country__name__icontains=country
            )

        if fermentation:
            queryset = queryset.filter(category__fermentation__icontains=fermentation)

        if impact:
            queryset = queryset.filter(impact__icontains=impact)

        return queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return TeaDetailSerializer
        return TeaListSerializer
