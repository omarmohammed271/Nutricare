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
import { LuX, LuChevronDown, LuXCircle } from "react-icons/lu";
import { useState, useMemo, useEffect, useRef } from "react";
import { useDrugCategories, useDrugsByCategory, useDrugDetails, useSearchDrugs } from "@src/hooks/useNutritionApi";
import { Drug, DrugCategory, DrugDetail } from "@src/services/nutritionApi";

// Extended drug interface with category information
interface DrugWithCategory extends Drug {
  categoryName: string;
  categoryId: number;
  groupBy: string;
}

interface DrugSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onDrugSelect: (drug: Drug | null) => void;
  selectedDrug: Drug | null;
}

const DrugSelectionDialog = ({ open, onClose, onDrugSelect, selectedDrug }: DrugSelectionDialogProps) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [autoSearchEnabled, setAutoSearchEnabled] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch drug categories - only when dialog is open
  const { 
    data: drugCategoriesData, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useDrugCategories();

  // Ensure drugCategories is always an array
  const drugCategories = Array.isArray(drugCategoriesData) ? drugCategoriesData : [];

  // Search drugs across all categories when search query is provided
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
      const searchTerm = searchQuery.toLowerCase().trim();
      const results: DrugWithCategory[] = [];

      // Add all drugs from matching categories
      drugCategories.forEach(category => {
        const categoryMatches = category.name.toLowerCase().includes(searchTerm);
        if (categoryMatches && category.drugs) {
          category.drugs.forEach(drug => {
            if (!results.some(d => d.id === drug.id)) {
              results.push({
                ...drug,
                categoryName: category.name,
                categoryId: category.id,
                groupBy: category.name
              });
            }
          });
        }
      });

      // Add drugs that match by name (even if category didn't match)
      drugCategories.forEach(category => {
        if (category.drugs) {
          category.drugs.forEach(drug => {
            const drugMatches = drug.name.toLowerCase().includes(searchTerm);
            if (drugMatches && !results.some(d => d.id === drug.id)) {
              results.push({
                ...drug,
                categoryName: category.name,
                categoryId: category.id,
                groupBy: category.name
              });
            }
          });
        }
      });

      return results;
    }

    // No search query - show all drugs
    return allDrugsWithCategory;
  }, [searchQuery, allDrugsWithCategory, drugCategories]);

  // Fetch drug details when a drug is selected
  const { 
    data: drugDetails, 
    isLoading: detailsLoading, 
    error: detailsError 
  } = useDrugDetails(selectedDrug?.id || 0);

  // Prepare drugs for autocomplete options with grouped display
  const allDrugs = useMemo(() => {
    const drugs = availableDrugs.map((drug: DrugWithCategory) => {
      const mappedDrug = {
        ...drug,
        name: drug.name || 'Unknown Drug',
        id: drug.id || 0,
        categoryName: drug.categoryName || 'Other',
        groupBy: drug.categoryName || 'Other'
      } as DrugWithCategory;
      
      return mappedDrug;
    });
    
    return drugs;
  }, [availableDrugs]);

  const handleDrugSelect = (drug: Drug | null) => {
    onDrugSelect(drug);
  };

  const handleSearchInputChange = (event: any, newInputValue: string) => {
    setSearchInput(newInputValue);
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set a new timeout to enable auto-search after 2 seconds of typing
    if (newInputValue.trim().length > 0) {
      searchTimeoutRef.current = setTimeout(() => {
        setAutoSearchEnabled(true);
        setSearchQuery(newInputValue);
        setIsSearching(true);
      }, 2000);
    } else {
      // If input is cleared, disable auto-search
      setAutoSearchEnabled(false);
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setIsSearching(true);
    setAutoSearchEnabled(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchInput("");
    setIsSearching(false);
    setAutoSearchEnabled(false);
    
    // Clear any pending timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const handleClear = () => {
    onDrugSelect(null);
    setSearchQuery("");
    setSearchInput("");
    setIsSearching(false);
    setAutoSearchEnabled(false);
    
    // Clear any pending timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Get drug effect and nutritional implication from API data
  const drugEffect = drugDetails?.drug_effect || "Select a drug to view interactions";
  const nutritionalImplication = drugDetails?.nutritional_implications || "Select a drug to view nutritional implications";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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
        mb: 3
      }}>
        <Typography variant="h5" component="div" sx={{ 
          fontWeight: 700, 
          color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
          fontSize: "24px"
        }}>
          Drug Selection for Medication
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
          
          {/* Drug Selection Field */}
          <Autocomplete
            options={allDrugs}
            value={selectedDrug}
            onChange={(event, newValue) => {
              handleDrugSelect(newValue);
              setIsOpen(!isOpen);
              setSearchInput(newValue ? newValue.name : "");
            }}
            getOptionLabel={(option) => {
              return option.name || 'Unknown';
            }}
            loading={searchLoading || categoriesLoading}
            disabled={searchLoading || categoriesLoading}
            inputValue={searchInput}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === 'input') {
                setSearchInput(newInputValue);
                
                // Clear any existing timeout
                if (searchTimeoutRef.current) {
                  clearTimeout(searchTimeoutRef.current);
                }
                
                // Set a new timeout to trigger search after 2.5 seconds of inactivity
                if (newInputValue.trim().length > 0) {
                  searchTimeoutRef.current = setTimeout(() => {
                    setSearchQuery(newInputValue);
                    setIsSearching(true);
                  }, 500);
                } else {
                  // If input is cleared, reset search immediately
                  setSearchQuery("");
                  setIsSearching(false);
                }
              } else if (reason === 'clear') {
                setSearchInput("");
                setSearchQuery("");
                setIsSearching(false);
                
                // Clear any existing timeout
                if (searchTimeoutRef.current) {
                  clearTimeout(searchTimeoutRef.current);
                }
              }
            }}
            open={(!selectedDrug && searchInput.length > 0 && allDrugs.length > 0) || isOpen}
            onOpen={() => {
              setIsOpen(true);
            }}
            onClose={(event, reason) => {
              setIsOpen(false);
            }}
            autoComplete={false}
            freeSolo={false}
            clearOnBlur={false}
            filterOptions={(options, { inputValue }) => {
              return options;
            }}
            noOptionsText="No drugs found"
            groupBy={(option) => {
              return (option as DrugWithCategory).categoryName || 'Other';
            }}
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
              <Box 
                component="li" 
                {...props} 
                sx={{ 
                  pl: 4, 
                  py: 1,
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#f5f5f5"
                  }
                }}
              >
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
                onClick={() => setIsOpen(isOpen => !isOpen)}
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
          onClick={handleClear}
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
          Clear Selection
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: "#02BE6A",
            '&:hover': { bgcolor: "#02a85a" },
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DrugSelectionDialog;
