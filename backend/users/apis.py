from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from django.shortcuts import redirect
from django.conf import settings
import requests
from datetime import timedelta
from django.utils import timezone
from urllib.parse import quote_plus
from .models import ConnectedAccount





class YouTubeOAuthInit(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Define required scopes
        scopes = [
            "https://www.googleapis.com/auth/youtube.readonly",
            "https://www.googleapis.com/auth/youtube"
        ]
        
        # Properly format the OAuth URL
        auth_url = (
            "https://accounts.google.com/o/oauth2/v2/auth?"
            f"client_id={settings.GOOGLE_CLIENT_ID}&"
            f"redirect_uri={quote_plus(settings.YOUTUBE_REDIRECT_URI)}&"
            "response_type=code&"
            f"scope={'+'.join(scopes)}&"  # Google expects + between scopes
            "access_type=offline&"
            "prompt=consent"
        )
        
        return Response({
            "oauth_url": auth_url,
            "instructions": "Have your frontend redirect users to this URL",
            "note": "After authorization, Google will redirect to your callback URL with a code"
        })

class YouTubeOAuthCallback(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Handle the callback from Google
        code = request.GET.get('code')
        error = request.GET.get('error')
        
        if error:
            return Response({
                "error": f"OAuth error: {error}",
                "description": request.GET.get('error_description', '')
            }, status=400)
            
        if not code:
            return Response({
                "error": "Authorization code not found in callback",
                "received_params": dict(request.GET)
            }, status=400)

        # Exchange authorization code for tokens
        token_data = {
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": settings.YOUTUBE_REDIRECT_URI,
            "grant_type": "authorization_code",
        }

        try:
            response = requests.post(
                "https://oauth2.googleapis.com/token",
                data=token_data,
                timeout=10
            )
            response.raise_for_status()
            tokens = response.json()
        except requests.RequestException as e:
            return Response({
                "error": "Token exchange failed",
                "details": str(e),
                "response": getattr(e.response, 'text', '') if hasattr(e, 'response') else ''
            }, status=400)

        # Here you would typically save the tokens to your database
        # This is just an example - adapt to your models
        tokens_data = {
            'access_token': tokens['access_token'],
            'refresh_token': tokens.get('refresh_token'),
            'expires_in': tokens['expires_in'],
            'token_type': tokens['token_type'],
        }
        
        return Response({
            "success": True,
            "message": "OAuth flow completed successfully",
            "tokens": tokens_data,
            "next_steps": "Store these tokens securely and use them for YouTube API requests",
            "api_usage_example": {
                "get_channel_info": "GET https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
                "headers": {
                    "Authorization": f"Bearer {tokens['access_token']}"
                }
            }
        })
    


class FacebookOAuthInit(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        scopes = [
            'email',
            'public_profile',
            # Add other required permissions
        ]
        
        auth_url = (
            "https://www.facebook.com/v12.0/dialog/oauth?"
            f"client_id={settings.FACEBOOK_APP_ID}&"
            f"redirect_uri={quote_plus(settings.FACEBOOK_REDIRECT_URI)}&"
            f"scope={','.join(scopes)}&"
            "response_type=code"
        )
        
        return Response({
            "oauth_url": auth_url,
            "instructions": "Redirect users to this URL for Facebook authentication"
        })

class FacebookOAuthCallback(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        code = request.GET.get('code')
        error = request.GET.get('error')
        
        if error:
            return Response({
                "error": f"Facebook OAuth error: {error}",
                "error_reason": request.GET.get('error_reason', ''),
                "error_description": request.GET.get('error_description', '')
            }, status=400)
            
        if not code:
            return Response({
                "error": "Authorization code missing",
                "received_params": dict(request.GET)
            }, status=400)

        # Exchange code for access token
        token_url = "https://graph.facebook.com/v12.0/oauth/access_token"
        params = {
            "client_id": settings.FACEBOOK_APP_ID,
            "client_secret": settings.FACEBOOK_APP_SECRET,
            "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
            "code": code
        }

        try:
            response = requests.get(token_url, params=params)
            response.raise_for_status()
            token_data = response.json()
            
            # Get user info
            user_info_url = "https://graph.facebook.com/me"
            user_params = {
                "fields": "id,name,email",
                "access_token": token_data['access_token']
            }
            user_response = requests.get(user_info_url, params=user_params)
            user_response.raise_for_status()
            user_data = user_response.json()
            
        except requests.RequestException as e:
            return Response({
                "error": "Facebook API request failed",
                "details": str(e),
                "response": getattr(e.response, 'text', '') if hasattr(e, 'response') else ''
            }, status=400)

        # Save to database (example)
        ConnectedAccount.objects.update_or_create(
            user=request.user,
            platform='facebook',
            defaults={
                'access_token': token_data['access_token'],
                'token_expires_at': timezone.now() + timedelta(seconds=token_data.get('expires_in', 0)),
                'meta': {
                    'user_id': user_data.get('id'),
                    'email': user_data.get('email'),
                    'name': user_data.get('name')
                }
            }
        )
        
        return Response({
            "success": True,
            "user_data": user_data,
            "token_info": {
                "access_token": token_data['access_token'],
                "token_type": token_data['token_type'],
                "expires_in": token_data.get('expires_in')
            }
        })    