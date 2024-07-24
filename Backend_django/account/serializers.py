from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    AuthUser,
    TokenRefreshSerializer,
)
from rest_framework_simplejwt.tokens import Token

from account.models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("username",)


class CustomTokenObtainPariSerializer(TokenObtainPairSerializer):
    def get_token(cls, user: AuthUser) -> Token:
        token = super().get_token(user)
        token["user_id"] = user.id

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id

        return data


class JWTCookieTokenRefreshSerialized(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(
            settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"]
        )
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid token found in cookie")
