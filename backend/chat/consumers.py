import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Chat, Message, ChatParticipant
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = f'chat_{self.chat_id}'
        user = self.scope["user"]

        if user.is_anonymous:
            await self.close()
            return

        await self.set_user_active(user)
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send_user_status_update()

    async def disconnect(self, close_code):
        user = self.scope["user"]
        if not user.is_anonymous:
            await self.set_user_inactive(user)
            await self.send_user_status_update()
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            msg_type = data.get("type")

            if msg_type == "message":
                message_data = await self.save_message(
                    chat_id=self.chat_id,
                    sender_id=data["sender_id"],
                    content=data["content"]
                )
                
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "message": message_data
                    }
                )

            elif msg_type == "typing":
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "user_typing",
                        "username": data["username"]
                    }
                )

            elif msg_type == "seen":
                await self.mark_seen(data["message_ids"], self.scope["user"])
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "message_seen",
                        "user_id": self.scope["user"].id,
                        "message_ids": data["message_ids"]
                    }
                )

            elif msg_type == "media":
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "media_message",
                        "message_id": data["message_id"]
                    }
                )

            elif msg_type == "ping":
                return

            elif msg_type == "entered":
                await self.set_user_active(self.scope["user"])
                await self.send_user_status_update()

            elif msg_type == "exit":
                await self.set_user_inactive(self.scope["user"])
                await self.send_user_status_update()

        except Exception as e:
            print("WebSocket Error:", e)
            await self.close(code=4000)

    # --------- MESSAGE HANDLERS -----------

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "message",
            **event["message"]
        }))

    async def user_typing(self, event):
        await self.send(text_data=json.dumps({
            "type": "typing",
            "username": event["username"]
        }))

    async def message_seen(self, event):
        await self.send(text_data=json.dumps({
            "type": "seen",
            "user_id": event["user_id"],
            "message_ids": event["message_ids"]
        }))

    async def media_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "media",
            "message_id": event["message_id"]
        }))

    async def send_user_status_update(self):
        active, exited = await self.get_active_and_exited_users()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "user_status_update",
                "active_users": active,
                "exited_users": exited
            }
        )

    async def user_status_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "user_status",
            "active_users": event["active_users"],
            "exited_users": event["exited_users"]
        }))

    # --------- DB OPERATIONS -----------

    @database_sync_to_async
    def save_message(self, chat_id, sender_id, content):
        chat = Chat.objects.get(id=chat_id)
        sender = User.objects.get(id=sender_id)
        message = Message.objects.create(chat=chat, sender=sender, content=content)

        return {
            "id": message.id,
            "sender": sender.username,
            "content": message.content,
            "media": message.media.url if message.media else None,
            "timestamp": str(message.timestamp),
            "seen_by": list(message.seen_by.values_list("id", flat=True)),
        }

    @database_sync_to_async
    def mark_seen(self, message_ids, user):
        messages = Message.objects.filter(id__in=message_ids, chat_id=self.chat_id)
        for msg in messages:
            msg.seen_by.add(user)

        if hasattr(user, "profile"):
            user.profile.last_seen = timezone.now()
            user.profile.save()

    @database_sync_to_async
    def set_user_active(self, user):
        ChatParticipant.objects.update_or_create(
            chat_id=self.chat_id,
            user=user,
            defaults={"has_exited": False, "last_active": timezone.now()}
        )

    @database_sync_to_async
    def set_user_inactive(self, user):
        ChatParticipant.objects.update_or_create(
            chat_id=self.chat_id,
            user=user,
            defaults={"has_exited": True, "last_active": timezone.now()}
        )

    @database_sync_to_async
    def get_active_and_exited_users(self):
        participants = ChatParticipant.objects.filter(chat_id=self.chat_id).select_related("user")
        active = [p.user.username for p in participants if not p.has_exited]
        exited = [p.user.username for p in participants if p.has_exited]
        return active, exited