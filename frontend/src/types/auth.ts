export type User = {
  id?: number;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  token?: string; // Access token (short-lived, in-memory)
  refresh_token?: string; // Refresh token (longer-lived, httpOnly cookie)
  // Additional fields that might come from the API
  is_active?: boolean;
  is_staff?: boolean;
  date_joined?: string;
  last_login?: string;
  lastLoginTime?: number; // Client-side tracking
};

export type LoginRequest = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type SignupRequest = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export type SignupResponse = {
  token?: string;
  access_token?: string;
  access?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: User;
  message?: string;
  error?: string;
  detail?: string;
  non_field_errors?: string[];
  [key: string]: any;
};

export type ActivationRequest = {
  email: string;
  activation_code: string;
};

export type ActivationResponse = {
  token?: string;
  access_token?: string;
  access?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: User;
  message?: string;
  error?: string;
  detail?: string;
  non_field_errors?: string[];
  [key: string]: any;
};

export type LoginResponse = {
  token?: string;
  access_token?: string;
  access?: string; // Added for Django DRF compatibility
  refresh_token?: string;
  expires_in?: number; // Token expiration time in seconds
  user?: User;
  message?: string;
  error?: string;
  detail?: string; // Django error format
  non_field_errors?: string[]; // Django validation errors
  [key: string]: any; // Allow for field-specific errors
};

export type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  saveSession: (session: User, rememberMe?: boolean) => void;
  removeSession: () => void;
};


export type ResendActivation = {
  email: string;
};


export type ResetPassword = {
email: string;   // request
  status?: number;  // response
  message?: string; // response
};




export type resetpasswordCode = {
  email: string;
  reset_code: string;
};