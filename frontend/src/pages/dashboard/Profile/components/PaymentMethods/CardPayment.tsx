import React from 'react';
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
  IconButton
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

interface CardData {
  cardNumber: string;
  expiration: string;
  cvc: string;
  country: string;
}

interface CardPaymentProps {
  cardData: CardData;
  onCardInputChange: (field: string, value: string) => void;
  onPayment: () => void;
}

const CardPayment: React.FC<CardPaymentProps> = ({
  cardData,
  onCardInputChange,
  onPayment
}) => {
  return (
    <Grid container spacing={4}>
      {/* Left Section - Card Form */}
      <Grid item xs={12} md={7}>
        <Box>
          {/* Card Number */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
              Card number
            </Typography>
            <TextField
              fullWidth
              value={cardData.cardNumber}
              onChange={(e) => onCardInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box sx={{ width: 24, height: 16, backgroundColor: '#EB001B', borderRadius: 0.5 }} />
                    <Box sx={{ width: 24, height: 16, backgroundColor: '#1A1F71', borderRadius: 0.5 }} />
                    <Box sx={{ width: 24, height: 16, backgroundColor: '#4CAF50', borderRadius: 0.5 }} />
                    <Box sx={{ width: 24, height: 16, backgroundColor: '#FF6900', borderRadius: 0.5 }} />
                  </Box>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF'
                }
              }}
            />
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Expiration */}
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Expiration
              </Typography>
              <TextField
                fullWidth
                value={cardData.expiration}
                onChange={(e) => onCardInputChange('expiration', e.target.value)}
                placeholder="MM/YY"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF'
                  }
                }}
              />
            </Grid>
            {/* CVC */}
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                CVC
              </Typography>
              <TextField
                fullWidth
                value={cardData.cvc}
                onChange={(e) => onCardInputChange('cvc', e.target.value)}
                placeholder="123"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF'
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Country */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
              Country
            </Typography>
            <FormControl fullWidth>
              <Select
                value={cardData.country}
                onChange={(e) => onCardInputChange('country', e.target.value)}
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

          {/* Pay Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={onPayment}
            sx={{
              backgroundColor: '#4CAF50',
              color: 'white',
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#45a049'
              }
            }}
          >
            Pay $9.99
          </Button>
        </Box>
      </Grid>

      {/* Right Section - Credit Card Display */}
      <Grid item xs={12} md={5}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
              Credit Card
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Wallet section
            </Typography>
            <IconButton sx={{ color: '#666' }}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          {/* Credit Card */}
          <Card sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
              top: -20,
              right: -20,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(76, 175, 80, 0.3)'
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: -50,
              right: 50,
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)'
            }} />
            
            {/* Card Content */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                VISA
              </Typography>
              
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                Card Number
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, letterSpacing: 2 }}>
                {cardData.cardNumber || '5783 4160 8526 3149'}
              </Typography>
              
              {/* Card Icon */}
              <Box sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 40,
                height: 32,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CreditCardIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
            </Box>
          </Card>

          {/* Balance Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
              Balance
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
              $1,400.00
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
              Currency
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
              US Dollar
            </Typography>
            
            {/* Deactivate Card Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                Deactivate card
              </Typography>
              <Box sx={{
                width: 48,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#4CAF50',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <Box sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  transition: 'all 0.3s ease'
                }} />
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
              Cancel
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
              Update
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardPayment;