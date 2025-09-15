import HttpClient from '@src/helpers/httpClient';
import { StorageService } from '@src/services';

/**
 * Test function to verify token is being sent correctly
 */
export const testTokenSending = async () => {
  console.log('🧪 Testing token sending...');
  
  // Check if token exists
  const token = StorageService.getAccessToken();
  console.log('🔑 Current token:', token ? 'Present' : 'Missing');
  
  if (token) {
    console.log('📝 Token details:', {
      length: token.length,
      startsWith: token.substring(0, 20) + '...',
      isValid: StorageService.isTokenValid(),
      hasBearerPrefix: token.startsWith('Bearer '),
      rawToken: token
    });
    
    // Show what the Authorization header will look like (with Token prefix)
    const authHeader = `Token ${token}`;
    console.log('🔑 Authorization header will be (Token prefix):', authHeader);
  }
  
  // Test a simple API call
  try {
    console.log('🚀 Making test API call...');
    const response = await HttpClient.get('/users/profile/');
    console.log('✅ Test API call successful:', response.status);
    return true;
  } catch (error: any) {
    console.log('❌ Test API call failed:', error.response?.status, error.message);
    return false;
  }
};

/**
 * Test function to verify all API calls include the token
 */
export const testAllApiCalls = async () => {
  console.log('🧪 Testing all API calls...');
  
  const testEndpoints = [
    '/nutritions/drug-categories/',
    '/users/profile/',
    '/nutritions/drugs/1/'
  ];
  
  for (const endpoint of testEndpoints) {
    try {
      console.log(`🔍 Testing endpoint: ${endpoint}`);
      await HttpClient.get(endpoint);
      console.log(`✅ ${endpoint} - Success`);
    } catch (error: any) {
      console.log(`❌ ${endpoint} - Failed:`, error.response?.status);
    }
  }
};

/**
 * Test function to inspect request headers
 */
export const inspectRequestHeaders = () => {
  console.log('🔍 Inspecting request headers...');
  
  const token = StorageService.getAccessToken();
  if (token) {
    const authHeader = `Token ${token}`;
    console.log('📋 Request headers that will be sent:');
    console.log('  Content-Type: application/json');
    console.log('  Accept: application/json');
    console.log(`  Authorization: ${authHeader}`);
    console.log('  withCredentials: true');
    
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': authHeader,
      'withCredentials': true
    };
  } else {
    console.log('❌ No token available for inspection');
    return null;
  }
};

export default {
  testTokenSending,
  testAllApiCalls,
  inspectRequestHeaders
};
