import React from 'react';
import MultiStepFormContainer from './MultiStepFormContainer';

/**
 * Clean, refactored MultiStepForm component with:
 * - Proper step flow: Personal Info -> Professional Preferences -> Payment
 * - Yup validation with comprehensive schema validation
 * - Clean code architecture with separated concerns
 * - Type-safe TypeScript interfaces
 * - Custom hooks for state management
 * - Modular component structure
 * - Error handling and user feedback
 * - Responsive design following project guidelines
 * 
 * Step Flow:
 * 1. Personal Information (demographics, contact info, profession)
 * 2. Professional Preferences (services needed, case types, client volume)
 * 3. Payment Information (billing, card details, subscription type)
 */
export default function MultiStepForm() {
  return <MultiStepFormContainer />;
}

