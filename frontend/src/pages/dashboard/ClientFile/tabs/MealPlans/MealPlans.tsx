import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Tab
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// Import types and components from meal plan
import { 
  SelectedFood,
  FoodItem
} from '../../../MealPlan/tabs/Mealplan/types';
import FoodListingCard from '../../../MealPlan/tabs/Mealplan/componenets/FoodListingCard';
import GraphCard from '../../../MealPlan/tabs/Mealplan/componenets/graphcard';
import FoodDropdownDialog from '../../../MealPlan/tabs/Mealplan/componenets/FoodDropdownDialog';

// Import local components and hooks
import { 
  TemplatesTable, 
  MealPlanCreationForm, 
  AdimeNotePanel, 
  NoteDialog,
  CurrentActivePlan,
  MealPlansTable
} from './components';
import { useNutritionCalculation, useMealPlanData } from './hooks';
import { NoteDialogState, FoodDropdownDialogState, MealPlan } from './types';
import { themeColors, mockMealPlans } from './constants';
import { removeFromBasket, addToBasket } from './utils';

const MealPlans: React.FC = () => {
  const [tabValue, setTabValue] = useState('1');
  const [basketItems, setBasketItems] = useState<SelectedFood[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(mockMealPlans);
  const [foodDropdownDialog, setFoodDropdownDialog] = useState<FoodDropdownDialogState>({
    open: false,
    mealId: ''
  });
  const [noteDialog, setNoteDialog] = useState<NoteDialogState>({
    open: false,
    planId: '',
    currentNote: ''
  });

  // Custom hooks
  const { nutritionSummary, updateNutrition } = useNutritionCalculation();
  const {
    templates,
    mealTypes,
    calorieNeed,
    foodExcluded,
    setCalorieNeed,
    setFoodExcluded,
    updateMealTypeCount,
    handleEditTemplate,
    handleDownloadTemplate,
    handleViewTemplate
  } = useMealPlanData();

  // Event handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleAddFood = (selectedFood: SelectedFood) => {
    setBasketItems(prev => addToBasket(prev, selectedFood));
  };

  const handleRemoveFromBasket = (foodId: number, mealId: string) => {
    setBasketItems(prev => removeFromBasket(prev, foodId, mealId));
  };

  const handleFoodSelect = (food: FoodItem) => {
    setFoodDropdownDialog({ open: true, mealId: 'general' });
  };

  const handleCloseNoteDialog = () => {
    setNoteDialog({ open: false, planId: '', currentNote: '' });
  };

  const handleSaveNote = () => {
    console.log('Saving note:', noteDialog.currentNote);
    handleCloseNoteDialog();
  };

  const handleNoteChange = (note: string) => {
    setNoteDialog(prev => ({ ...prev, currentNote: note }));
  };

  const handleCloseFoodDialog = () => {
    setFoodDropdownDialog({ open: false, mealId: '' });
  };

  const handleMealTypeCountChange = (mealName: string, increment: boolean) => {
    updateMealTypeCount(mealName, increment);
  };

  const handleCreatePlan = () => {
    console.log('Creating plan with:', { calorieNeed, foodExcluded, mealTypes });
  };

  const handleDeletePlan = (planId: string) => {
    setMealPlans(prev => prev.filter(plan => plan.id !== planId));
  };

  // Filter active plans for CurrentActivePlan component
  const activePlans = mealPlans.filter(plan => plan.status === 'Active');

  // Update nutrition when basket changes
  useEffect(() => {
    updateNutrition(basketItems);
  }, [basketItems, updateNutrition]);

  return (
    <Box sx={{ width: '100%', bgcolor: 'white', minHeight: '100vh' }}>
      <Grid container spacing={3} sx={{ p: 1 }}>
        {/* Left Column - Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Tabs */}
          <Box sx={{ mb: 3 }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TabList 
                  onChange={handleTabChange} 
                  aria-label="meal plans tabs"
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: themeColors.primary,
                    },
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 600,
                      color: themeColors.secondary,
                      '&.Mui-selected': {
                        color: themeColors.primary,
                        fontWeight: 700,
                      },
                    },
                  }}
                >
                  <Tab label="Meal Plans" value="1" />
                  <Tab label="Templates" value="2" />
                </TabList>
                
                <Button
                  variant="contained"
                  onClick={handleCreatePlan}
                  sx={{
                    bgcolor: themeColors.primary,
                    '&:hover': { bgcolor: themeColors.primaryHover },
                    borderRadius: 1,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  Create Plan
                </Button>
              </Box>

              <TabPanel value="1" sx={{ p: 0, mt: 3 }}>
                {/* Current Active Plan */}
               

               

                <TemplatesTable 
                  templates={templates}
                  onEdit={handleEditTemplate}
                  onDownload={handleDownloadTemplate}
                  onView={handleViewTemplate}
                />

                <MealPlanCreationForm 
                  calorieNeed={calorieNeed}
                  foodExcluded={foodExcluded}
                  mealTypes={mealTypes}
                  onCalorieNeedChange={setCalorieNeed}
                  onFoodExcludedChange={setFoodExcluded}
                  onMealTypeCountChange={handleMealTypeCountChange}
                />
              </TabPanel>

              <TabPanel value="2" sx={{ p: 0, mt: 3 }}>
                <TemplatesTable 
                  templates={templates}
                  onEdit={handleEditTemplate}
                  onDownload={handleDownloadTemplate}
                  onView={handleViewTemplate}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>

        {/* Right Column - Food Management and ADIME Note */}
        <Grid item xs={12} lg={4}>
          <FoodListingCard 
            onFoodSelect={handleFoodSelect}
            basketItems={basketItems}
            onRemoveFromBasket={handleRemoveFromBasket}
          />
          
          <GraphCard 
            nutritionSummary={nutritionSummary}
            targetCalories={2200}
          />
          
          <AdimeNotePanel />
        </Grid>
      </Grid>

      {/* Dialogs */}
      <FoodDropdownDialog
        open={foodDropdownDialog.open}
        mealId={foodDropdownDialog.mealId || undefined}
        availableMeals={[{ id: 'general', type: 'General' }]}
        onClose={handleCloseFoodDialog}
        onAddFood={handleAddFood}
      />

      <NoteDialog
        open={noteDialog.open}
        currentNote={noteDialog.currentNote}
        onClose={handleCloseNoteDialog}
        onSave={handleSaveNote}
        onNoteChange={handleNoteChange}
      />
    </Box>
  );
};

export default MealPlans;