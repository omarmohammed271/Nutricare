import { ApexOptions } from "apexcharts";

 export const series = [44, 55, 41, 17];
  
  
  export const donutOptions: ApexOptions = {
    series,
    chart: {
  height: 280,
  type: 'donut',
  animations: {
    enabled: true,
    easing: 'easeinout',
    speed: 800,
    animateGradually: {
      enabled: true,
      delay: 150
    },
    dynamicAnimation: {
      enabled: true,
      speed: 350
    }
  },},
    
   
    colors: ['#02BE6A', '#3FC6FC', '#FFB800' , '#6A7C92'],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      offsetX: 0,
      offsetY: 7,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + '%';
      },
      style: {
        fontSize: '14px',
        fontWeight: '600',
        colors: ['#ffffff']
      },
    },

    
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: '700',
              color: '#02BE6A',
              offsetY: 10,
              formatter: function (val: string) {
                return val + '%';
              },
            },

            
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
              formatter: function () {
                return '100%';
              },
            },
          },
        },
      },
    },
    stroke: {
      width: 2,
      colors: ['#fff'],
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + '%';
        },
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };






   export const macroData = [
    { name: 'Carbs', value: 35, calories: '1991/2228 kcal', color: '#4FC3F7' },
    { name: 'Protein', value: 25, calories: '1991/2228 kcal', color: '#FF8A65' },
    { name: 'Fat', value: 30, calories: '1991/2228 kcal', color: '#81C784' },
    { name: 'Fiber', value: 10, calories: '1991/2228 kcal', color: '#9575CD' }
  ];

  // Meal data for smaller charts
  export const mealData = [
    { name: 'Breakfast', data: [40, 30, 20, 10] },
    { name: 'Lunch', data: [35, 25, 25, 15] },
    { name: 'Dinner', data: [30, 35, 25, 10] }
  ];

  // Micronutrients data
   export const micronutrients = [
    { name: 'Calories', value: 99.5, unit: '/ 1000.0 mg', progress: 85 },
    { name: 'Calories', value: 99.5, unit: '/ 1000.0 mg', progress: 60 },
    { name: 'Calories', value: 99.5, unit: '/ 1000.0 mg', progress: 95 },
    { name: 'Calories', value: 99.5, unit: '/ 1000.0 mg', progress: 45 }
  ];

  // Base meal nutrition data (numeric values for calculations)
  const mealNutrients = [
    { meal: 'Breakfast', calories: 300, protein: 15, carbs: 30, fats: 10, supplements: 300 },
    { meal: 'Lunch', calories: 500, protein: 25, carbs: 50, fats: 15, supplements: 500 },
    { meal: 'Dinner', calories: 400, protein: 20, carbs: 40, fats: 12, supplements: 400 }
  ];

  // Calculate totals dynamically
  const totals = mealNutrients.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
      supplements: acc.supplements + meal.supplements
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0, supplements: 0 }
  );

  // Macronutrients table data with calculated totals
  export const macronutrientsTable = [
    ...mealNutrients.map(meal => ({
      meal: meal.meal,
      calories: `${meal.calories} kcal`,
      protein: `${meal.protein}g`,
      carbs: `${meal.carbs}g`,
      fats: `${meal.fats}g`,
      supplements: `${meal.supplements} kcal`
    })),
    {
      meal: 'Total',
      calories: `${totals.calories} kcal`,
      protein: `${totals.protein}g`,
      carbs: `${totals.carbs}g`,
      fats: `${totals.fats}g`,
      supplements: `${totals.supplements} kcal`
    }
  ];