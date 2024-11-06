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


# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        
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
            )[:12]  # Limit to 12 results for search
        
        # Apply limit if no search term is provided
        elif self.request.query_params.get('limit'):
            try:
                limit = int(self.request.query_params.get('limit'))
                queryset = queryset[:limit]
            except ValueError:
                pass  # Ignore invalid limit values
        
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



