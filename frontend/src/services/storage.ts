/**
 * Storage Service
 * Handles secure authentication data storage using in-memory state and httpOnly cookies
 */
import { deleteCookie, setCookie, getCookie } from "cookies-next";
import { User } from "@src/types";

export class StorageService {
  private static readonly AUTH_SESSION_KEY = "_NUTRICARE_MUI_AUTH_";
  private static readonly REFRESH_TOKEN_KEY = "_NUTRICARE_REFRESH_";
  
  // In-memory token storage (more secure)
  private static accessToken: string | null = null;
  private static tokenExpiry: number | null = null;

  /**
   * Save user session with secure token handling
   */
  static saveSession(user: User, rememberMe: boolean = false): void {
    try {
      // Store access token in memory
      if (user.token) {
        this.accessToken = user.token;
        // Set token expiry (default 1 hour)
        this.tokenExpiry = Date.now() + (60 * 60 * 1000);
      }

      // Save user data including token to cookie for persistence
      const userDataForCookie = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        lastLoginTime: Date.now(),
        token: user.token, // Include token for persistence
        tokenExpiry: this.tokenExpiry, // Include token expiry
      };
      
      const cookieOptions = {
        maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
        secure: false, // Set to false for HTTP production server
        sameSite: 'lax' as const, // More permissive for cross-origin requests
        httpOnly: false, // We need to read this from client-side
        domain: process.env.NODE_ENV === 'production' ? '.87.237.225.191' : undefined, // Set domain for production
        path: '/', // Ensure cookie is available for all paths
      };
      
      console.log('🍪 Saving session cookie with options:', cookieOptions);
      console.log('🍪 Environment:', process.env.NODE_ENV);
      console.log('🍪 Current domain:', window.location.hostname);
      
      try {
        setCookie(this.AUTH_SESSION_KEY, JSON.stringify(userDataForCookie), cookieOptions);
        console.log('🍪 Session cookie saved successfully');
      } catch (error) {
        console.warn('🍪 Failed to save cookie with domain, trying without domain:', error);
        // Fallback: try without domain
        setCookie(this.AUTH_SESSION_KEY, JSON.stringify(userDataForCookie), {
          maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
          secure: false,
          sameSite: 'lax' as const,
          httpOnly: false,
          path: '/',
        });
      }
      
      // For refresh tokens, use httpOnly cookies (if available)
      if (user.refresh_token) {
        setCookie(this.REFRESH_TOKEN_KEY, user.refresh_token, {
          maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60, // 30 days or 7 days
          secure: false, // Set to false for HTTP production server
          sameSite: 'lax', // More permissive for cross-origin requests
          httpOnly: true, // Critical: prevents XSS access
          domain: process.env.NODE_ENV === 'production' ? '.87.237.225.191' : undefined, // Set domain for production
          path: '/', // Ensure cookie is available for all paths
        });
      }
      
    } catch (error) {
      console.error("Failed to save session:", error);
      throw new Error("Failed to save authentication session");
    }
  }

  /**
   * Load user session from storage
   */
  static loadSession(): User | null {
    try {
      const savedUser = getCookie(this.AUTH_SESSION_KEY);
      console.log('🍪 Loading session from cookie:', savedUser ? 'Found' : 'Not found');
      console.log('🍪 Environment:', process.env.NODE_ENV);
      console.log('🍪 Current domain:', window.location.hostname);
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser as string);
        
        // Restore token from cookie if it exists and is not expired
        if (parsedUser.token && parsedUser.tokenExpiry) {
          const now = Date.now();
          if (now < parsedUser.tokenExpiry) {
            // Token is still valid, restore it to memory
            this.accessToken = parsedUser.token;
            this.tokenExpiry = parsedUser.tokenExpiry;
            return { ...parsedUser, token: parsedUser.token };
          } else {
            // Token expired, clear it
            console.log('Stored token has expired');
            this.clearSession();
            return null;
          }
        }
        
        // No token or expired token
        return { ...parsedUser, token: undefined };
      }
      
      return null;
    } catch (error) {
      console.error("Failed to load session:", error);
      this.clearSession();
      return null;
    }
  }

  /**
   * Get current access token
   */
  static getAccessToken(): string | null {
    if (this.isTokenValid()) {
      return this.accessToken;
    }
    return null;
  }

  /**
   * Check if token is valid and not expired
   */
  static isTokenValid(): boolean {
    if (!this.accessToken || !this.tokenExpiry) {
      return false;
    }
    
    const now = Date.now();
    const isValid = now < this.tokenExpiry;
    
    if (!isValid) {
      // Token expired, clear it
      this.accessToken = null;
      this.tokenExpiry = null;
    }
    
    return isValid;
  }

  /**
   * Update access token (for refresh scenarios)
   */
  static updateAccessToken(token: string, expiresIn: number = 3600): void {
    this.accessToken = token;
    this.tokenExpiry = Date.now() + (expiresIn * 1000);
  }

  /**
   * Clear all authentication data
   */
  static clearSession(): void {
    try {
      // Clear in-memory tokens
      this.accessToken = null;
      this.tokenExpiry = null;
      
      // Clear cookies with proper domain configuration
      deleteCookie(this.AUTH_SESSION_KEY, {
        domain: process.env.NODE_ENV === 'production' ? '.87.237.225.191' : undefined,
        path: '/',
      });
      deleteCookie(this.REFRESH_TOKEN_KEY, {
        domain: process.env.NODE_ENV === 'production' ? '.87.237.225.191' : undefined,
        path: '/',
      });
      
      // Clear any legacy localStorage data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('_NUTRICARE_MUI_AUTH_');
    } catch (error) {
      console.error("Failed to clear session:", error);
    }
  }

  /**
   * Check if user data exists (regardless of token status)
   */
  static hasUserData(): boolean {
    const savedUser = getCookie(this.AUTH_SESSION_KEY);
    return !!savedUser;
  }

  /**
   * Get session duration remaining in minutes
   */
  static getSessionTimeRemaining(): number {
    if (this.tokenExpiry) {
      const remaining = this.tokenExpiry - Date.now();
      return Math.max(0, Math.floor(remaining / (60 * 1000)));
    }
    return 0;
  }

  /**
   * Check if session is about to expire (within 5 minutes)
   */
  static isSessionNearExpiry(): boolean {
    return this.getSessionTimeRemaining() <= 5;
  }

  /**
   * Get stored user data from cookie
   */
  static getStoredUserData(): any {
    try {
      const savedUser = getCookie(this.AUTH_SESSION_KEY);
      return savedUser ? JSON.parse(savedUser as string) : null;
    } catch {
      return null;
    }
  }
}