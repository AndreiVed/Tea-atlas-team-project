from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView

from tea_catalog.serializers import TeaListSerializer


class FavoriteListView(APIView):
    def get(self, request):
        """
        List of all favorite tea
        """
        user = self.request.user
        favorite_tea = user.favorite.all()
        serializer = TeaListSerializer(favorite_tea, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_object(self):
        return self.request.user
