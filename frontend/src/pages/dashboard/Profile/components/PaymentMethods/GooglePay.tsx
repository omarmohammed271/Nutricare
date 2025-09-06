import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  IconButton,
  Avatar,
  Divider
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Google as GoogleIcon
} from '@mui/icons-material';

interface GooglePayProps {
  onConnect: () => void;
}

const GooglePay: React.FC<GooglePayProps> = ({ onConnect }) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    onConnect();
  };

  return (
    <Grid container spacing={4}>
      {/* Left Section - Google Pay Setup */}
      <Grid item xs={12} md={7}>
        <Box>
          {/* Google Pay Logo */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#4285F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2
            }}>
              <GoogleIcon sx={{ color: 'white', fontSize: 40 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
              Google Pay
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Quick and secure payments with Google
            </Typography>
          </Box>

          {/* Features */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
              Why choose Google Pay?
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                  Fast and secure payments
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#666', ml: 4 }}>
                Pay with just a tap using your saved payment methods
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                  Advanced security
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#666', ml: 4 }}>
                Your payment info is protected with multiple layers of security
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                  Easy setup
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#666', ml: 4 }}>
                Connect in seconds with your existing Google account
              </Typography>
            </Box>
          </Box>

          {/* Privacy Notice */}
          <Box sx={{ 
            mb: 4, 
            p: 2, 
            backgroundColor: '#E3F2FD', 
            borderRadius: 2,
            border: '1px solid #BBDEFB'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976D2', mb: 1 }}>
              Privacy & Security
            </Typography>
            <Typography variant="caption" sx={{ color: '#1565C0' }}>
              Google Pay never shares your actual card numbers with merchants. 
              A unique virtual account number is used for each transaction.
            </Typography>
          </Box>

          {/* Connect Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleConnect}
            disabled={isConnected}
            sx={{
              backgroundColor: isConnected ? '#4CAF50' : '#4285F4',
              color: 'white',
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: isConnected ? '#45a049' : '#3367D6'
              },
              '&.Mui-disabled': {
                backgroundColor: '#4CAF50',
                color: 'white'
              }
            }}
            startIcon={isConnected ? <CheckCircleIcon /> : <GoogleIcon />}
          >
            {isConnected ? 'Google Pay Connected' : 'Connect with Google Pay'}
          </Button>
        </Box>
      </Grid>

      {/* Right Section - Google Pay Account Display */}
      <Grid item xs={12} md={5}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
              Google Pay Wallet
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Digital wallet
            </Typography>
            <IconButton sx={{ color: '#666' }}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          {/* Google Pay Card */}
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 75%, #EA4335 100%)',
            color: 'white',
            p: 3,
            borderRadius: 3,
            mb: 3,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Pattern */}
            <Box sx={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)'
            }} />
            
            {/* Card Content */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Google Pay
                </Typography>
                <GoogleIcon sx={{ fontSize: 32 }} />
              </Box>
              
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                Connected Account
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                alexarawles@gmail.com
              </Typography>
              
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                Default Payment Method
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                •••• •••• •••• 1234
              </Typography>
            </Box>
          </Card>

          {/* Wallet Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
              Wallet Balance
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
              $325.50
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
              Reward Points
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
              1,250 points
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            {/* Recent Transaction */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#333', fontWeight: 600, mb: 1 }}>
                Recent Transaction
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                    NutriCare Premium
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Dec 15, 2024
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                  $9.99
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#4285F4',
                color: '#4285F4',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                flex: 1
              }}
            >
              Manage
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#4285F4',
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                flex: 1,
                '&:hover': {
                  backgroundColor: '#3367D6'
                }
              }}
            >
              Add Funds
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GooglePay;