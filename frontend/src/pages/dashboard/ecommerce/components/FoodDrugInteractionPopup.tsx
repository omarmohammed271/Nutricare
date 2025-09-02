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
  Autocomplete
} from "@mui/material";
import { LuX, LuChevronDown } from "react-icons/lu";
import { useState } from "react";

interface FoodDrugInteractionPopupProps {
  open: boolean;
  onClose: () => void;
}

const FoodDrugInteractionPopup = ({ open, onClose }: FoodDrugInteractionPopupProps) => {
  const [selectedDrug, setSelectedDrug] = useState("");
  const [drugEffect, setDrugEffect] = useState("Spinach, Kale (high Vitamin K)");
  const [nutritionalImplication, setNutritionalImplication] = useState("Limit intake to < 1 serving/day");

  const drugOptions = [
    "Warfarin",
    "Aspirin",
    "Metformin",
    "Digoxin",
    "Lithium",
    "Phenytoin",
    "Theophylline",
    "Ciprofloxacin"
  ];

  const handleDrugSelect = (drug: string) => {
    setSelectedDrug(drug);
    
    // Simulate drug interaction lookup
    if (drug === "Warfarin") {
      setDrugEffect("Spinach, Kale (high Vitamin K)");
      setNutritionalImplication("Limit intake to < 1 serving/day");
    } else if (drug === "Aspirin") {
      setDrugEffect("Garlic, Ginger (blood thinning effects)");
      setNutritionalImplication("Monitor bleeding risk, avoid excessive intake");
    } else if (drug === "Metformin") {
      setDrugEffect("Alcohol (increased risk of lactic acidosis)");
      setNutritionalImplication("Avoid alcohol consumption while taking medication");
    } else {
      setDrugEffect("No significant food interactions found");
      setNutritionalImplication("Continue normal dietary habits");
    }
  };

  const handleClear = () => {
    setSelectedDrug("");
    setDrugEffect("");
    setNutritionalImplication("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          minHeight: "500px"
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 2, 
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb:5
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          color: "#2c3e50",
          fontSize: "24px"
        }}>
          Food-Drug Interaction Checker
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#7f8c8d" }}>
          <LuX size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Drug Search Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 600, 
            color: "#2c3e50",
            fontSize: "16px",
            mb: 2
          }}>
            Drug Search
          </Typography>
          
          <Autocomplete
            options={drugOptions}
            value={selectedDrug}
            onChange={(event, newValue) => {
              if (newValue) {
                handleDrugSelect(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for a drug..."
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "#e0e0e0",
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
                color: "#7f8c8d"
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
                backgroundColor: "#f8f9fa",
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
            color: "#2c3e50",
            fontSize: "16px",
            mb: 2
          }}>
            Drug Effect
          </Typography>
          
          <Box sx={{
            p: 3,
            backgroundColor: "#f8f9fa",
            borderRadius: 2,
            border: "1px solid #e9ecef",
            minHeight: "60px",
            display: "flex",
            alignItems: "center"
          }}>
            <Typography variant="body1" sx={{ 
              color: "#2c3e50",
              fontSize: "14px",
              lineHeight: 1.5
            }}>
              {drugEffect || "Select a drug to view interactions"}
            </Typography>
          </Box>
        </Box>

        {/* Nutritional Implication And Caution Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 600, 
            color: "#2c3e50",
            fontSize: "16px",
            mb: 2
          }}>
            Nutritional Implication And Caution
          </Typography>
          
          <Box sx={{
            p: 3,
            backgroundColor: "#f8f9fa",
            borderRadius: 2,
            border: "1px solid #e9ecef",
            minHeight: "60px",
            display: "flex",
            alignItems: "center"
          }}>
            <Typography variant="body1" sx={{ 
              color: "#2c3e50",
              fontSize: "14px",
              lineHeight: 1.5
            }}>
              {nutritionalImplication || "Select a drug to view nutritional implications"}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#e0e0e0",
            color: "#2c3e50",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#02BE6A",
              backgroundColor: "#f8f9fa",
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
