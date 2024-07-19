from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from chat_server.models import Conversation
from chat_server.schema import list_message_docs
from chat_server.serializer import MessageSerializer


# Create your views here.
class MessageViewSet(viewsets.ViewSet):

    @list_message_docs
    def list(self, request):
        channel_id = request.query_params.get("channel_id")

        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            messages = conversation.messages.all()
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)

        except Conversation.DoesNotExist:
            return Response([], status=404)
