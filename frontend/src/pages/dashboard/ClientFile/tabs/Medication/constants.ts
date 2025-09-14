import { Medication as MedicationInterface } from './types';

export const sampleMedications: MedicationInterface[] = [
  {
    id: '1',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    route: 'Oral',
    startDate: '2024-01-01',
    prescribedBy: 'Dr. Johnson',
    indication: 'Type 2 Diabetes',
    status: 'Active',
    notes: 'Take with meals to reduce GI upset',
    interactions: ['Alcohol', 'Contrast agents'],
    sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste']
  },
  {
    id: '2',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    route: 'Oral',
    startDate: '2024-01-01',
    prescribedBy: 'Dr. Johnson',
    indication: 'Hypertension',
    status: 'Active',
    notes: 'Monitor blood pressure regularly',
    interactions: ['NSAIDs', 'Potassium supplements'],
    sideEffects: ['Dry cough', 'Dizziness', 'Hyperkalemia']
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    route: 'Oral',
    startDate: '2024-01-15',
    prescribedBy: 'Dr. Johnson',
    indication: 'High Cholesterol',
    status: 'Active',
    notes: 'Monitor liver function tests',
    interactions: ['Grapefruit juice', 'Warfarin'],
    sideEffects: ['Muscle pain', 'Liver enzyme elevation', 'Headache']
  },
  {
    id: '4',
    name: 'Omeprazole',
    dosage: '20mg',
    frequency: 'Once daily before breakfast',
    route: 'Oral',
    startDate: '2023-12-01',
    endDate: '2024-02-01',
    prescribedBy: 'Dr. Smith',
    indication: 'GERD',
    status: 'Completed',
    notes: 'Short-term use for gastric protection'
  }
];

export const medicationOptions = [
  'Metformin', 'Lisinopril', 'Atorvastatin', 'Omeprazole', 'Aspirin', 
  'Insulin', 'Furosemide', 'Levothyroxine', 'Amlodipine', 'Warfarin',
  'Simvastatin', 'Hydrochlorothiazide', 'Losartan', 'Albuterol', 'Prednisone'
];

export const frequencyOptions = [
  'Once daily', 'Twice daily', 'Three times daily', 'Four times daily',
  'Every 8 hours', 'Every 12 hours', 'As needed', 'Weekly', 'Monthly'
];

export const routeOptions = [
  'Oral', 'Intravenous', 'Intramuscular', 'Subcutaneous', 
  'Topical', 'Inhalation', 'Rectal', 'Sublingual'
];

export const medicationNotes = {
  importantNotes: `Important Notes:
• Metformin should be taken with meals to reduce gastrointestinal side effects
• Monitor blood pressure regularly while on Lisinopril therapy
• Atorvastatin may cause muscle pain - report any unusual muscle symptoms
• Avoid grapefruit juice while taking Atorvastatin
• Regular liver function monitoring required for statin therapy`,

  adherenceRecommendations: `Patient shows good medication adherence. Continue current regimen with regular monitoring. 
Next medication review scheduled for March 15, 2024.`
};

export const interactionAlerts = {
  hasInteractions: true,
  message: `Potential interactions detected between Metformin and alcohol, Lisinopril and NSAIDs. 
Please review with prescribing physician.`
};