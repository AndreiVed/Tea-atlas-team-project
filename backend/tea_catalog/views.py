from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import mixins, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action

from tea_catalog.models import Tea
from tea_catalog.serializers import (
    TeaDetailSerializer,
    TeaListSerializer,
)


class TeaViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    """
    ViewSet to get a list of teas with the ability to filter by various parameters.
    """

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
            category = category.split(",")
            queryset = queryset.filter(category__name__in=category)

        if country:
            country = country.split(",")
            queryset = queryset.filter(category__region__country__name__in=country)

        if fermentation:
            fermentation = fermentation.split(",")
            queryset = queryset.filter(category__fermentation__in=fermentation)

        if impact:
            impact = impact.split(",")
            queryset = queryset.filter(impact__in=impact)

        return queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return TeaDetailSerializer
        return TeaListSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="name",
                type=str,
                description="Search by partial match in tea name",
            ),
            OpenApiParameter(
                name="type",
                type=str,
                description="Filter by tea category (e.g. 'Oolong', 'GreenTea')",
            ),
            OpenApiParameter(
                name="country",
                type=str,
                description="Filter by country of origin of tea",
            ),
            OpenApiParameter(
                name="impact",
                type=str,
                description="Filter by tea impact (e.g. 'Warming', 'Cooling')",
            ),
            OpenApiParameter(
                name="fermentation",
                type=str,
                description="Filter by fermentation level (e.g. 'Minimally Oxidized', 'Fully Oxidized')",
            ),
        ],
        description="Get a list of teas with the ability to filter by various parameters.",
        responses={200: TeaListSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        """
        Get a list of teas with the ability to filter by name, category, country, fermentation and effect.
        """
        return super().list(request, *args, **kwargs)

    @action(
        detail=True,
        methods=["post"],
        url_path="add_favorite",
        permission_classes=[IsAuthenticated],
        serializer_class=None,
    )
    def add_favorite(self, request, pk=None):
        """
        Add/remove the tea (pk) to/from the user's favorite list
        """
        user = request.user
        tea_to_favorite = get_object_or_404(Tea, id=pk)

        if user.favorite.filter(id=tea_to_favorite.id).exists():
            user.favorite.remove(tea_to_favorite)
            return Response(
                {"detail": "Successfully removed from favorites."},
                status=status.HTTP_200_OK,
            )
        else:
            user.favorite.add(tea_to_favorite)
            return Response(
                {"detail": "Successfully added to favorites."},
                status=status.HTTP_201_CREATED,
            )
