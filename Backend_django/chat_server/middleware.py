import jwt
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser


@database_sync_to_async
def get_user(scope):
    token = scope["token"]
    model = get_user_model()
    user_id = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])["user_id"]

    try:
        return model.objects.get(id=user_id)
    except model.DoesNotExist:
        return AnonymousUser()


class JWTAuthMiddleware:

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        headers_dic = dict(scope["headers"])
        cookies_string = headers_dic.get(b"cookie", b"").decode("utf-8")
        cookies = {
            cookies_string.split("=")[0]: cookie.split("=")[1]
            for cookie in cookies_string.split("; ")
        }
        access_token = cookies.get("access_token")

        scope["token"] = access_token
        scope["user"] = await get_user(scope)

        return await self.app(scope, receive, send)
