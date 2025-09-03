export interface Recipe {
  id: string;
  recipeName: string;
  creatorName: string;
  image: string;
  numberOfPortions: number;
  finalWeight: number;
  tags: string[];
  nutritionData: {
    energy: number;
    carbs: number;
    protein: number;
    fat: number;
  };
}