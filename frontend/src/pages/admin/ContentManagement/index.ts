export interface Equation {
  id: number;
  equation: string;
  name: string;
  input: string;
  units: string;
}

export interface Recipe {
  id: number;
  name: string;
  calories: string;
  publishedBy: string;
  request: "Approved" | "Rejected" | "Pending" | "";
}

export interface LibraryFile {
  id: number;
  name: string;
  type: string;
  category: string;
}

export interface Template {
  id: number;
  name: string;
  calories: string;
  category: string;
  active: boolean;
}

// =====================
// Dummy Data
// =====================
export const equations: Equation[] = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  name: "Body Mass Index (BMI)",
  equation: "Weight / H² (height in meter)",
  input: "Weight",
  units: "Kg/m²",
}));

export const recipes: Recipe[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: "Zesty Lemon Herb Chicken",
  calories: "330 kcal",
  publishedBy: i % 2 === 0 ? "By Admin" : "By Community",
  request: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Rejected" : "Pending",
}));

export const initialLibraryFiles: LibraryFile[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? "Healthy Diet" : `File ${i + 1}`,
  type: i === 0 ? "PDF" : "DOCX",
  category: i % 3 === 0 ? "Meal Plan" : i % 3 === 1 ? "Workout Plan" : "General",
}));

export const initialTemplates: Template[] = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  name: "Sample Content Name",
  calories: "1200 kcal",
  category: i % 3 === 0 ? "Meal Plan" : i % 3 === 1 ? "Workout Plan" : "General",
  active: true,
}));