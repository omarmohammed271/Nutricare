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
    'X-CSRFTOKEN': '4FxcMgwPMIrvx0xJij8Sfn64E22yOkj86b9efxeRpFkMIfsSqN9vTP1HrMfFfd3B'
    
  },
  withCredentials: true, // Important for httpOnly cookies
});

// Request interceptor to add auth token from memory
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from secure in-memory storage
    const token = StorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    return response;
  },
  async (error: AxiosError) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      console.warn('Authentication failed - redirecting to login');
      StorageService.clearSession();
      
      // Only redirect if we're not already on a login page
      if (!window.location.pathname.includes('/auth/')) {
        window.location.href = '/auth/login2';
      }
    }
    
    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      console.error('Network error - please check your internet connection');
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
