# core/middleware.py

from urllib.parse import parse_qs
from django.contrib.auth.models import AnonymousUser
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token

@database_sync_to_async
def get_user(token_key):
    try:
        return Token.objects.get(key=token_key).user
    except Token.DoesNotExist:
        return AnonymousUser()

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = scope.get("query_string", b"").decode()
        token_key = parse_qs(query_string).get("token", [None])[0]
        scope["user"] = await get_user(token_key)
        return await super().__call__(scope, receive, send)