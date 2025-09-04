import React from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

import { PaymentMethod } from '../../types/payment';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodSelect: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodSelect
}) => {
  const paymentMethods: Array<{
    id: PaymentMethod;
    label: string;
    icon: React.ComponentType<any> | (() => JSX.Element);
    description: string;
  }> = [
    {
      id: 'card',
      label: 'Card',
      icon: CreditCardIcon,
      description: 'Credit or Debit Card'
    },
    {
      id: 'bank',
      label: 'Bank Account',
      icon: BankIcon,
      description: 'Direct Bank Transfer'
    },
    {
      id: 'google',
      label: 'Google Pay',
      icon: () => (
        <Box sx={{ 
          width: 32, 
          height: 32, 
          borderRadius: '50%', 
          backgroundColor: '#4285F4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: 600
        }}>
          G
        </Box>
      ),
      description: 'Google Wallet'
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
          Account/Wallet Type
        </Typography>
        <Typography variant="body2" sx={{ color: '#999' }}>
          Wallet for sending/receiving payments
        </Typography>
        <IconButton sx={{ color: '#666' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Payment Method Options */}
      <Grid container spacing={2}>
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          return (
            <Grid item xs={4} key={method.id}>
              <Card 
                sx={{ 
                  p: 2, 
                  cursor: 'pointer',
                  border: selectedMethod === method.id ? '2px solid #4CAF50' : '1px solid #E0E0E0',
                  backgroundColor: selectedMethod === method.id ? '#E8F5E8' : 'white',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => onMethodSelect(method.id as PaymentMethod)}
              >
                <Box sx={{ textAlign: 'center' }}>
                  {typeof IconComponent === 'function' && IconComponent.length === 0 ? (
                    <IconComponent />
                  ) : (
                    React.createElement(IconComponent as React.ComponentType<any>, {
                      sx: { 
                        fontSize: 32, 
                        color: selectedMethod === method.id ? '#4CAF50' : '#666', 
                        mb: 1 
                      }
                    })
                  )}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: selectedMethod === method.id ? 600 : 500,
                      color: selectedMethod === method.id ? '#4CAF50' : '#333',
                      mb: 0.5
                    }}
                  >
                    {method.label}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#666',
                      display: 'block'
                    }}
                  >
                    {method.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PaymentMethodSelector;