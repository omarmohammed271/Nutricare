export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  indication: string;
  status: 'Active' | 'Discontinued' | 'On Hold' | 'Completed';
  notes?: string;
  interactions?: string[];
  sideEffects?: string[];
}

export interface AddMedicationDialogState {
  open: boolean;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate: string;
  prescribedBy: string;
  indication: string;
  notes: string;
}

export interface MedicationSummary {
  activeMedications: number;
  drugInteractions: number;
  completed: number;
  discontinued: number;
}