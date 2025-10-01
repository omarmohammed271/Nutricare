// reports.mock.ts

export interface ReportMetric {
  label: string;
  value: number | string;
  description?: string;
}

export interface Diagnosis {
  type: 'Assessment' | 'Follow-Up';
  condition: string;
  count: number;
}

export interface VisitTimingMetric {
  label: string;
  value: string;
}

export const mockReportsData = {
  // Summary Metrics
  summaryMetrics: [
    {
      label: 'Assessment Cases',
      value: 32,
      description: 'Initial visits marked as "Assessment"',
    },
    {
      label: 'Follow-Up Cases',
      value: 189,
      description: 'Visits marked as "Follow-Up"',
    },
    {
      label: 'Avg Follow-Ups/Client',
      value: 32,
      description: 'Total follow-ups ÷ clients',
    },
    {
      label: 'Clients w/o 2nd Visit',
      value: 32,
      description: 'Only "NEW" visits recorded',
    },
  ] as ReportMetric[],

  // Diagnoses
  diagnoses: [
    {
      type: 'Assessment',
      condition: 'Diabetes Type 2',
      count: 10,
    },
    {
      type: 'Follow-Up',
      condition: 'Obesity Management',
      count: 10,
    },
    {
      type: 'Assessment',
      condition: 'Hypertension',
      count: 10,
    },
  ] as Diagnosis[],

  // Visit Timing Metrics
  visitTimingMetrics: [
    {
      label: 'Average Time Between Visits',
      value: '14.2 days',
    },
    {
      label: 'Shortest Interval',
      value: '3 days',
    },
    {
      label: 'Longest Interval',
      value: '45 days',
    },
  ] as VisitTimingMetric[],
};


export interface BmiDataItem {
  range: string;
  patients: number;
  avgWeight: string;
  color?: string;
  category?: string;
}

export const mockBmiData: BmiDataItem[] = [
  {
    range: "<18.5",
    patients: 12,
    avgWeight: "45.2kg",
    color: "#3B82F6", // Blue
    category: "Underweight"
  },
  {
    range: "18.5–24.9",
    patients: 156,
    avgWeight: "65.8kg",
    color: "#10B981", // Green
    category: "Healthy"
  },
  {
    range: "25–29.9",
    patients: 89,
    avgWeight: "78.4kg",
    color: "#34D399", // Light Green
    category: "Overweight"
  },
  {
    range: "30–34.9",
    patients: 67,
    avgWeight: "92.1kg",
    color: "#FBBF24", // Yellow
    category: "Obese I"
  },
  {
    range: "35–39.9",
    patients: 34,
    avgWeight: "105.7kg",
    color: "#F59E0B", // Orange
    category: "Obese II"
  },
  {
    range: "≥40",
    patients: 18,
    avgWeight: "125.3kg",
    color: "#6B7280", // Gray
    category: "Obese III"
  }
];



// Define the interface for a single health metric
interface HealthMetric {
  metric: string;
  value: number;
  subtitle: string;
}

// Mock data array
const healthMetrics: HealthMetric[] = [
  {
    metric: "Average BMI",
    value: 26.8,
    subtitle: "Across All Clients"
  },
  {
    metric: "Avg Muscle Mass %",
    value: 34.2,
    subtitle: "Lean Body Mass Development"
  },
  {
    metric: "Avg Body Fat %",
    value: 23.7,
    subtitle: "Overall Fat Percentage"
  }
];

// Optional: Export if using in a module
export { healthMetrics, type HealthMetric };


export interface dataBMICHARTint {
  name: string;
  count: number;
  color: string;
}

export const dataBMICHART = [
  { name: 'Underweight', count: 80, color: '#3B82F6' },     // Blue
  { name: 'Healthy', count: 120, color: '#10B981' },        // Green
  { name: 'Overweight', count: 90, color: '#34D399' },      // Light Green
  { name: 'Obese I', count: 60, color: '#FBBF24' },         // Yellow
  { name: 'Obese II', count: 40, color: '#F59E0B' },        // Orange
  { name: 'Obese III', count: 20, color: '#6B7280' },       // Gray
] as  dataBMICHARTint[]  ;







export const dataBMICHART2: dataBMICHARTint[] = [
  { name: 'Healthy', count: 120, color: '#10B981' },        // Green
  { name: 'Overweight', count: 90, color: '#34D399' },      // Light Green
  { name: 'Obese I', count: 60, color: '#FBBF24' },         // Yellow
 
]




export const macroData = [
  { name: 'Oral', value: 50, color: '#3B82F6' },  // Blue
  { name: 'NPO', value: 10, color: '#22C55E' }, 
   { name: 'Enteral', value: 30, color: '#A3E635' },       // Green
  { name: 'Parenteral ', value: 15, color: '#FFB44F' }           // Orange
]




 export const  AverageNutritionalPrescriptions = [
    {
      label: 'Minimum',
      value: '1200',
    },
    {
      label: 'Average',
      value: '1200',
    },
    {
      label: 'Maximum',
      value: '1200',
    },
  ] as VisitTimingMetric[]



  

 export interface GoalProps {
  title: string;
  value: string;
  subtitle: string;
}

// Mock data array
export const Goalmatrices: GoalProps[] = [
  {
    title: "100% Goal Achievement",
    value: "26.8",
    subtitle: "Clients reaching nutritional goals"
  },
  {
    title: "Avg Time to Goal",
    value: "34.2 days",
    subtitle: "Average days to reach targets"
  },
  {
    title: "Total EN Patients",
    value: "115" ,
    subtitle: "Currently on enteral nutrition"
  }
];



export const dataChartEternalFood: dataBMICHARTint[] = [
  { name: 'Standard', count: 90, color: '#10B981' },        // Green
  { name: 'High-Protein', count: 120, color: '#22C55E' },      // Light Green
  { name: 'Diabetic', count: 60, color: '#A3E635' },   
    { name: 'Renal', count: 40, color: '#FFB44F' },        // Yellow
   { name: 'Fats', count:  80, color: '#9F97F7' },  
]





 export const  GoalAchievementData = [
    {
      label: 'Achieved 100% Goals',
      value: '90 patients',
    },
    {
      label: 'Achieved 75-99% Goals',
      value: '90 patients',
    },
    {
      label: 'Achieved 50-74% Goals',
      value: '90 patients',
    },
        {
      label: 'Below 50% Goals',
      value: '90 patients',
    },
  ] as VisitTimingMetric[]