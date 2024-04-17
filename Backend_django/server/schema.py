from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from .serializer import ServerSerializer, ChannelSerializer

server_list_docs = extend_schema(
    responses=ServerSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="category",
            type=OpenApiTypes.STR,
            description="The category of the server",
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="qty",
            type=OpenApiTypes.INT,
            description="Limit the number of servers returned",
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="by_user",
            type=OpenApiTypes.BOOL,
            description="Filter servers by the current user's membership",
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="by_serverid",
            type=OpenApiTypes.INT,
            description="Filter servers by a specific server ID",
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="num_members",
            type=OpenApiTypes.BOOL,
            description="Include the number of members in each server",
            location=OpenApiParameter.QUERY,
        ),
    ],
)
