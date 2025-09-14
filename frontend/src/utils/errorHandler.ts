/**
 * Error Handler Utility
 * Centralized error processing for consistent behavior
 */
import { AxiosError } from "axios";

export interface ErrorInfo {
  message: string;
  code?: string;
  details?: any;
}

export class ErrorHandler {
  /**
   * Process login-related errors
   */
  static processLoginError(error: any): ErrorInfo {
    if (error?.response?.data) {
      const data = error.response.data;
      
      // Handle specific error formats from Django backend
      if (data.error) {
        return { message: data.error };
      }
      
      if (data.detail) {
        return { message: data.detail };
      }
      
      if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
        return { message: data.non_field_errors.join(', ') };
      }
      
      // Handle field-specific errors
      const fieldErrors = this.extractFieldErrors(data);
      if (fieldErrors.length > 0) {
        return { message: fieldErrors.join(', ') };
      }
    }

    // Handle HTTP status codes
    if (error?.response?.status) {
      return this.getErrorByStatus(error.response.status);
    }

    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      return { 
        message: "Network error. Please check your internet connection.",
        code: 'NETWORK_ERROR'
      };
    }

    // Default error
    return { 
      message: "An unexpected error occurred. Please try again.",
      details: error.message 
    };
  }

  /**
   * Extract field-specific errors from response
   */
  private static extractFieldErrors(data: any): string[] {
    const errors: string[] = [];
    
    for (const [field, messages] of Object.entries(data)) {
      if (Array.isArray(messages)) {
        errors.push(...messages);
      } else if (typeof messages === 'string') {
        errors.push(messages);
      }
    }
    
    return errors;
  }

  /**
   * Get error message by HTTP status code
   */
  private static getErrorByStatus(status: number): ErrorInfo {
    switch (status) {
      case 400:
        return { 
          message: "Invalid email or password. Please check your credentials.",
          code: 'INVALID_CREDENTIALS'
        };
      case 401:
        return { 
          message: "Invalid credentials. Please check your email and password.",
          code: 'UNAUTHORIZED'
        };
      case 403:
        return { 
          message: "Access denied. Please contact support.",
          code: 'FORBIDDEN'
        };
      case 429:
        return { 
          message: "Too many login attempts. Please try again later.",
          code: 'RATE_LIMITED'
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return { 
          message: "Server error. Please try again later.",
          code: 'SERVER_ERROR'
        };
      default:
        return { 
          message: "An unexpected error occurred. Please try again.",
          code: 'UNKNOWN_ERROR'
        };
    }
  }

  /**
   * Check if error is recoverable (user can retry)
   */
  static isRecoverableError(error: ErrorInfo): boolean {
    const recoverableCodes = ['NETWORK_ERROR', 'SERVER_ERROR', 'RATE_LIMITED'];
    return recoverableCodes.includes(error.code || '');
  }
}