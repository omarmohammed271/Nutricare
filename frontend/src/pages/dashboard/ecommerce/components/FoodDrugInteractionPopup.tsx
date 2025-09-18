import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  TextField,
  IconButton,
  Autocomplete,
  useTheme,
  CircularProgress,
  Alert,
  InputAdornment
} from "@mui/material";
import { LuX, LuChevronDown, LuSearch, LuXCircle } from "react-icons/lu";
import { useState, useMemo, useEffect } from "react";
import { useDrugCategories, useDrugsByCategory, useDrugDetails, useSearchDrugs } from "@src/hooks/useNutritionApi";
import { Drug, DrugCategory, DrugDetail } from "@src/services/nutritionApi";

// Extended drug interface with category information
interface DrugWithCategory extends Drug {
  categoryName: string;
  categoryId: number;
  groupBy: string;
}

interface FoodDrugInteractionPopupProps {
  open: boolean;
  onClose: () => void;
}

const FoodDrugInteractionPopup = ({ open, onClose }: FoodDrugInteractionPopupProps) => {
  const theme = useTheme();
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch drug categories - only when dialog is open
  const { 
    data: drugCategoriesData, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useDrugCategories();

  // Ensure drugCategories is always an array
  const drugCategories = Array.isArray(drugCategoriesData) ? drugCategoriesData : [];

  // Search drugs across all categories when search query is provided
  // Only trigger API search when search button is clicked
  const { 
    data: searchResults, 
    isLoading: searchLoading, 
    error: searchError 
  } = useSearchDrugs(searchQuery);

  // Create a flat list of all drugs with category information
  const allDrugsWithCategory = useMemo(() => {
    const drugs: DrugWithCategory[] = [];
    
    drugCategories.forEach(category => {
      if (category.drugs && Array.isArray(category.drugs)) {
        category.drugs.forEach(drug => {
          drugs.push({
            ...drug,
            categoryName: category.name,
            categoryId: category.id,
            groupBy: category.name
          });
        });
      }
    });
    
    return drugs;
  }, [drugCategories]);

  // Always show all drugs, but filter them when searching
  const availableDrugs = useMemo(() => {
    if (searchQuery && searchQuery.length > 0) {
      // First try the API search if we have results
      if (searchResults && searchResults.length > 0) {
        console.log('🔍 Using API search results:', searchResults.length);
        return searchResults.map((drug: Drug) => ({
          ...drug,
          categoryName: 'Search Result',
          categoryId: 0,
          groupBy: 'Search Results'
        })) as DrugWithCategory[];
      } else {
        // Fallback to local search if API search returns no results or is still loading
        console.log('🔍 Using local search, query:', searchQuery);
        console.log('🔍 Available categories:', drugCategories.map(cat => cat.name));
        
        const filteredDrugs = allDrugsWithCategory.filter(drug => {
          const searchTerm = searchQuery.toLowerCase().trim();
          const drugNameMatch = drug.name.toLowerCase().includes(searchTerm);
          const categoryNameMatch = drug.categoryName.toLowerCase().includes(searchTerm);
          
          // Also check for partial matches with common words
          const categoryWords = drug.categoryName.toLowerCase().split(/[\s:]+/);
          const searchWords = searchTerm.split(/[\s:]+/);
          const partialCategoryMatch = searchWords.some(searchWord => 
            searchWord.length > 2 && categoryWords.some(catWord => 
              catWord.includes(searchWord) || searchWord.includes(catWord)
            )
          );
          
          const isMatch = drugNameMatch || categoryNameMatch || partialCategoryMatch;
          
          if (isMatch) {
            console.log('🔍 Match found:', {
              drug: drug.name,
              category: drug.categoryName,
              drugMatch: drugNameMatch,
              categoryMatch: categoryNameMatch,
              partialMatch: partialCategoryMatch,
              searchTerm: searchTerm
            });
          }
          
          return isMatch;
        });
        
        console.log('🔍 Local search results:', filteredDrugs.length);
        console.log('🔍 Filtered drugs:', filteredDrugs.map(d => ({ name: d.name, category: d.categoryName })));
        return filteredDrugs;
      }
    }
    console.log('🔍 Using all drugs, no search query');
    return allDrugsWithCategory;
  }, [searchQuery, searchResults, allDrugsWithCategory]);

  // Fetch drug details when a drug is selected - only when drug is selected and valid
  const { 
    data: drugDetails, 
    isLoading: detailsLoading, 
    error: detailsError 
  } = useDrugDetails(selectedDrug?.id || 0);

  // Prepare drugs for autocomplete options with grouped display
  const allDrugs = useMemo(() => {
    console.log('🔍 Available drugs for mapping:', availableDrugs.length);
    console.log('🔍 Available drugs sample:', availableDrugs.slice(0, 2));
    
    // Use the drugs directly without adding extra properties
    const drugs = availableDrugs.map((drug: DrugWithCategory) => {
      return {
        ...drug,
        // Ensure we have the required properties
        name: drug.name || 'Unknown Drug',
        id: drug.id || 0,
        categoryName: drug.categoryName || 'Other',
        groupBy: drug.categoryName || 'Other'
      } as DrugWithCategory;
    });
    
    console.log('🔍 Prepared drugs for autocomplete:', drugs.length);
    console.log('🔍 Sample drug:', drugs[0]);
    console.log('🔍 All drugs structure check:', {
      isArray: Array.isArray(drugs),
      length: drugs.length,
      hasName: drugs.length > 0 ? 'name' in drugs[0] : false,
      hasId: drugs.length > 0 ? 'id' in drugs[0] : false,
      hasCategoryName: drugs.length > 0 ? 'categoryName' in drugs[0] : false,
      hasGroupBy: drugs.length > 0 ? 'groupBy' in drugs[0] : false
    });
    
    return drugs;
  }, [availableDrugs]);

  const handleDrugSelect = (drug: Drug | null) => {
    console.log('🔍 Drug selected:', drug);
    setSelectedDrug(drug);
  };

  const handleSearchInputChange = (event: any, newInputValue: string) => {
    console.log('🔍 Search input changed:', newInputValue);
    setSearchInput(newInputValue);
  };

  const handleSearch = () => {
    console.log('🔍 Search button clicked with query:', searchInput);
    setSearchQuery(searchInput);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    console.log('🧹 Clearing search');
    setSearchQuery("");
    setSearchInput("");
    setIsSearching(false);
  };

  const handleClear = () => {
    console.log('🧹 Clearing all selections');
    setSelectedDrug(null);
    setSearchQuery("");
    setSearchInput("");
    setIsSearching(false);
  };

  // Debug logging for API calls
  useEffect(() => {
    if (open) {
      console.log('🔍 FoodDrugInteractionPopup opened - fetching categories');
    }
  }, [open]);

  useEffect(() => {
    if (selectedDrug) {
      console.log('💊 Drug selected, fetching details for drug:', selectedDrug.id);
    }
  }, [selectedDrug]);

  useEffect(() => {
    console.log('🔍 Search query changed:', searchQuery);
    console.log('🔍 Search input:', searchInput);
    console.log('🔍 Is searching:', isSearching);
    console.log('🔍 Available drugs count:', availableDrugs.length);
    console.log('🔍 All drugs for autocomplete:', allDrugs.length);
    console.log('🔍 First few options:', allDrugs.slice(0, 3).map(d => ({ name: d.name, category: d.categoryName })));
    console.log('🔍 Should show dropdown:', searchQuery.length > 0 && allDrugs.length > 0);
    console.log('🔍 Autocomplete open condition:', searchQuery.length > 0 && allDrugs.length > 0);
    console.log('🔍 Search query length:', searchQuery.length);
    console.log('🔍 All drugs length:', allDrugs.length);
  }, [searchQuery, searchInput, isSearching, availableDrugs, allDrugs]);

  // Get drug effect and nutritional implication from API data
  const drugEffect = drugDetails?.drug_effect || "Select a drug to view interactions";
  const nutritionalImplication = drugDetails?.nutritional_implications || "Select a drug to view nutritional implications";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
          boxShadow: theme.palette.mode === 'dark' 
            ? "0 8px 32px rgba(255,255,255,0.12)" 
            : "0 8px 32px rgba(0,0,0,0.12)",
          minHeight: "500px"
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 2, 
        borderBottom: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb:5
      }}>
        <Typography variant="h5" component="div" sx={{ 
          fontWeight: 700, 
          color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
          fontSize: "24px"
        }}>
          Food-Drug Interaction Checker
        </Typography>
        <IconButton onClick={onClose} sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
          <LuX size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Drug Search Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 600, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "16px",
            mb: 2
          }}>
            Drug Search
            {!isSearching && (
              <Typography component="span" sx={{ 
                fontSize: "12px", 
                color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                ml: 1,
                fontWeight: 400
              }}>
                ({allDrugsWithCategory.length} drugs available - type to search or select from dropdown)
              </Typography>
            )}
            {isSearching && (
              <Typography component="span" sx={{ 
                fontSize: "12px", 
                color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                ml: 1,
                fontWeight: 400
              }}>
                (Search results)
                {availableDrugs.length > 0 && (
                  <Typography component="span" sx={{ 
                    fontSize: "11px", 
                    color: "#02BE6A",
                    ml: 1,
                    fontWeight: 500
                  }}>
                    {availableDrugs.length} result{availableDrugs.length !== 1 ? 's' : ''} found
                  </Typography>
                )}
              </Typography>
            )}
          </Typography>
          
          {categoriesError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to load drug categories: {categoriesError.message}
            </Alert>
          )}
          
          {searchError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to search drugs: {searchError.message}
            </Alert>
          )}
          
          {searchLoading && (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1, 
              mb: 2,
              p: 2,
              backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
              borderRadius: 2,
              border: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e9ecef"
            }}>
              <CircularProgress size={16} />
              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? "#cccccc" : "#666666",
                fontSize: "12px"
              }}>
                Searching by drug name or category...
              </Typography>
            </Box>
          )}
          
          {/* Single Drug Selection and Search Field */}
          <Autocomplete
            options={allDrugs}
            value={selectedDrug}
            onChange={(event, newValue) => {
              console.log('🔍 Autocomplete onChange:', newValue);
              handleDrugSelect(newValue);
            }}
            getOptionLabel={(option) => {
              console.log('🔍 getOptionLabel called with:', option);
              return option.name || 'Unknown';
            }}
            loading={searchLoading || categoriesLoading}
            disabled={searchLoading || categoriesLoading}
            inputValue={searchInput}
            onInputChange={(event, newInputValue, reason) => {
              console.log('🔍 Autocomplete input change:', { newInputValue, reason });
              if (reason === 'input') {
                handleSearchInputChange(event, newInputValue);
                // Only clear search when input is completely empty
                if (newInputValue.length === 0) {
                  setSearchQuery("");
                  setIsSearching(false);
                }
              }
            }}
            autoComplete={false}
            freeSolo={false}
            clearOnBlur={false}
            filterOptions={(options, { inputValue }) => {
              console.log('🔍 filterOptions called with:', { optionsLength: options.length, inputValue });
              // Return all options since we're already filtering in availableDrugs
              return options;
            }}
            noOptionsText="No drugs found"
            groupBy={(option) => (option as DrugWithCategory).groupBy || 'Other'}
            renderGroup={(params) => (
              <li key={params.key}>
                <Box sx={{ 
                  px: 2, 
                  py: 1, 
                  backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#f5f5f5",
                  borderBottom: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e0e0e0"
                }}>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                    fontSize: "14px"
                  }}>
                    {params.group}
                  </Typography>
                </Box>
                <ul style={{ padding: 0, margin: 0 }}>
                  {params.children}
                </ul>
              </li>
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ 
                pl: 4, 
                py: 1,
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#f5f5f5"
                }
              }}>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                  fontSize: "14px"
                }}>
                  {option.name}
                </Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search or select a drug..."
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {(searchLoading || categoriesLoading) ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {searchInput.trim() && (
                            <IconButton
                              onClick={handleClearSearch}
                              size="small"
                              sx={{
                                color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                                "&:hover": {
                                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000"
                                }
                              }}
                            >
                              <LuXCircle size={16} />
                            </IconButton>
                          )}
                          <IconButton
                            onClick={() => {
                              if (searchInput.trim()) {
                                handleSearch();
                              }
                            }}
                            disabled={!searchInput.trim() || searchLoading || categoriesLoading}
                            size="small"
                            sx={{
                              color: searchInput.trim() ? "#02BE6A" : theme.palette.mode === 'dark' ? "#666666" : "#cccccc"
                            }}
                          >
                            <LuSearch size={16} />
                          </IconButton>
                        </Box>
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                  sx: {
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#02BE6A",
                    },
                  }
                }}
              />
            )}
            popupIcon={
              <LuChevronDown 
                size={20} 
                style={{ cursor: 'pointer' }}
              />
            }
            sx={{
              "& .MuiAutocomplete-popupIndicator": {
                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d"
              }
            }}
          />
        </Box>


        {/* Drug Effect Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 600, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "16px",
            mb: 2
          }}>
            Drug Effect
            {selectedDrug && (
              <Typography component="span" sx={{ 
                fontSize: "12px", 
                color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                ml: 1,
                fontWeight: 400
              }}>
                ({selectedDrug.name} - {(selectedDrug as DrugWithCategory).categoryName || 'Unknown Category'})
              </Typography>
            )}
          </Typography>
          
          {detailsError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to load drug details: {detailsError.message}
            </Alert>
          )}
          
          {selectedDrug && detailsLoading && (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1, 
              mb: 2,
              p: 2,
              backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
              borderRadius: 2,
              border: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e9ecef"
            }}>
              <CircularProgress size={16} />
              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? "#cccccc" : "#666666",
                fontSize: "12px"
              }}>
                Loading details for {selectedDrug.name}...
              </Typography>
            </Box>
          )}
          
          <Box sx={{
            p: 3,
            backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
            borderRadius: 2,
            border: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e9ecef",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: detailsLoading ? "center" : "flex-start"
          }}>
            {detailsLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="body1" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                fontSize: "14px",
                lineHeight: 1.5
              }}>
                {drugEffect}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Nutritional Implication And Caution Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 600, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "16px",
            mb: 2
          }}>
            Nutritional Implication And Caution
            {selectedDrug && (
              <Typography component="span" sx={{ 
                fontSize: "12px", 
                color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                ml: 1,
                fontWeight: 400
              }}>
                ({selectedDrug.name} - {(selectedDrug as DrugWithCategory).categoryName || 'Unknown Category'})
              </Typography>
            )}
          </Typography>
          
          <Box sx={{
            p: 3,
            backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
            borderRadius: 2,
            border: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e9ecef",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: detailsLoading ? "center" : "flex-start"
          }}>
            {detailsLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="body1" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                fontSize: "14px",
                lineHeight: 1.5
              }}>
                {nutritionalImplication}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#02BE6A",
              backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FoodDrugInteractionPopup;