export interface BiochemicalTest {
  id: string;
  testName: string;
  result: string;
  referenceRange: string;
  unit: string;
  status: 'Normal' | 'High' | 'Low' | 'Critical';
  date: string;
  notes?: string;
}

export interface AddTestDialogState {
  open: boolean;
  testName: string;
  result: string;
  referenceRange: string;
  unit: string;
  date: string;
  notes: string;
}

export interface BiochemicalSummary {
  highValues: number;
  normalValues: number;
  lowValues: number;
  criticalValues: number;
}