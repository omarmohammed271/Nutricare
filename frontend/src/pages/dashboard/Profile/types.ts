export interface ProfileFormData {
  fullName: string;
  email: string;
  profession: string;
  gender: 'Male' | 'Female' | 'Other';
  country: string;
  dateOfBirth: string;
  mobileNo: string;
  workplace: string;
  licenseNumber: string;
  additionalEmails: string[];
}

export interface ProfileProps {
  initialData?: Partial<ProfileFormData>;
  onSave?: (data: ProfileFormData) => void;
  onCancel?: () => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}