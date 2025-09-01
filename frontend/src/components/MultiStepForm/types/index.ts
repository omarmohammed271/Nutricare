import { CompleteFormData } from '../validation/schemas';

// Form step types and interfaces
export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

// Step information for stepper component
export interface StepInfo {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  component: React.ComponentType<StepProps>;
}

// Form state and context types
export interface MultiStepFormContextType {
  activeStep: number;
  totalSteps: number;
  formData: FormDataType;
  isStepValid: (stepIndex: number) => boolean;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateFormData: <T extends keyof FormDataType>(
    field: T,
    value: FormDataType[T]
  ) => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
}

// Form validation state
export interface ValidationState {
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Step validation status
export interface StepValidationStatus {
  [stepIndex: number]: boolean;
}

// Form submission response
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Error handling
export interface FormError {
  field: string;
  message: string;
  step: number;
}

// Custom hook types
export interface UseMultiStepFormOptions {
  initialStep?: number;
  onSubmit?: (data: CompleteFormData) => Promise<FormSubmissionResponse>;
  onStepChange?: (step: number) => void;
}

export interface UseMultiStepFormReturn {
  activeStep: number;
  formData: FormDataType;
  isStepValid: (stepIndex: number) => boolean;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateFormData: <T extends keyof FormDataType>(
    field: T,
    value: FormDataType[T]
  ) => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  validationState: ValidationState;
  resetForm: () => void;
}

// Component style props
export interface StyledComponentProps {
  active?: boolean;
  completed?: boolean;
  error?: boolean;
  disabled?: boolean;
}

// Step navigation controls
export interface StepNavigationProps {
  activeStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  isNextDisabled: boolean;
  isBackDisabled: boolean;
  isSubmitting: boolean;
  showSkipOption?: boolean;
  onSkip?: () => void;
}

// Progress indicator props
export interface ProgressIndicatorProps {
  activeStep: number;
  totalSteps: number;
  completedSteps: number[];
  stepLabels: string[];
}

// Combined form data type
export interface FormDataType {
  // Personal Information
  gender: string;
  country: string;
  dateOfBirth: string;
  mobilePhone: string;
  workplace: string;
  profession: string;
  licenseNumber?: string;
  
  // Professional Preferences
  lookingFor: string;
  casesHandle: string;
  clientsPerMonth: string;
  
  // Payment Information
  billingPeriod: 'monthly' | 'yearly';
  billedTo: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingCountry: string;
  zipCode: string;
  membershipType: 'monthly' | 'yearly';
}

// Re-export validation types
export type {
  PersonalInfoData,
  ProfessionalPreferencesData,
  PaymentInfoData,
  CompleteFormData,
} from '../validation/schemas';

// Default form data
export const defaultFormData = {
  // Personal Information
  gender: '',
  country: '',
  dateOfBirth: '',
  mobilePhone: '',
  workplace: '',
  profession: '',
  licenseNumber: '',
  
  // Professional Preferences
  lookingFor: '',
  casesHandle: '',
  clientsPerMonth: '',
  
  // Payment Information
  billingPeriod: 'monthly' as const,
  billedTo: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  billingCountry: '',
  zipCode: '',
  membershipType: 'yearly' as const,
} as const;

// Step configuration
export const STEP_LABELS = ['Personal Info', 'Professional Details', 'Payment'];
export const TOTAL_STEPS = 3;

// Payment plan types
export interface PaymentPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  recommended?: boolean;
  billingPeriod: 'monthly' | 'yearly';
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 56,
    yearlyPrice: 45, // 20% discount
    recommended: true,
    billingPeriod: 'yearly',
    features: [
      'Full Nutrition Assessment Tools',
      'Risk Assessments (NRS-2002, PG-SGA, MUST, MST)',
      'Smart Automated Calculations (All Age Groups & Clinical Cases)',
      'Auto-Generated ADIME Notes',
      'Growth Charts (Saudi, WHO, CDC)',
      'Client File Management & Structured Follow-Up',
      'Advanced Data Analysis & Progress Tracking',
      'Calendar Auto-Sync & Smart Reminders',
      'Access To Updated Clinical Guidelines',
    ],
  },
];

// Form field configurations for dynamic form generation
export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'radio' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required: boolean;
  validation?: any;
  helperText?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
}