from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter

from account.views import (
    AccountViewSet,
    JWTCookieTokenRefreshView,
    JWTCookieTokenObtainPairView,
)
from chat_server.consumer import WebChatConsumer
from chat_server.views import MessageViewSet
from server.views import ServerListViewSet, CategoryListViewSet


router = DefaultRouter()
router.register("api/server/select", ServerListViewSet)
router.register("api/server/category", CategoryListViewSet)
router.register("api/messages", MessageViewSet, basename="messages")
router.register("api/user", AccountViewSet, basename="user")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/schema/ui/",
        SpectacularSwaggerView.as_view(),
    ),
    path(
        "api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        "api/token/refresh/", JWTCookieTokenRefreshView.as_view(), name="token_refresh"
    ),
] + router.urls

websockets_urlpatterns = [
    path("<str:serverId>/<str:channelId>", WebChatConsumer.as_asgi())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
