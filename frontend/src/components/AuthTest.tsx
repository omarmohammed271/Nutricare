import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Alert, Card, CardContent, Chip } from '@mui/material';
import { useAuthContext } from '@src/states';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '@src/services';
import { testTokenSending, testAllApiCalls, inspectRequestHeaders } from '@src/utils/tokenTest';

const AuthTest = () => {
  const { user, isAuthenticated, removeSession } = useAuthContext();
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<{ [key: string]: boolean | null }>({});

  useEffect(() => {
    console.log('AuthTest - Current auth state:', { user, isAuthenticated });
    console.log('AuthTest - Storage check:', {
      hasUserData: StorageService.hasUserData(),
      tokenValid: StorageService.isTokenValid(),
      sessionTimeRemaining: StorageService.getSessionTimeRemaining()
    });
  }, [user, isAuthenticated]);

  const handleLogout = () => {
    console.log('Logging out...');
    removeSession();
    navigate('/auth/login2', { replace: true });
  };

  const handleLogin = () => {
    console.log('Navigating to login...');
    navigate('/auth/login2', { replace: true });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleTestToken = async () => {
    setTestResults(prev => ({ ...prev, tokenTest: null }));
    const result = await testTokenSending();
    setTestResults(prev => ({ ...prev, tokenTest: result }));
  };

  const handleTestAllApis = async () => {
    setTestResults(prev => ({ ...prev, allApis: null }));
    await testAllApiCalls();
    setTestResults(prev => ({ ...prev, allApis: true }));
  };

  const handleInspectHeaders = () => {
    inspectRequestHeaders();
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Authentication Test
      </Typography>
      
      <Alert severity={isAuthenticated ? "success" : "warning"} sx={{ mb: 3 }}>
        Status: {isAuthenticated ? "Authenticated" : "Not Authenticated"}
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>User Info:</Typography>
          {user ? (
            <>
              <Typography>Email: {user.email}</Typography>
              <Typography>Token: {user.token ? 'Present' : 'Missing'}</Typography>
              <Typography>ID: {user.id}</Typography>
              <Typography>Role: {user.role}</Typography>
            </>
          ) : (
            <Typography>No user data</Typography>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Storage Info:</Typography>
          <Typography>Has User Data: {StorageService.hasUserData() ? 'Yes' : 'No'}</Typography>
          <Typography>Token Valid: {StorageService.isTokenValid() ? 'Yes' : 'No'}</Typography>
          <Typography>Session Time Remaining: {StorageService.getSessionTimeRemaining()} minutes</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Token Testing:</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="outlined" 
              onClick={handleTestToken}
              disabled={!isAuthenticated}
              size="small"
            >
              Test Token Sending
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleTestAllApis}
              disabled={!isAuthenticated}
              size="small"
            >
              Test All APIs
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleInspectHeaders}
              disabled={!isAuthenticated}
              size="small"
            >
              Inspect Headers
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {testResults.tokenTest !== null && (
              <Chip 
                label={`Token Test: ${testResults.tokenTest ? 'Passed' : 'Failed'}`}
                color={testResults.tokenTest ? 'success' : 'error'}
                size="small"
              />
            )}
            {testResults.allApis !== null && (
              <Chip 
                label={`All APIs: ${testResults.allApis ? 'Completed' : 'Failed'}`}
                color={testResults.allApis ? 'success' : 'error'}
                size="small"
              />
            )}
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        {isAuthenticated ? (
          <>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleLogout}
              size="large"
            >
              Logout
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleRefresh}
              size="large"
            >
              Refresh Page
            </Button>
          </>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLogin}
            size="large"
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AuthTest;
