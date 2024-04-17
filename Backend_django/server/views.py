from django.db.models import Count
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.response import Response
from server.models import Server
from .serializer import ServerSerializer
from .schema import server_list_docs


class ServerListViewSet(viewsets.ViewSet):
    """
    A ViewSet for retrieving a list of servers based on various filters.

    Attributes:
        queryset (QuerySet): A queryset containing all Server objects.
    """

    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        """
        Retrieves a list of servers based on specified filters.

        Args:
            request (Request): The request object containing query parameters.
                - category (str, optional): Filter servers by category. Example: 'gaming'
                - qty (int, optional): Limit the number of servers returned. Example: 5
                - by_user (bool, optional): Filter servers by the current user's membership. Example: true
                - by_serverid (int, optional): Filter servers by a specific server ID. Example: 1
                - num_members (bool, optional): Include the number of members in each server. Example: true

        Returns:
            Response: A JSON response containing the serialized server data.

        Raises:
            AuthenticationFailed: If the user is not authenticated and tries to filter by user or server ID.
            ValidationError: If server ID provided in query parameters is not valid or does not exist.
        """
        # Retrieve query parameters
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("num_members") == "true"

        # Check authentication for user-based filters
        # if by_user or by_serverid and not request.user.is_authenticated:
        #     raise AuthenticationFailed(detail="Not authenticated")

        # Apply category filter if specified
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Apply user-based filter if specified
        if by_user:
            if request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed(detail="Authentication Failed")

        # Annotate queryset with the number of members if requested
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        # Apply quantity limit if specified
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Apply server ID filter if specified
        if by_serverid:
            if not request.user.is_authenticated:
                raise AuthenticationFailed(detail="Authentication Failed")
            else:
                try:
                    self.queryset = self.queryset.filter(id=by_serverid)
                    if not self.queryset.exists():
                        raise ValidationError(detail=f"Server {by_serverid} not found")

                except ValueError:
                    raise ValidationError(detail=f"Server {by_serverid} not found")

        # Serialize queryset and return response
        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )
        return Response(serializer.data)
