from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter

from chat_server.serializer import MessageSerializer

list_message_docs = extend_schema(
    responses=MessageSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="channel_id",
            description="The channel ID to get messages from",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
        )
    ],
)
