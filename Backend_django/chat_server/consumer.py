from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model

from chat_server.models import Conversation, Message
from server.models import Server

User = get_user_model()


class WebChatConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = (None,)
        self.user = None

    def connect(self):
        self.user = self.scope["user"]
        self.accept()
        if not self.user.is_authenticated:
            self.close(code=4001)
            return

        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]
        self.server_id = self.scope["url_route"]["kwargs"]["serverId"]

        self.user = User.objects.get(id=self.user.id)

        server = Server.objects.get(id=self.server_id)

        self.is_member = server.member.filter(id=self.user.id).exists()

        async_to_sync(self.channel_layer.group_add)(
            self.channel_id,
            self.channel_name,
        )

    def receive_json(self, content):
        if not self.is_member:
            self.send_json({"error": "User is not a member of this server"})
            return

        channel_id = self.channel_id
        sender = self.user
        message = content["message"]

        conversation, created = Conversation.objects.get_or_create(
            channel_id=channel_id
        )

        new_message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            content=message,
        )

        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat_message",
                "message": {
                    "id": new_message.id,
                    "sender": new_message.sender.username,
                    "content": new_message.content,
                    "created_at": new_message.created_at.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.channel_id,
            self.channel_name,
        )
        super().disconnect(close_code)
