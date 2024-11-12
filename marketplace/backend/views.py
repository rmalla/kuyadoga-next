from .models import Product, ThirdPartyVendor, ProductManufacturer
from .serializers import ProductSerializer, ThirdPartyVendorSerializer, ProductManufacturerSerializer,UserSerializer

from django.contrib.auth.models import User
from rest_framework import generics,viewsets,status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
from .pagination import CustomPagination  # Import your custom pagination class

# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True, obsolete=False, price__gt=500, price__lt=35000)

        # Apply case-insensitive filtering for manufacturer and part number
        manufacturer = self.request.query_params.get('manufacturer')
        part_number = self.request.query_params.get('part_number')

        if manufacturer and part_number:
            queryset = queryset.filter(manufacturer__name__iexact=manufacturer, part_number__iexact=part_number)
        elif manufacturer:
            queryset = queryset.filter(manufacturer__name__iexact=manufacturer)
        elif part_number:
            queryset = queryset.filter(part_number__iexact=part_number)

        # Apply search filter if a search term is provided
        search_term = self.request.query_params.get('search')
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(manufacturer__name__icontains=search_term) |
                Q(part_number__icontains=search_term)
            )

        # Determine the order based on the 'order' query parameter
        order_by = self.request.query_params.get('order', 'id')  # Default order by 'id'

        if order_by == 'random':
            queryset = queryset.order_by('?')  # Randomize order
        elif order_by == 'created':
            queryset = queryset.order_by('created_at')  # Order by creation date (ascending)
        elif order_by == '-created':
            queryset = queryset.order_by('-created_at')  # Order by creation date (descending)
        elif order_by == 'modified':
            queryset = queryset.order_by('modified_at')  # Order by modified date (ascending)
        elif order_by == '-modified':
            queryset = queryset.order_by('-modified_at')  # Order by modified date (descending)
        else:
            queryset = queryset.order_by(order_by)  # Default order (or by other valid fields like 'id')

        return queryset

class ThirdPartyVendorViewSet(viewsets.ModelViewSet):
    queryset = ThirdPartyVendor.objects.all()
    serializer_class = ThirdPartyVendorSerializer

class ProductManufacturerViewSet(viewsets.ModelViewSet):
    queryset = ProductManufacturer.objects.all()
    serializer_class = ProductManufacturerSerializer





class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allows anyone to access this view


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)



# your_app/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order
from .serializers import OrderSerializer

class OrderCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)