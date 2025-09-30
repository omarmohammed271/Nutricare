// Internal form state for dialog
export interface AddTestDialogState {
  open: boolean;
  test_name: string;
  result: string;
  reference_range: string;
  interpretation: string;
  file: File | null;
  date: string;
}

export interface BiochemicalSummary {
  highValues: number;
  normalValues: number;
  lowValues: number;
  criticalValues: number;
}