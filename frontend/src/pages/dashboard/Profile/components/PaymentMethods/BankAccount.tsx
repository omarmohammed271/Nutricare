import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import {
  AccountBalance as BankIcon,
  MoreVert as MoreVertIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface BankAccountData {
  accountHolderName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  country: string;
}

interface BankAccountProps {
  bankData: BankAccountData;
  onBankInputChange: (field: string, value: string) => void;
  onConnect: () => void;
}

const BankAccount: React.FC<BankAccountProps> = ({
  bankData,
  onBankInputChange,
  onConnect
}) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Grid container spacing={4}>
      {/* Left Section - Bank Form */}
      <Grid item xs={12} md={7}>
        <Box>
          {/* Account Holder Name */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
              Account Holder Name
            </Typography>
            <TextField
              fullWidth
              value={bankData.accountHolderName}
              onChange={(e) => onBankInputChange('accountHolderName', e.target.value)}
              placeholder="Enter full name as shown on account"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Box>

          {/* Bank Name */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
              Bank Name
            </Typography>
            <TextField
              fullWidth
              value={bankData.bankName}
              onChange={(e) => onBankInputChange('bankName', e.target.value)}
              placeholder="Enter your bank name"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Routing Number */}
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Routing Number
              </Typography>
              <TextField
                fullWidth
                value={bankData.routingNumber}
                onChange={(e) => onBankInputChange('routingNumber', e.target.value)}
                placeholder="123456789"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF'
                  }
                }}
              />
            </Grid>
            {/* Account Number */}
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Account Number
              </Typography>
              <TextField
                fullWidth
                value={bankData.accountNumber}
                onChange={(e) => onBankInputChange('accountNumber', e.target.value)}
                placeholder="1234567890"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF'
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Account Type */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
              Account Type
            </Typography>
            <FormControl fullWidth>
              <Select
                value={bankData.accountType}
                onChange={(e) => onBankInputChange('accountType', e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: '#FFFFFF'
                }}
              >
                <MenuItem value="">Select Account Type</MenuItem>
                <MenuItem value="checking">Checking Account</MenuItem>
                <MenuItem value="savings">Savings Account</MenuItem>
                <MenuItem value="business">Business Account</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Country */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
              Country
            </Typography>
            <FormControl fullWidth>
              <Select
                value={bankData.country}
                onChange={(e) => onBankInputChange('country', e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: '#FFFFFF'
                }}
              >
                <MenuItem value="">Select Country</MenuItem>
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="AU">Australia</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Security Notice */}
          <Box sx={{ 
            mb: 4, 
            p: 2, 
            backgroundColor: '#E8F5E8', 
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <SecurityIcon sx={{ color: '#4CAF50' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                Your bank information is secure
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                We use bank-level security to protect your information
              </Typography>
            </Box>
          </Box>

          {/* Connect Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={onConnect}
            disabled={isConnected}
            sx={{
              backgroundColor: isConnected ? '#4CAF50' : '#4CAF50',
              color: 'white',
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#45a049'
              },
              '&.Mui-disabled': {
                backgroundColor: '#4CAF50',
                color: 'white'
              }
            }}
            startIcon={isConnected ? <CheckCircleIcon /> : undefined}
          >
            {isConnected ? 'Bank Account Connected' : 'Connect Bank Account'}
          </Button>
        </Box>
      </Grid>

      {/* Right Section - Bank Account Display */}
      <Grid item xs={12} md={5}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
              Bank Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Account details
            </Typography>
            <IconButton sx={{ color: '#666' }}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          {/* Bank Account Card */}
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
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
              top: -30,
              right: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)'
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)'
            }} />
            
            {/* Card Content */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {bankData.bankName || 'Your Bank'}
                </Typography>
                <BankIcon sx={{ fontSize: 32 }} />
              </Box>
              
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                Account Holder
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {bankData.accountHolderName || 'Account Holder Name'}
              </Typography>
              
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                Account Number
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                ****{bankData.accountNumber.slice(-4) || '1234'}
              </Typography>
            </Box>
          </Card>

          {/* Account Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
              Available Balance
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
              $2,850.00
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
              Account Type
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
              {bankData.accountType || 'Checking Account'}
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            {/* Account Status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                Account Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                  Verified
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#4CAF50',
                color: '#4CAF50',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                flex: 1
              }}
            >
              Disconnect
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#4CAF50',
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                flex: 1,
                '&:hover': {
                  backgroundColor: '#45a049'
                }
              }}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BankAccount;