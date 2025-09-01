import * as yup from 'yup';

// Step 1: Personal Information Validation
export const personalInfoSchema = yup.object({
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other', 'prefer-not-to-say'], 'Please select a valid gender'),
  
  country: yup
    .string()
    .required('Country is required')
    .min(2, 'Country name must be at least 2 characters'),
  
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .test('age', 'You must be at least 18 years old', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
  
  mobilePhone: yup
    .string()
    .required('Mobile phone is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  
  workplace: yup
    .string()
    .required('Workplace is required')
    .min(2, 'Workplace must be at least 2 characters'),
  
  profession: yup
    .string()
    .required('Profession is required')
    .min(2, 'Profession must be at least 2 characters'),
  
  licenseNumber: yup
    .string()
    .optional()
    .when('profession', {
      is: (profession: string) => profession?.toLowerCase().includes('doctor') || profession?.toLowerCase().includes('nurse'),
      then: (schema) => schema.required('License number is required for medical professionals'),
      otherwise: (schema) => schema.optional(),
    }),
});

// Step 2: Professional Preferences Validation
export const professionalPreferencesSchema = yup.object({
  lookingFor: yup
    .string()
    .required('Please select what you are looking for')
    .oneOf(
      ['assessment', 'planning', 'tracking', 'education'],
      'Please select a valid option'
    ),
  
  casesHandle: yup
    .string()
    .required('Please select the types of cases you handle')
    .oneOf(
      ['weight-management', 'diabetes', 'sports-nutrition', 'clinical-nutrition'],
      'Please select a valid case type'
    ),
  
  clientsPerMonth: yup
    .string()
    .required('Please select your average number of clients per month')
    .oneOf(
      ['No clients', 'Up to 10', 'Up to 25', 'More than 25'],
      'Please select a valid option'
    ),
});

// Step 3: Payment Information Validation
export const paymentInfoSchema = yup.object({
  billingPeriod: yup
    .string()
    .required('Please select a billing period')
    .oneOf(['monthly', 'yearly'], 'Please select monthly or yearly billing'),
  
  billedTo: yup
    .string()
    .required('Billing name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^[0-9\s]{13,19}$/, 'Please enter a valid card number')
    .test('luhn', 'Please enter a valid card number', function(value) {
      if (!value) return false;
      
      // Luhn algorithm for credit card validation
      const cleanValue = value.replace(/\s/g, '');
      let sum = 0;
      let isEven = false;
      
      for (let i = cleanValue.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanValue.charAt(i), 10);
        
        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        
        sum += digit;
        isEven = !isEven;
      }
      
      return sum % 10 === 0;
    }),
  
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Please enter a valid expiry date (MM/YY)')
    .test('not-expired', 'Card has expired', function(value) {
      if (!value) return false;
      
      const [month, year] = value.split('/');
      const expiry = new Date(2000 + parseInt(year, 10), parseInt(month, 10) - 1);
      const today = new Date();
      today.setDate(1); // Set to first day of current month
      
      return expiry >= today;
    }),
  
  cvv: yup
    .string()
    .required('CVV is required')
    .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
  
  billingCountry: yup
    .string()
    .required('Billing country is required')
    .min(2, 'Country name must be at least 2 characters'),
  
  zipCode: yup
    .string()
    .required('Zip code is required')
    .matches(/^[0-9]{5}(-[0-9]{4})?$/, 'Please enter a valid zip code'),
  
  membershipType: yup
    .string()
    .required('Please select a membership type')
    .oneOf(['monthly', 'yearly'], 'Please select monthly or yearly membership'),
});

// Combined schema for complete form validation
export const completeFormSchema = yup.object({
  ...personalInfoSchema.fields,
  ...professionalPreferencesSchema.fields,
  ...paymentInfoSchema.fields,
});

// Step-specific validation schemas array for easy access
export const stepSchemas = [
  personalInfoSchema,
  professionalPreferencesSchema,
  paymentInfoSchema,
];

export type PersonalInfoData = yup.InferType<typeof personalInfoSchema>;
export type ProfessionalPreferencesData = yup.InferType<typeof professionalPreferencesSchema>;
export type PaymentInfoData = yup.InferType<typeof paymentInfoSchema>;
export type CompleteFormData = yup.InferType<typeof completeFormSchema>;