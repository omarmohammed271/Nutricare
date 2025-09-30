import { LabResult } from './types';

export const sampleLabResults: LabResult[] = [
  {
    id: 1,
    test_name: 'Hemoglobin',
    result: '17.1',
    reference_range: '12-16 g/dL',
    interpretation: 'Iron deficiency or chronic disease',
    file: '',
    date: '2025-02-28'
  },
  {
    id: 2,
    test_name: 'Hemoglobin',
    result: '14.7',
    reference_range: '12-16 g/dL',
    interpretation: 'Ideal no deficiency found',
    file: '',
    date: '2025-02-28'
  },
  {
    id: 3,
    test_name: 'Hemoglobin',
    result: '10.2',
    reference_range: '12-16 g/dL',
    interpretation: 'Iron deficiency or chronic disease',
    file: '',
    date: '2025-02-28'
  }
];

export const commonTestNames = [
  'Fasting Glucose',
  'HbA1c',
  'Total Cholesterol',
  'HDL Cholesterol',
  'LDL Cholesterol',
  'Triglycerides',
  'Hemoglobin',
  'Hematocrit',
  'White Blood Cell Count',
  'Platelet Count',
  'Serum Creatinine',
  'Blood Urea Nitrogen',
  'Alanine Aminotransferase (ALT)',
  'Aspartate Aminotransferase (AST)',
  'Alkaline Phosphatase',
  'Total Bilirubin',
  'Albumin',
  'Total Protein',
  'Sodium',
  'Potassium',
  'Chloride',
  'Carbon Dioxide',
  'Calcium',
  'Phosphorus',
  'Magnesium',
  'Vitamin D',
  'Vitamin B12',
  'Folate',
  'Iron',
  'TIBC',
  'Ferritin'
];

export const recentTrendsNote = `Latest Assessment (Jan 15, 2024):
The patient shows elevated glucose levels (130 mg/dL) and HbA1c (7.2%), indicating suboptimal diabetes control. 
Lipid profile reveals borderline high cholesterol (220 mg/dL) and elevated LDL (140 mg/dL). 
Recommend dietary modifications focusing on carbohydrate restriction and increased fiber intake. 
Follow-up labs recommended in 3 months to monitor progress.`;