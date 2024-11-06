from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ThirdPartyVendorViewSet, ProductManufacturerViewSet, RegisterView, LoginView, UserRegistrationView
from .views_api import register  # Ensure this is the correct import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Setting up the router
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'vendors', ThirdPartyVendorViewSet, basename='vendor')
router.register(r'manufacturers', ProductManufacturerViewSet, basename='manufacturer')

# URL patterns
urlpatterns = [
    path('api/', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('api/register/', register, name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('vendor-register/', RegisterView.as_view(), name='vendor_register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)