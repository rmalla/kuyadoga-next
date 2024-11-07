# pagination.py
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 16  # Default number of items per page
    page_size_query_param = 'limit'  # Allows the client to set the `limit` parameter
    max_page_size = 100  # Optional maximum limit per page
