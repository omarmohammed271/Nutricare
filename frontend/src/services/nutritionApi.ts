import HttpClient from "@src/helpers/httpClient";

// Types for the API responses based on actual API structure
export interface DrugCategory {
  id: number;
  name: string;
  drugs: Drug[];
}

export interface Drug {
  id: number;
  name: string;
  drug_effect: string;
  nutritional_implications: string;
}

export interface DrugDetail extends Drug {
  // DrugDetail is the same as Drug since the API returns the same structure
}

// Mock data for development when API is not available
const mockDrugCategories: DrugCategory[] = [
  { 
    id: 1, 
    name: "Anticoagulants", 
    drugs: [
      { id: 1, name: "Warfarin", drug_effect: "Vitamin K rich foods", nutritional_implications: "Limit leafy greens" },
      { id: 2, name: "Aspirin", drug_effect: "Garlic, Ginger", nutritional_implications: "Monitor bleeding risk" }
    ]
  },
  { 
    id: 2, 
    name: "Antidiabetics", 
    drugs: [
      { id: 3, name: "Metformin", drug_effect: "Alcohol", nutritional_implications: "Avoid alcohol consumption" }
    ]
  },
  { 
    id: 3, 
    name: "Cardiovascular", 
    drugs: [
      { id: 4, name: "Digoxin", drug_effect: "High fiber foods", nutritional_implications: "Take with food" }
    ]
  },
  { 
    id: 4, 
    name: "Antibiotics", 
    drugs: [
      { id: 5, name: "Amoxicillin", drug_effect: "GI distress", nutritional_implications: "Take with food" }
    ]
  },
];

// API service functions with fallback to mock data
export const nutritionApi = {
  // Get all drug categories with their drugs - using the drugs endpoint
  getDrugCategories: async (): Promise<DrugCategory[]> => {
    try {
      const response = await HttpClient.get('/nutritions/drugs/');
      console.log('📂 API Response for drugs (categories):', response.data);
      
      // The API returns categories with nested drugs
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

  // Get drug details by ID - search through all categories from drugs endpoint
  getDrugDetails: async (id: number): Promise<DrugDetail> => {
    try {
      // First try the dedicated drug-details endpoint
      try {
        const response = await HttpClient.get(`/nutritions/drug-details/${id}`);
        console.log('💊 API Response for drug details:', response.data);
        return response.data;
      } catch (apiError) {
        // If drug-details endpoint fails, search through categories from drugs endpoint
        console.log('Drug-details endpoint failed, searching through drugs endpoint...');
        const categories = await nutritionApi.getDrugCategories();
        
        for (const category of categories) {
          if (category.drugs) {
            const drug = category.drugs.find(drug => drug.id === id);
            if (drug) {
              console.log('💊 Found drug in categories:', drug);
              return drug;
            }
          }
        }
        
        throw new Error('Drug not found in any category');
      }
    } catch (error: any) {
      console.warn('Error getting drug details:', error.message);
      // Fallback to mock data
      const allMockDrugs: Drug[] = [];
      mockDrugCategories.forEach(category => {
        if (category.drugs) {
          allMockDrugs.push(...category.drugs);
        }
      });
      
      const mockDrug = allMockDrugs.find(drug => drug.id === id);
      if (mockDrug) {
        return mockDrug;
      }
      throw new Error('Drug not found');
    }
  },

  // Get drugs by category ID - extract from drugs endpoint
  getDrugsByCategory: async (categoryId: number): Promise<Drug[]> => {
    try {
      // Get all categories with their drugs from drugs endpoint
      const categories = await nutritionApi.getDrugCategories();
      const category = categories.find(cat => cat.id === categoryId);
      
      if (category && category.drugs) {
        console.log('💊 Drugs for category:', category.drugs);
        return category.drugs;
      } else {
        console.warn('Category not found or has no drugs:', categoryId);
        return [];
      }
    } catch (error: any) {
      console.warn('Error getting drugs by category:', error.message);
      // Fallback to mock data
      const mockCategory = mockDrugCategories.find(cat => cat.id === categoryId);
      return mockCategory ? mockCategory.drugs : [];
    }
  },

  // Search drugs by name across all categories using drugs endpoint
  searchDrugs: async (query: string): Promise<Drug[]> => {
    try {
      // Get all categories with their drugs from drugs endpoint
      const categories = await nutritionApi.getDrugCategories();
      
      // Search through all drugs in all categories
      const allDrugs: Drug[] = [];
      categories.forEach(category => {
        if (category.drugs) {
          allDrugs.push(...category.drugs);
        }
      });
      
      // Filter drugs that match the search query
      const searchResults = allDrugs.filter(drug => 
        drug.name.toLowerCase().includes(query.toLowerCase()) ||
        drug.drug_effect.toLowerCase().includes(query.toLowerCase()) ||
        drug.nutritional_implications.toLowerCase().includes(query.toLowerCase())
      );
      
      console.log('🔍 Search results for query:', query, searchResults);
      return searchResults;
    } catch (error: any) {
      console.warn('Error searching drugs:', error.message);
      // Fallback to mock data search
      const allMockDrugs: Drug[] = [];
      mockDrugCategories.forEach(category => {
        if (category.drugs) {
          allMockDrugs.push(...category.drugs);
        }
      });
      
      return allMockDrugs.filter(drug => 
        drug.name.toLowerCase().includes(query.toLowerCase()) ||
        drug.drug_effect.toLowerCase().includes(query.toLowerCase()) ||
        drug.nutritional_implications.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
};

export default nutritionApi;
