import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { StorageService } from "@src/services";

// API base URL
const API_BASE_URL = "http://87.237.225.191:8000/api";


// Create axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for httpOnly cookies
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from secure in-memory storage
    const token = StorageService.getAccessToken();
    if (token) {
      // Send token with "Token " prefix
      const authHeader = `Token ${token}`;
      config.headers.Authorization = authHeader;
      console.log('🔑 Token added to request:', config.url);
      console.log('🔑 Token value:', token.substring(0, 20) + '...');
      console.log('🔑 Auth header (Token prefix):', authHeader);
    } else {
      console.log('⚠️ No token available for request:', config.url);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ Request successful:', response.config.url, response.status);
    return response;
  },
  async (error: AxiosError) => {
    const url = error.config?.url || '';
    const status = error.response?.status;
    
    console.log(`❌ Request failed: ${url} - Status: ${status}`);
    
    // Handle 401 errors (unauthorized) - but only for critical endpoints
    if (status === 401) {
      // Only auto-logout for critical authentication endpoints, not for all API calls
      const criticalEndpoints = ['/users/profile/', '/users/logout/', '/users/refresh/'];
      const isCriticalEndpoint = criticalEndpoints.some(endpoint => url.includes(endpoint));
      
      if (isCriticalEndpoint) {
        console.warn('🔒 Authentication failed on critical endpoint - redirecting to login');
        StorageService.clearSession();
        
        // Only redirect if we're not already on a login page
        if (!window.location.pathname.includes('/auth/')) {
          window.location.href = '/auth/login2';
        }
      } else {
        // For non-critical endpoints, just log the error but don't logout
        console.warn('⚠️ API call failed with 401 (non-critical):', url);
      }
    }
    
    // Handle 403 errors (Forbidden)
    if (status === 403) {
      const errorData = error.response?.data as any;
      const errorMessage = errorData?.detail || errorData?.message || '';
      console.error('🚫 Forbidden access:', errorMessage);
      console.log('💡 This might be due to insufficient permissions or invalid authentication');
    }
    
    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      console.error('🌐 Network error - please check your internet connection');
    }
    
    return Promise.reject(error);
  }
);

function HttpClient() {
  return {
    get: axiosInstance.get,
    post: axiosInstance.post,
    patch: axiosInstance.patch,
    put: axiosInstance.put,
    delete: axiosInstance.delete,
    instance: axiosInstance,
  };
}

export default HttpClient();
