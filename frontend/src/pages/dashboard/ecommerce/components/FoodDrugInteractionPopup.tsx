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
  Alert
} from "@mui/material";
import { LuX, LuChevronDown } from "react-icons/lu";
import { useState, useMemo, useEffect } from "react";
import { useDrugCategories, useDrugsByCategory, useDrugDetails, useSearchDrugs } from "@src/hooks/useNutritionApi";
import { Drug, DrugCategory, DrugDetail } from "@src/services/nutritionApi";

interface FoodDrugInteractionPopupProps {
  open: boolean;
  onClose: () => void;
}

const FoodDrugInteractionPopup = ({ open, onClose }: FoodDrugInteractionPopupProps) => {
  const theme = useTheme();
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch drug categories - only when dialog is open
  const { 
    data: drugCategoriesData, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useDrugCategories();

  // Ensure drugCategories is always an array
  const drugCategories = Array.isArray(drugCategoriesData) ? drugCategoriesData : [];

  // Get drugs from selected category directly (no separate API call needed)
  const drugsByCategory = selectedCategory?.drugs || [];

  // Search drugs across all categories when search query is provided
  const { 
    data: searchResults, 
    isLoading: searchLoading, 
    error: searchError 
  } = useSearchDrugs(searchQuery);

  // Use search results if searching, otherwise use category drugs
  const availableDrugs = searchQuery && searchQuery.length > 2 ? (searchResults || []) : drugsByCategory;

  // Fetch drug details when a drug is selected - only when drug is selected and valid
  const { 
    data: drugDetails, 
    isLoading: detailsLoading, 
    error: detailsError 
  } = useDrugDetails(selectedDrug?.id || 0);

  // Prepare drugs for autocomplete options
  const allDrugs = useMemo(() => {
    return availableDrugs.map(drug => ({
      ...drug,
      label: drug.name,
      value: drug.id
    }));
  }, [availableDrugs]);

  const handleDrugSelect = (drug: Drug | null) => {
    console.log('🔍 Drug selected:', drug);
    setSelectedDrug(drug);
  };

  const handleCategorySelect = (category: DrugCategory | null) => {
    console.log('📂 Category selected:', category);
    setSelectedCategory(category);
    setSelectedDrug(null); // Reset selected drug when category changes
    setSearchQuery(""); // Reset search query when category changes
  };

  const handleSearchChange = (event: any, newInputValue: string) => {
    setSearchQuery(newInputValue);
    // If searching, clear category selection to show all drugs
    if (newInputValue && newInputValue.length > 2) {
      setSelectedCategory(null);
    }
  };

  const handleClear = () => {
    console.log('🧹 Clearing all selections');
    setSelectedDrug(null);
    setSelectedCategory(null);
    setSearchQuery("");
  };

  // Debug logging for API calls
  useEffect(() => {
    if (open) {
      console.log('🔍 FoodDrugInteractionPopup opened - fetching categories');
    }
  }, [open]);

  useEffect(() => {
    if (selectedCategory) {
      console.log('📂 Category selected, fetching drugs for category:', selectedCategory.id);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedDrug) {
      console.log('💊 Drug selected, fetching details for drug:', selectedDrug.id);
    }
  }, [selectedDrug]);

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
        {/* Category Selection Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 600, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "16px",
            mb: 2
          }}>
            Drug Category
          </Typography>
          
          {categoriesError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to load drug categories: {categoriesError.message}
            </Alert>
          )}
          
          <Autocomplete
            options={drugCategories}
            value={selectedCategory}
            onChange={(event, newValue) => handleCategorySelect(newValue)}
            getOptionLabel={(option) => option.name}
            loading={categoriesLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select a drug category..."
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {categoriesLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
            popupIcon={<LuChevronDown size={20} />}
            sx={{
              "& .MuiAutocomplete-popupIndicator": {
                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d"
              }
            }}
          />
        </Box>

        {/* Drug Search Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 600, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "16px",
            mb: 2
          }}>
            Drug Search
            {selectedCategory && !searchQuery && (
              <Typography component="span" sx={{ 
                fontSize: "12px", 
                color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                ml: 1,
                fontWeight: 400
              }}>
                ({drugsByCategory.length} drugs available)
              </Typography>
            )}
            {searchQuery && searchQuery.length > 2 && (
              <Typography component="span" sx={{ 
                fontSize: "12px", 
                color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                ml: 1,
                fontWeight: 400
              }}>
                (Searching all categories...)
              </Typography>
            )}
          </Typography>
          
          {searchError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to search drugs: {searchError.message}
            </Alert>
          )}
          
          {searchQuery && searchQuery.length > 2 && searchLoading && (
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
                Searching drugs...
              </Typography>
            </Box>
          )}
          
          <Autocomplete
            options={allDrugs}
            value={selectedDrug}
            onChange={(event, newValue) => handleDrugSelect(newValue)}
            getOptionLabel={(option) => option.name}
            loading={searchLoading}
            disabled={searchLoading}
            inputValue={searchQuery}
            onInputChange={handleSearchChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  searchLoading 
                    ? "Searching drugs..." 
                    : searchQuery && searchQuery.length > 2
                      ? "Searching all categories..."
                      : selectedCategory
                        ? "Search for a drug in this category..."
                        : "Search for a drug across all categories..."
                }
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {searchLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
            popupIcon={<LuChevronDown size={20} />}
            sx={{
              "& .MuiAutocomplete-popupIndicator": {
                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d"
              }
            }}
          />
        </Box>

        {/* Clear Button */}
        <Box sx={{ mb: 4 }}>
          <Button
            onClick={handleClear}
            variant="outlined"
            sx={{
              borderColor: "#02BE6A",
              color: "#02BE6A",
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                borderColor: "#029e56",
                backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
              }
            }}
          >
            Clear
          </Button>
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
                ({selectedDrug.name})
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
                ({selectedDrug.name})
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