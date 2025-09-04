from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from .serializers import *
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.contrib.auth import authenticate
from django.utils import timezone
from datetime import timedelta
from .models import CustomUser, ConnectedAccount
import random

from django.shortcuts import redirect






User = get_user_model()

class LoginAPI(APIView):
    permission_classes = [AllowAny,]
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error':'Email and Password are required'},status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response({'error':'Invalid Credentials'},status=status.HTTP_400_BAD_REQUEST)
            
        token,created = Token.objects.get_or_create(user=user)
        
        data = {
            'Message':'Login Success',
            'token':token.key,    
            'role':user.role,              
        }
        
        return Response(data,status=status.HTTP_200_OK)
    
        
class LogoutAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes  = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response({'message':"logout Success"}, status=status.HTTP_200_OK)


class ChangePasswordAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = request.user
        data = request.data
        if not user.check_password(data.get('old_password')):
            return Response({'message':'Wrong Old Password'},status=status.HTTP_400_BAD_REQUEST)
        user.set_password(data.get('new_password'))
        user.save()
        return Response({'message':'Password Changed'},status=status.HTTP_200_OK)
    

class ResendActivationCode(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error':'No User with this email'},status=status.HTTP_400_BAD_REQUEST)

        if user.is_active:
            return Response({'error':'This user is already activated'},status=status.HTTP_400_BAD_REQUEST)    
        
        # Generate a 5-digit activation code
        activation_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        user.activation_code = activation_code
        user.activation_code_created_at = timezone.now()
        user.save()
        
        mail_subject = "Activate your Account"
        message = f"Your activation code is: {activation_code}"
        to_email = user.email 
        send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [to_email])
        return Response({'success':'Activation code has been sent to your email'}, status=status.HTTP_200_OK)

class ActivateAccountAPI(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        activation_code = request.data.get('activation_code')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error':'No User with this email'},status=status.HTTP_400_BAD_REQUEST)
            
        if user.is_active:
            return Response({'error':'This user is already activated'},status=status.HTTP_400_BAD_REQUEST)
            
        if not hasattr(user, 'activation_code') or user.activation_code != activation_code:
            return Response({'error':'Invalid activation code'},status=status.HTTP_400_BAD_REQUEST)
        if not user.activation_code_created_at or timezone.now() - user.activation_code_created_at > timedelta(minutes=10):
            return Response({'error': 'Code Expired'}, status=400)
            
        user.is_active = True
        user.activation_code = None
        user.activation_code_created_at = None
        user.save()

        return Response({'message':'Account activated successfully'},status=status.HTTP_200_OK)
        
class PasswordResetAPI(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
             return Response({'error':'No User with this email'},status=status.HTTP_400_BAD_REQUEST)           
        
        # Generate a 5-digit reset code
        reset_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        user.password_reset_code = reset_code
        user.password_reset_code_created_at = timezone.now()
        user.save()
        
        mail_subject = "Password Reset Code"
        message = f"Your password reset code is: {reset_code}"
        to_email = user.email 
        send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [to_email])
        return Response({'success':'Password reset code has been sent to your email'}, status=status.HTTP_200_OK)
    
class PasswordResetVerifyAPI(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        reset_code = request.data.get('reset_code')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error':'No User with this email'},status=status.HTTP_400_BAD_REQUEST)               
        
        if not hasattr(user, 'password_reset_code') or user.password_reset_code != reset_code:
            return Response({'error':'Invalid reset code'},status=status.HTTP_400_BAD_REQUEST)
        
        if not user.password_reset_code_created_at or timezone.now() - user.password_reset_code_created_at > timedelta(minutes=10):
            return Response({'error': 'Code Expired'}, status=400)
            
        return Response({'message':'Code verified. You can now reset your password.'},status=status.HTTP_200_OK)    

class PasswordResetDoneAPI(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        
        new_password = request.data.get('new_password')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error':'No User with this email'},status=status.HTTP_400_BAD_REQUEST)               
  
        user.set_password(new_password)
        user.password_reset_code = None
        user.password_reset_code_created_at = None
        user.save()

        return Response({'message':'Password changed successfully'},status=status.HTTP_200_OK)


class RegisterAPI(APIView):
    permission_classes = [AllowAny,]
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # Get the validated data
            validated_data = serializer.validated_data

            print('exists')
            user = User.objects.filter(email=validated_data['email']).exists()
            if user:
                return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create user instance without saving
            user = CustomUser(
                email=validated_data['email'],
                username=validated_data['email'].split('@')[0],
                is_active=False  # Deactivate the user until activation
            )
            
            # Set the password properly
            user.set_password(validated_data['password'])

            # Generate a 6-digit activation code
            activation_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
            user.activation_code = activation_code
            user.activation_code_created_at = timezone.now()

            # Save the user
            user.save()

            # user_subscription = UserSubscription.objects.create(
            #     user=user,
            #     plan_id=1,
            #     start_date=timezone.now(),
            #     end_date=timezone.now() + timedelta(days=30), 
            #     is_active=True,
            #     payment_method='free_trial',  
            # )
            # user_subscription.save()

            
            
            # Send activation email
            mail_subject = "Activate your Account"
            message = f"Your activation code is: {activation_code}"
            to_email = user.email 
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [to_email])
            
            return Response(
                {'message': 'User registered successfully. Please check your email for activation code.'},
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteAccountAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({'message':'Account deleted successfully'},status=status.HTTP_200_OK)


# ==============================
# YOUTUBE OAUTH
# ==============================
# class YouTubeOAuthInit(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request):
#         scopes = "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube"
#         redirect_uri = (
#             f"https://accounts.google.com/o/oauth2/v2/auth"
#             f"?client_id={settings.GOOGLE_CLIENT_ID}"
#             f"&redirect_uri={settings.YOUTUBE_REDIRECT_URI}"
#             f"&response_type=code"
#             f"&scope={scopes}"
#             f"&access_type=offline"
#             f"&prompt=consent"
#         )
#         return redirect(redirect_uri)

# class YouTubeOAuthCallback(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         code = request.GET.get('code')
#         if not code:
#             return Response({"error": "Authorization code not found"}, status=400)

#         token_url = "https://oauth2.googleapis.com/token"
#         data = {
#             "code": code,
#             "client_id": settings.GOOGLE_CLIENT_ID,
#             "client_secret": settings.GOOGLE_CLIENT_SECRET,
#             "redirect_uri": settings.YOUTUBE_REDIRECT_URI,
#             "grant_type": "authorization_code",
#         }

#         r = requests.post(token_url, data=data)
#         if r.status_code != 200:
#             return Response({"error": "Failed to fetch tokens"}, status=r.status_code)

#         tokens = r.json()
#         ConnectedAccount.objects.update_or_create(
#             user=request.user,
#             platform='youtube',
#             defaults={
#                 'access_token': tokens['access_token'],
#                 'refresh_token': tokens.get('refresh_token'),
#                 'token_expires_at': timezone.now() + timedelta(seconds=tokens['expires_in']),
#             }
#         )
#         return Response({"message": "YouTube account linked successfully"})

# ==============================
# FACEBOOK OAUTH
# # ==============================
# class FacebookOAuthInit(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         redirect_uri = (
#             f"https://www.facebook.com/v18.0/dialog/oauth"
#             f"?client_id={settings.FACEBOOK_CLIENT_ID}"
#             f"&redirect_uri={settings.FACEBOOK_REDIRECT_URI}"
#             f"&scope=pages_show_list,pages_read_engagement,pages_manage_posts,publish_video"
#             f"&response_type=code"
#         )
#         return redirect(redirect_uri)

# class FacebookOAuthCallback(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         code = request.GET.get('code')
#         if not code:
#             return Response({"error": "Authorization code missing"}, status=400)

#         token_url = "https://graph.facebook.com/v18.0/oauth/access_token"
#         data = {
#             "client_id": settings.FACEBOOK_CLIENT_ID,
#             "client_secret": settings.FACEBOOK_CLIENT_SECRET,
#             "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
#             "code": code,
#         }

#         r = requests.get(token_url, params=data)
#         if r.status_code != 200:
#             return Response({"error": "Failed to get access token"}, status=r.status_code)

#         tokens = r.json()
#         ConnectedAccount.objects.update_or_create(
#             user=request.user,
#             platform='facebook',
#             defaults={
#                 'access_token': tokens['access_token'],
#                 'token_expires_at': timezone.now() + timedelta(days=60),
#             }
#         )
#         return Response({"message": "Facebook account linked successfully"})
