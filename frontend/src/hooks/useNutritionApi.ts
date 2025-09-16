import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { nutritionApi, DrugCategory, DrugDetail, Drug } from '@src/services/nutritionApi';

// Query keys for caching
export const nutritionQueryKeys = {
  drugCategories: ['nutrition', 'drug-categories'] as const,
  drugDetails: (id: number) => ['nutrition', 'drug-details', id] as const,
  drugsByCategory: (categoryId: number) => ['nutrition', 'drugs', 'category', categoryId] as const,
  searchDrugs: (query: string) => ['nutrition', 'drugs', 'search', query] as const,
};

// Hook to get all drug categories
export const useDrugCategories = (): UseQueryResult<DrugCategory[], Error> => {
  return useQuery({
    queryKey: nutritionQueryKeys.drugCategories,
    queryFn: () => nutritionApi.getDrugCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    retry: (failureCount, error: any) => {
      // Don't retry on 401 or 404 errors
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Hook to get drug details by ID
export const useDrugDetails = (id: number): UseQueryResult<DrugDetail, Error> => {
  return useQuery({
    queryKey: nutritionQueryKeys.drugDetails(id),
    queryFn: () => nutritionApi.getDrugDetails(id),
    enabled: !!id && id > 0, // Only run query if id is provided and valid
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    retry: (failureCount, error: any) => {
      // Don't retry on 401 or 404 errors
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Hook to get drugs by category
export const useDrugsByCategory = (categoryId: number): UseQueryResult<Drug[], Error> => {
  return useQuery({
    queryKey: nutritionQueryKeys.drugsByCategory(categoryId),
    queryFn: () => nutritionApi.getDrugsByCategory(categoryId),
    enabled: !!categoryId && categoryId > 0, // Only run query if categoryId is provided and valid
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    retry: (failureCount, error: any) => {
      // Don't retry on 401 or 404 errors
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

// Hook to search drugs
export const useSearchDrugs = (query: string): UseQueryResult<Drug[], Error> => {
  return useQuery({
    queryKey: nutritionQueryKeys.searchDrugs(query),
    queryFn: () => nutritionApi.searchDrugs(query),
    enabled: !!query && query.length > 2, // Only run query if query is meaningful
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000, // 5 minutes (renamed from cacheTime)
    retry: (failureCount, error: any) => {
      // Don't retry on 401 or 404 errors
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export default {
  useDrugCategories,
  useDrugDetails,
  useDrugsByCategory,
  useSearchDrugs,
};
