export const mealPlanStatisticsData = [
  {
    cardTitle: "Today's Calories",
    stats: "1,847",
    target: "2,200",
    change: "83%",
    variant: "success",
    chartSeries: [83, 17],
    colors: ["#4CAF50", "#E8F5E8"],
  },
  {
    cardTitle: "Protein Intake",
    stats: "127g",
    target: "150g",
    change: "85%",
    variant: "info",
    chartSeries: [85, 15],
    colors: ["#2196F3", "#E3F2FD"],
  },
  {
    cardTitle: "Water Intake",
    stats: "6.2L",
    target: "8L",
    change: "78%",
    variant: "warning",
    chartSeries: [78, 22],
    colors: ["#FF9800", "#FFF3E0"],
  },
  {
    cardTitle: "Meals Planned",
    stats: "21",
    target: "21",
    change: "100%",
    variant: "success",
    chartSeries: [100, 0],
    colors: ["#4CAF50", "#E8F5E8"],
  },
];

export const weeklyMealData = [
  {
    day: "Monday",
    date: "2024-01-15",
    meals: {
      breakfast: {
        name: "Oatmeal with Berries",
        calories: 320,
        protein: 12,
        carbs: 58,
        fat: 8,
        time: "08:00"
      },
      lunch: {
        name: "Grilled Chicken Salad",
        calories: 450,
        protein: 35,
        carbs: 25,
        fat: 20,
        time: "12:30"
      },
      dinner: {
        name: "Salmon with Quinoa",
        calories: 520,
        protein: 42,
        carbs: 35,
        fat: 22,
        time: "19:00"
      },
      snacks: [
        { name: "Greek Yogurt", calories: 120, time: "15:30" },
        { name: "Almonds", calories: 160, time: "21:00" }
      ]
    }
  },
  {
    day: "Tuesday",
    date: "2024-01-16",
    meals: {
      breakfast: {
        name: "Avocado Toast",
        calories: 380,
        protein: 15,
        carbs: 45,
        fat: 18,
        time: "08:15"
      },
      lunch: {
        name: "Turkey Wrap",
        calories: 420,
        protein: 28,
        carbs: 38,
        fat: 16,
        time: "12:45"
      },
      dinner: {
        name: "Vegetable Stir Fry",
        calories: 480,
        protein: 20,
        carbs: 55,
        fat: 18,
        time: "18:45"
      },
      snacks: [
        { name: "Protein Shake", calories: 140, time: "16:00" },
        { name: "Apple", calories: 80, time: "20:30" }
      ]
    }
  }
];

export const nutritionGoalsData = {
  daily: {
    calories: { current: 1847, target: 2200, unit: "kcal" },
    protein: { current: 127, target: 150, unit: "g" },
    carbs: { current: 185, target: 220, unit: "g" },
    fat: { current: 68, target: 85, unit: "g" },
    fiber: { current: 28, target: 35, unit: "g" },
    sugar: { current: 45, target: 50, unit: "g" }
  },
  weekly: {
    mealsPlanned: 21,
    mealsCompleted: 18,
    waterGoalsMet: 5,
    workoutsCompleted: 4
  }
};

export const recentMealsData = [
  {
    id: 1,
    name: "Grilled Chicken Breast",
    time: "2 hours ago",
    calories: 285,
    rating: 4.5,
    image: "/images/meals/chicken.jpg",
    tags: ["High Protein", "Low Carb"]
  },
  {
    id: 2,
    name: "Quinoa Buddha Bowl",
    time: "Yesterday",
    calories: 420,
    rating: 4.8,
    image: "/images/meals/buddha-bowl.jpg",
    tags: ["Vegan", "High Fiber"]
  },
  {
    id: 3,
    name: "Salmon with Sweet Potato",
    time: "2 days ago",
    calories: 485,
    rating: 4.6,
    image: "/images/meals/salmon.jpg",
    tags: ["Omega-3", "Balanced"]
  }
];