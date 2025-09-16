import HttpClient from "@src/helpers/httpClient";

// Types for the API responses based on actual API structure
export interface DrugCategory {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Drug {
  id: number;
  name: string;
  drug_effect: string;
  nutritional_implications: string;
  category: {
    id: number;
    name: string;
  };
}

export interface DrugDetail extends Drug {
  // DrugDetail is the same as Drug since the API returns the same structure
}

// Mock data for development when API is not available
const mockDrugCategories: DrugCategory[] = [
  { id: 1, name: "Anticoagulants", description: "Blood thinning medications" },
  { id: 2, name: "Antidiabetics", description: "Diabetes management medications" },
  { id: 3, name: "Cardiovascular", description: "Heart and blood vessel medications" },
  { id: 4, name: "Antibiotics", description: "Infection fighting medications" },
];

const mockDrugs: Drug[] = [
  { 
    id: 1, 
    name: "Warfarin", 
    drug_effect: "Vitamin K rich foods", 
    nutritional_implications: "Limit leafy greens",
    category: { id: 1, name: "Anticoagulants" }
  },
  { 
    id: 2, 
    name: "Aspirin", 
    drug_effect: "Garlic, Ginger", 
    nutritional_implications: "Monitor bleeding risk",
    category: { id: 1, name: "Anticoagulants" }
  },
  { 
    id: 3, 
    name: "Metformin", 
    drug_effect: "Alcohol", 
    nutritional_implications: "Avoid alcohol consumption",
    category: { id: 2, name: "Antidiabetics" }
  },
  { 
    id: 4, 
    name: "Digoxin", 
    drug_effect: "High fiber foods", 
    nutritional_implications: "Take with food",
    category: { id: 3, name: "Cardiovascular" }
  },
];

// API service functions with fallback to mock data
export const nutritionApi = {
  // Get all drug categories - using the drug-categories endpoint
  getDrugCategories: async (): Promise<DrugCategory[]> => {
    try {
      const response = await HttpClient.get('/nutritions/drug-categories/');
      console.log('📂 API Response for categories:', response.data);
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      } else if (response.data && Array.isArray(response.data.categories)) {
        return response.data.categories;
      } else {
        console.warn('Unexpected API response structure:', response.data);
        return mockDrugCategories;
      }
    } catch (error: any) {
      console.warn('Nutrition API not available, using mock data:', error.message);
      return mockDrugCategories;
    }
  },

  // Get drug details by ID - using the drug-details endpoint (no trailing slash)
  getDrugDetails: async (id: number): Promise<DrugDetail> => {
    try {
      const response = await HttpClient.get(`/nutritions/drug-details/${id}`);
      console.log('💊 API Response for drug details:', response.data);
      return response.data;
    } catch (error: any) {
      console.warn('Nutrition API not available, using mock data:', error.message);
      const mockDrug = mockDrugs.find(drug => drug.id === id);
      if (mockDrug) {
        return mockDrug;
      }
      throw new Error('Drug not found');
    }
  },

  // Get drugs by category ID - no trailing slash
  getDrugsByCategory: async (categoryId: number): Promise<Drug[]> => {
    try {
      const response = await HttpClient.get(`/nutritions/drugs/${categoryId}`);
      console.log('💊 API Response for drugs by category:', response.data);
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      } else if (response.data && Array.isArray(response.data.drugs)) {
        return response.data.drugs;
      } else {
        console.warn('Unexpected API response structure for drugs:', response.data);
        return mockDrugs.filter(drug => drug.category.id === categoryId);
      }
    } catch (error: any) {
      console.warn('Nutrition API not available, using mock data:', error.message);
      return mockDrugs.filter(drug => drug.category.id === categoryId);
    }
  },

  // Search drugs by name (if the API supports it)
  searchDrugs: async (query: string): Promise<Drug[]> => {
    try {
      const response = await HttpClient.get(`/nutritions/drugs/?search=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      console.warn('Nutrition API not available, using mock data:', error.message);
      return mockDrugs.filter(drug => 
        drug.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
};

export default nutritionApi;
