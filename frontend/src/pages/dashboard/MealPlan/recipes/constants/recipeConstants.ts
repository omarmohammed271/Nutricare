// Constants and static data for recipe creation

import { AlignCenter } from "lucide-react";

export const TAG_OPTIONS = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Snack', value: 'snack' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Gluten-Free', value: 'gluten-free' },
  { label: 'Low-Carb', value: 'low-carb' },
  { label: 'High-Protein', value: 'high-protein' },
];

export const INITIAL_NUTRITION_DATA = {
  energy: 0,
  fat: 0,
  carbohydrates: 0,
  protein: 0,
  fiber: 0,
  macronutrients: [],
  micronutrients: [],
};

export const FORM_STYLES = {
  publishButton: {
    backgroundColor: '#22C55E',
    color: 'white',
    fontWeight: 600,
    px: 4,
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#16A34A',
    },
  },
  addButton: {
    alignItems:'center',
    backgroundColor: '#22C55E',
    color: 'white',
    minWidth: 40,
    width: 40,
    height: 40,
    borderRadius: 2,
    '&:hover': {
      backgroundColor: '#16A34A',
    },
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1F2937',
    mb: 3,
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    mb: 1,
  },
};