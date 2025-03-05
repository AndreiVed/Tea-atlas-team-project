from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from tea_catalog.models import Tea
from tea_catalog.serializers import TeaDetailSerializer, TeaListSerializer


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
                description="Filter by tea category (e.g. 'Oolong', 'Green Tea')",
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
