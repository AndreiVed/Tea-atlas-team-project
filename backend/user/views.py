from rest_framework import generics, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView

from tea_catalog.models import Tea
from tea_catalog.serializers import TeaListSerializer
from user.serializers import UserSerializer, AuthTokenSerializer, UserProfileSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class CreateTokenView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
    permission_classes = (IsAuthenticated,)
    serializer_class = AuthTokenSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class FavoriteListView(APIView):
    def get(self, request):
        """
        List of all favorite tea
        """
        user = self.request.user
        favorite_tea = user.favorite.all()
        serializer = TeaListSerializer(favorite_tea, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_object(self):
        return self.request.user
