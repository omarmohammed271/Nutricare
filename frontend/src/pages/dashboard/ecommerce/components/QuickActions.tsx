import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

// Import SVG icons
import ClientOnboardingIcon from "@src/assets/images/svg/Client Onboarding.svg";
import CalculatorIcon from "@src/assets/images/svg/iconoir_calculator.svg";
import NutritionRiskIcon from "@src/assets/images/svg/Nutrition Risk Screening.svg";
import FoodDrugIcon from "@src/assets/images/svg/Food & Drug Interaction.svg";

// Import popup components
import ClientOnboardingPopup from "./ClientOnboardingPopup";
import QuickCalculatorsPopup from "./QuickCalculatorsPopup";
import NutritionRiskScreeningPopup from "./NutritionRiskScreeningPopup";
import FoodDrugInteractionPopup from "./FoodDrugInteractionPopup";

const QuickActions = () => {
  const [clientOnboardingOpen, setClientOnboardingOpen] = useState(false);
  const [quickCalculatorsOpen, setQuickCalculatorsOpen] = useState(false);
  const [nutritionRiskScreeningOpen, setNutritionRiskScreeningOpen] = useState(false);
  const [foodDrugInteractionOpen, setFoodDrugInteractionOpen] = useState(false);

  const handleOpenClientOnboarding = () => {
    setClientOnboardingOpen(true);
  };

  const handleCloseClientOnboarding = () => {
    setClientOnboardingOpen(false);
  };

  const handleOpenQuickCalculators = () => {
    setQuickCalculatorsOpen(true);
  };

  const handleCloseQuickCalculators = () => {
    setQuickCalculatorsOpen(false);
  };

  const handleOpenNutritionRiskScreening = () => {
    setNutritionRiskScreeningOpen(true);
  };

  const handleCloseNutritionRiskScreening = () => {
    setNutritionRiskScreeningOpen(false);
  };

  const handleOpenFoodDrugInteraction = () => {
    setFoodDrugInteractionOpen(true);
  };

  const handleCloseFoodDrugInteraction = () => {
    setFoodDrugInteractionOpen(false);
  };
  return (
    <Box sx={{
      p: 2,
      backgroundColor: "background.paper",
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      border: "1px solid",
      borderColor: "divider"
    }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#2c3e50" }}>
        Quick Actions
      </Typography>
      <Grid container spacing={1.25}> {/* 10px gap */}
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            endIcon={
              <img 
                src={ClientOnboardingIcon} 
                alt="Client Onboarding" 
                style={{ width: 22, height: 22 }}
              />
            }
            fullWidth
            onClick={handleOpenClientOnboarding}
            sx={{
              height: "65.97px",
              backgroundColor: "#27AE60",
              color: "white",
              borderRadius: "18.85px",
              padding: "14.14px",
              boxShadow: "0px 3.77px 3.77px 0px #505050",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "#229954",
                transform: "translateY(-2px)",
                boxShadow: "0px 5px 5px 0px #505050",
              },
              transition: "all 0.3s ease",
              fontFamily: "Roboto",
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "20px !important",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center"
            }}
          >
            Client Onboarding
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            endIcon={
              <img 
                src={CalculatorIcon} 
                alt="Quick Calculators" 
                style={{ width: 24, height: 24 }}
              />
            }
            fullWidth
            onClick={handleOpenQuickCalculators}
            sx={{
              height: "65.97px",
              background: "linear-gradient(90deg, #00C897 0%, #00C897 100%)",
              color: "white",
              borderRadius: "18.85px",
              padding: "14.14px",
              boxShadow: "0px 3.77px 3.77px 0px #505050",
              justifyContent: "space-between",
              "&:hover": {
                background: "linear-gradient(90deg, #00B085 0%, #00B085 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0px 5px 5px 0px #505050",
              },
              transition: "all 0.3s ease",
              fontFamily: "Roboto",
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "20px !important",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center"
            }}
          >
            Quick Calculators
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            endIcon={
              <img 
                src={NutritionRiskIcon} 
                alt="Nutrition Risk Screening" 
                style={{ width: 31, height: 22 }}
              />
            }
            fullWidth
            onClick={handleOpenNutritionRiskScreening}
            sx={{
              height: "65.97px",
              backgroundColor: "#118D57",
              color: "white",
              borderRadius: "18.85px",
              padding: "14.14px",
              boxShadow: "0px 3.77px 3.77px 0px #505050",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "#0F7A4D",
                transform: "translateY(-2px)",
                boxShadow: "0px 5px 5px 0px #505050",
              },
              transition: "all 0.3s ease",
              fontFamily: "Roboto",
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "20px !important",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center"
            }}
          >
            Nutrition Risk Screening
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            endIcon={
              <img 
                src={FoodDrugIcon} 
                alt="Food & Drug Interaction" 
                style={{ width: 53, height: 34 }}
              />
            }
            fullWidth
            onClick={handleOpenFoodDrugInteraction}
            sx={{
              height: "65.97px",
              background: "linear-gradient(90deg, #5DADE2 0%, #2E86C1 100%)",
              color: "white",
              borderRadius: "18.85px",
              padding: "14.14px",
              boxShadow: "0px 3.77px 3.77px 0px #505050",
              justifyContent: "space-between",
              "&:hover": {
                background: "linear-gradient(90deg, #4A9BCF 0%, #2574A6 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0px 5px 5px 0px #505050",
              },
              transition: "all 0.3s ease",
              fontFamily: "Roboto",
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "20px !important",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center"
            }}
          >
            Food & Drug Interaction
          </Button>
        </Grid>
      </Grid>

      {/* Client Onboarding Popup */}
      <ClientOnboardingPopup
        open={clientOnboardingOpen}
        onClose={handleCloseClientOnboarding}
      />

      {/* Quick Calculators Popup */}
      <QuickCalculatorsPopup
        open={quickCalculatorsOpen}
        onClose={handleCloseQuickCalculators}
      />

      {/* Nutrition Risk Screening Popup */}
      <NutritionRiskScreeningPopup
        open={nutritionRiskScreeningOpen}
        onClose={handleCloseNutritionRiskScreening}
      />

      {/* Food-Drug Interaction Popup */}
      <FoodDrugInteractionPopup
        open={foodDrugInteractionOpen}
        onClose={handleCloseFoodDrugInteraction}
      />
    </Box>
  );
};

export default QuickActions;
