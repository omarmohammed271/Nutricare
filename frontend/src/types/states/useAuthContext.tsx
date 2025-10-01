import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AuthContextType, User } from "@src/types";
import { StorageService, AuthService } from "@src/services";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = StorageService.loadSession();
        console.log('Initializing auth with saved user:', savedUser);
        
        if (savedUser) {
          // If user has no token but has user data, try to refresh
          if (!savedUser.token && StorageService.hasUserData()) {
            try {
              console.log('Attempting token refresh on page load...');
              const newToken = await AuthService.refreshToken();
              if (newToken) {
                const userWithToken = { ...savedUser, token: newToken };
                setUser(userWithToken);
                console.log('Token refreshed successfully');
              } else {
                console.log('Token refresh failed, clearing session');
                StorageService.clearSession();
              }
            } catch (error) {
              console.error('Token refresh failed:', error);
              StorageService.clearSession();
            }
          } else if (savedUser.token) {
            // User has token, set them as authenticated
            console.log('User has valid token, setting as authenticated');
            setUser(savedUser);
          } else {
            // User data exists but no token, clear session
            console.log('User data exists but no token, clearing session');
            StorageService.clearSession();
          }
        } else {
          console.log('No saved user found');
        }
      } catch (error) {
        console.error("Authentication initialization failed:", error);
        StorageService.clearSession();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Session timeout warning effect - DISABLED
  // Users will stay logged in until manual logout
  useEffect(() => {
    if (!user?.token) return;

    // Disabled automatic session timeout
    // const checkSessionExpiry = () => {
    //   if (StorageService.isSessionNearExpiry()) {
    //     // Optionally show a warning to the user
    //     console.warn('Session expires soon');
    //   }
    //   
    //   if (!StorageService.isTokenValid()) {
    //     // Token expired, log out user
    //     removeSession();
    //   }
    // };

    // Check every minute - DISABLED
    // const interval = setInterval(checkSessionExpiry, 60000);
    // return () => clearInterval(interval);
  }, [user?.token]);

  const saveSession = (user: User, rememberMe: boolean = false) => {
    try {
      StorageService.saveSession(user, rememberMe);
      setUser(user);
    } catch (error) {
      console.error("Failed to save session:", error);
      throw error;
    }
  };

  const removeSession = () => {
    try {
      StorageService.clearSession();
      setUser(undefined);
    } catch (error) {
      console.error("Failed to remove session:", error);
    }
  };

  const isAuthenticated = isValidAuthState(user, isInitialized);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        saveSession,
        removeSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Validate authentication state
 * Checks if user has valid authentication data and context is initialized
 */
function isValidAuthState(user: User | undefined, isInitialized: boolean): boolean {
  if (!isInitialized) {
    return false;
  }

  if (!user) {
    return false;
  }

  if (!user.token) {
    return false;
  }

  // Additional validation could be added here
  // e.g., token expiration check, user role validation, etc.
  
  return true;
}
