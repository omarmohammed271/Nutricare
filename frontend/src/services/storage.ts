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
      // Store access token in memory only (never persisted)
      if (user.token) {
        
        this.accessToken = user.token;
        // Set token expiry (default 1 hour)
        this.tokenExpiry = Date.now() + (60 * 60 * 1000);
      }

      // Save non-sensitive user data to cookie
      const userDataForCookie = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        lastLoginTime: Date.now(),
      };
      
      setCookie(this.AUTH_SESSION_KEY, JSON.stringify(userDataForCookie), {
        maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        httpOnly: false, // We need to read this from client-side
      });
      
      // For refresh tokens, use httpOnly cookies (if available)
      if (user.refresh_token) {
        setCookie(this.REFRESH_TOKEN_KEY, user.refresh_token, {
          maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60, // 30 days or 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          httpOnly: true, // Critical: prevents XSS access
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
      
      // If we have user data but no valid token, we'll try to refresh
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser as string);
        
        // If token is still valid, return user with token
        if (this.isTokenValid()) {
          return { ...parsedUser, token: this.accessToken };
        }
        
        // Token is invalid/expired, but user data exists
        // Return user without token - auth context will handle refresh
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
    return !!(
      this.accessToken && 
      this.tokenExpiry && 
      Date.now() < this.tokenExpiry
    );
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
      
      // Clear cookies
      deleteCookie(this.AUTH_SESSION_KEY);
      deleteCookie(this.REFRESH_TOKEN_KEY);
      
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