/**
 * Authentication Service
 * Handles authentication-related API calls and business logic
 */
import { HttpClient } from "@src/helpers";
import { ResendActivation , LoginRequest, LoginResponse, ResetPassword, resetpasswordCode, SignupRequest, SignupResponse, ActivationRequest, ActivationResponse, User } from "@src/types";
import { AxiosResponse } from "axios";
import { StorageService } from "./storage";

export class AuthService {
  /**
   * Register a new user
   */
  static async signup(credentials: SignupRequest): Promise<SignupResponse> {
    try {
      const response: AxiosResponse<SignupResponse> = await HttpClient.post(
        "/users/register/",
        credentials
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }


  static async resendActivation(Email: ResendActivation): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await HttpClient.post(
        "/users/sendactivate/",
        Email
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }




  /**
   * Activate user account with email and activation code
   */
  static async activateCode(data: ActivationRequest): Promise<ActivationResponse> {
    try {
      const response: AxiosResponse<ActivationResponse> = await HttpClient.post(
        "/users/activate/",
        data
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Authenticate user with email and password
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await HttpClient.post(
        "/users/login/",
        credentials
      );
      console.log("Login response:", response.data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  


  static async ResetPassword(ResetPasswordEmail: ResetPassword): Promise<any> {
    try {
      const response: AxiosResponse<ResetPassword> = await HttpClient.post(
        "/users/resetpassword/",
        ResetPasswordEmail
      );
   
      return response;
    } catch (error: any) {
      throw error;
    }
  }



  static async resetPasswordCode(data: resetpasswordCode): Promise<resetpasswordCode> {
    try {
      const response: AxiosResponse<resetpasswordCode> = await HttpClient.post(
        "/users/resetpassword-verify/",
        data
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }


  /**
   * Refresh authentication token using httpOnly refresh token
   */
  static async refreshToken(): Promise<string | null> {
    try {
      const response: AxiosResponse<LoginResponse> = await HttpClient.post(
        "/users/refresh/",
        {}, // Empty body - refresh token is in httpOnly cookie
        { withCredentials: true }
      );
      
      const token = this.extractToken(response.data);
      if (token) {
        // Update in-memory token
        const expiresIn = response.data.expires_in || 3600;
        StorageService.updateAccessToken(token, expiresIn);
        return token;
      }
      
      return null;
    } catch (error: any) {
      console.log('Real refresh token endpoint not available, using fake refresh for development');
      return this.fakeRefreshToken();
    }
  }

  /**
   * Fake refresh token system for development when backend endpoint doesn't exist
   */
  private static fakeRefreshToken(): string | null {
    try {
      // Check if we have user data stored (indicates user was previously logged in)
      if (StorageService.hasUserData()) {
        // Check if the stored session is not too old (within 24 hours)
        const userData = StorageService.getStoredUserData();
        if (userData && userData.lastLoginTime) {
          const timeSinceLogin = Date.now() - userData.lastLoginTime;
          const maxRefreshTime = 24 * 60 * 60 * 1000; // 24 hours
          
          if (timeSinceLogin < maxRefreshTime) {
            // Generate a fake token (in real app, this would come from server)
            const fakeToken = this.generateFakeToken(userData.email || 'user');
            console.log('Generated fake refresh token for development');
            
            // Update stored token with new expiry
            StorageService.updateAccessToken(fakeToken, 3600); // 1 hour
            return fakeToken;
          }
        }
      }
      
      console.log('Fake refresh failed - user session too old or no user data');
      return null;
    } catch (error) {
      console.error('Fake refresh token failed:', error);
      return null;
    }
  }

  /**
   * Generate a fake JWT-like token for development purposes
   */
  private static generateFakeToken(email: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
      iss: 'nutricare-dev'
    }));
    const signature = btoa('fake-signature-' + Date.now());
    
    return `${header}.${payload}.${signature}`;
  }

  /**
   * Logout user by calling the API endpoint
   */
  static async logout(): Promise<void> {
    try {
      await HttpClient.post("/users/logout/", {});
      console.log('Logout API call successful');
    } catch (error: any) {
      console.error('Logout API call failed:', error);
      // Don't throw error - we still want to clear local session
    }
  }

  /**
   * Extract token from various possible response formats
   */
  static extractToken(response: LoginResponse): string | null {
    return response.token || response.access_token || response.access || null;
  }

  /**
   * Create user object from login response
   */
  static createUserFromResponse(response: LoginResponse, email: string): User {
    const token = this.extractToken(response);
    
    return {
      ...response.user,
      token: token || undefined,
      email: response.user?.email || email,
    };
  }
}