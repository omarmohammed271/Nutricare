import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Camera as CameraIcon, 
  Add as AddIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import {
  CardPayment,
  BankAccount,
  GooglePay,
  PaymentMethodSelector
} from './components';
import type { CardData, BankAccountData, PaymentMethod } from './types/payment';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('/src/assets/images/default-avatar.jpg');
  const [addEmailDialog, setAddEmailDialog] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: '',
    expiration: '',
    cvc: '',
    country: ''
  });
  const [bankData, setBankData] = useState<BankAccountData>({
    accountHolderName: '',
    routingNumber: '',
    accountNumber: '',
    accountType: '',
    bankName: '',
    country: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: 'Alexa Rawles',
    email: 'alexarawles@gmail.com',
    profession: 'Nutritionist',
    gender: 'Female',
    country: 'United States',
    dateOfBirth: '1990-01-15',
    mobileNo: '+1 234 567 8900',
    workplace: 'NutriCare Health Center',
    licenseNumber: 'NC-2024-001',
    additionalEmails: ['alexarawles@gmail.com']
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save logic here
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data if needed
    setIsEditing(false);
  };

  const addEmailAddress = () => {
    setAddEmailDialog(true);
    setNewEmail('');
    setEmailError('');
  };

  const handleAddEmail = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newEmail) {
      setEmailError('Email is required');
      return;
    }
    if (!emailRegex.test(newEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (formData.additionalEmails.includes(newEmail)) {
      setEmailError('This email already exists');
      return;
    }

    // Add email to the list
    setFormData(prev => ({
      ...prev,
      additionalEmails: [...prev.additionalEmails, newEmail]
    }));
    setAddEmailDialog(false);
    setNewEmail('');
    setEmailError('');
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setFormData(prev => ({
      ...prev,
      additionalEmails: prev.additionalEmails.filter(email => email !== emailToDelete)
    }));
  };

  const handleCloseEmailDialog = () => {
    setAddEmailDialog(false);
    setNewEmail('');
    setEmailError('');
  };

  const handleCardInputChange = (field: string, value: string) => {
    setCardData((prev: CardData) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBankInputChange = (field: string, value: string) => {
    setBankData((prev: BankAccountData) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayment = () => {
    console.log('Processing payment with card data:', cardData);
  };

  const handleBankConnect = () => {
    console.log('Connecting bank account:', bankData);
  };

  const handleGooglePayConnect = () => {
    console.log('Connecting Google Pay');
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#2E7D32', mb: 1 }}>
          My Profile
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              minWidth: 'auto',
              px: 3,
              py: 1.5,
              borderRadius: '8px',
              mr: 1,
              color: '#666',
              backgroundColor: 'transparent',
              border: '1px solid #E0E0E0',
              '&.Mui-selected': {
                color: 'white',
                backgroundColor: '#4CAF50',
                border: '1px solid #02BE6A'
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab label="My Profile" />
          <Tab label="Payment Setup" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <Card sx={{ borderRadius: 1,  backgroundColor: '#FFFFFF' }}>
          {/* Header with blue background */}
          <Box 
            sx={{ 
              height: 120, 
              background: 'linear-gradient( 90deg, #d0e8ff 40%,rgba(218, 185, 228, 0.41) , #fff9d5 60%)',
              borderRadius: '12px 12px 0 0',
              position: 'relative'
            }} 
          />
          
          <CardContent sx={{ p: 4, mt: -6, position: 'relative' }}>
            {/* Profile Section */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={profileImage}
                    sx={{ 
                      width: 120, 
                      height: 120,
                      border: '4px solid white',
                      boxShadow: 2,
                      cursor: isEditing ? 'pointer' : 'default'
                    }}
                    onClick={handleImageClick}
                  />
                  {isEditing && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        width: 32,
                        height: 32,
                        '&:hover': {
                          backgroundColor: '#45a049'
                        }
                      }}
                      onClick={handleImageClick}
                    >
                      <CameraIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
                    {formData.fullName}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    {formData.email}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant={isEditing ? "outlined" : "contained"}
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{
                  backgroundColor: isEditing ? 'transparent' : '#4CAF50',
                  color: isEditing ? '#4CAF50' : 'white',
                  borderColor: '#4CAF50',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: isEditing ? '#F5F5F5' : '#45a049'
                  }
                }}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </Box>

            {/* Form Fields */}
            <Grid container spacing={3}>
              {/* Full Name */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 500, color: '#333' }}>
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your First Name"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        '&.Mui-disabled': {
                          backgroundColor: '#F5F5F5'
                        }
                      }
                    }}
                  />
                </Box>
              </Grid>

              {/* Profession */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 500, color: '#333' }}>
                    Profession
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your Profession"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        '&.Mui-disabled': {
                          backgroundColor: '#F5F5F5'
                        }
                      }
                    }}
                  />
                </Box>
              </Grid>

              {/* Gender */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 500, color: '#333' }}>
                    Gender
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      disabled={!isEditing}
                      displayEmpty
                      sx={{
                        backgroundColor: '#FFFFFF',
                        '&.Mui-disabled': {
                          backgroundColor: '#F5F5F5'
                        }
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              {/* Country */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 500, color: '#333' }}>
                    Country
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      disabled={!isEditing}
                      displayEmpty
                      sx={{
                        backgroundColor: '#FFFFFF',
                        '&.Mui-disabled': {
                          backgroundColor: '#F5F5F5'
                        }
                      }}
                    >
                      <MenuItem value="United States">United States</MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                      <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 500, color: '#333' }}>
                    Date of Birth
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        '&.Mui-disabled': {
                          backgroundColor: '#F5F5F5'
                        }
                      }
                    }}
                  />
                </Box>
              </Grid>

              {/* Mobile No */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 500, color: '#333' }}>
                    Mobile no
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.mobileNo}
                    onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your Mobile Number"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        '&.Mui-disabled': {
                          backgroundColor: '#F5F5F5'
                        }
                      }
                    }}
                  />
                </Box>
              </Grid>

              {/* Workplace */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 500, color: '#333' }}>
                    Workplace
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.workplace}
                    onChange={(e) => handleInputChange('workplace', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your Workplace"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        '&.Mui-disabled': {
                          backgroundColor: '#F5F5F5'
                        }
                      }
                    }}
                  />
                </Box>
              </Grid>

              {/* License Number */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ minWidth: '100px', fontWeight: 500, color: '#333' }}>
                    License Number
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your License Number"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF',
                        '&.Mui-disabled': {
                          backgroundColor: '#F5F5F5'
                        }
                      }
                    }}
                  />
                </Box>
              </Grid>

              {/* Email Addresses Section */}
              <Grid item xs={12}>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                    My email Address
                  </Typography>
                  
                  {formData.additionalEmails.map((email, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #E0E0E0', borderRadius: 2, backgroundColor: '#F9F9F9' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                          <Box 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              borderRadius: '50%', 
                              backgroundColor: '#4CAF50',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '14px'
                            }}
                          >
                            @
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 500, color: '#333' }}>
                              {email}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#999' }}>
                              1 month ago
                            </Typography>
                          </Box>
                        </Box>
                        {isEditing && (
                          <IconButton
                            onClick={() => handleDeleteEmail(email)}
                            sx={{ 
                              color: '#f44336',
                              '&:hover': {
                                backgroundColor: 'rgba(244, 67, 54, 0.1)'
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  ))}
                  
                  {isEditing && (
                    <Button
                      startIcon={<AddIcon />}
                      onClick={addEmailAddress}
                      sx={{
                        color: '#4CAF50',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)'
                        }
                      }}
                    >
                      +Add Email Address
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    borderColor: '#E0E0E0',
                    color: '#666',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#45a049'
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card sx={{ borderRadius: 3, boxShadow: 2, backgroundColor: '#FFFFFF' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                  Select Payment Method To Get Paid
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Choose your preferred payment method to receive payments securely.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{
                  borderColor: '#E0E0E0',
                  color: '#666',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3
                }}
              >
                Add Payment Method
              </Button>
            </Box>

            {/* Payment Method Selector */}
            <PaymentMethodSelector
              selectedMethod={selectedPaymentMethod}
              onMethodSelect={handlePaymentMethodSelect}
            />

            {/* Payment Method Forms */}
            {selectedPaymentMethod === 'card' && (
              <CardPayment
                cardData={cardData}
                onCardInputChange={handleCardInputChange}
                onPayment={handlePayment}
              />
            )}

            {selectedPaymentMethod === 'bank' && (
              <BankAccount
                bankData={bankData}
                onBankInputChange={handleBankInputChange}
                onConnect={handleBankConnect}
              />
            )}

            {selectedPaymentMethod === 'google' && (
              <GooglePay onConnect={handleGooglePayConnect} />
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Add Email Dialog */}
      <Dialog 
        open={addEmailDialog} 
        onClose={handleCloseEmailDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 2
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Add Email Address
          </Typography>
          <IconButton 
            onClick={handleCloseEmailDialog}
            sx={{ 
              color: '#666',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pb: 1 }}>
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            Enter the email address you want to add to your profile.
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            error={!!emailError}
            helperText={emailError}
            placeholder="example@domain.com"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseEmailDialog}
            sx={{
              color: '#666',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddEmail}
            variant="contained"
            sx={{
              backgroundColor: '#4CAF50',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                backgroundColor: '#45a049'
              }
            }}
          >
            Add Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;