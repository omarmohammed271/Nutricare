import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Tab,
  useTheme,
  TextField,
  Card,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';

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
import { useClientFile } from '../../context/ClientFileContext';

const MealPlans: React.FC = () => {
  const theme = useTheme();
  const { formData: contextData, updateMealPlan, isDataComplete, setCompletionStatus } = useClientFile();
  const [tabValue, setTabValue] = useState('1');
  const [basketItems, setBasketItems] = useState<SelectedFood[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(mockMealPlans);
  const [notes, setNotes] = useState('');
  const [foodDropdownDialog, setFoodDropdownDialog] = useState<FoodDropdownDialogState>({
    open: false,
    mealId: ''
  });
  const [noteDialog, setNoteDialog] = useState<NoteDialogState>({
    open: false,
    planId: '',
    currentNote: ''
  });

  // Collapse states for making sections collapsible
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [templatesExpanded, setTemplatesExpanded] = useState(false);
  const [creationFormExpanded, setCreationFormExpanded] = useState(false);
  const [foodListingExpanded, setFoodListingExpanded] = useState(false);
  const [graphExpanded, setGraphExpanded] = useState(false);
  const [adimeNoteExpanded, setAdimeNoteExpanded] = useState(false);

  // Load data from context on mount
  useEffect(() => {
    if (contextData.mealPlan.notes) {
      setNotes(contextData.mealPlan.notes);
    }
  }, [contextData.mealPlan.notes]);

  // Update context when notes change
  useEffect(() => {
    updateMealPlan({ notes });
  }, [notes, updateMealPlan]);

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

  // Toggle all sections
  const toggleAllSections = () => {
    const allCollapsed = !notesExpanded && !templatesExpanded && !creationFormExpanded && 
                        !foodListingExpanded && !graphExpanded && !adimeNoteExpanded;
    
    setNotesExpanded(allCollapsed);
    setTemplatesExpanded(allCollapsed);
    setCreationFormExpanded(allCollapsed);
    setFoodListingExpanded(allCollapsed);
    setGraphExpanded(allCollapsed);
    setAdimeNoteExpanded(allCollapsed);
  };

  // Filter active plans for CurrentActivePlan component
  const activePlans = mealPlans.filter(plan => plan.status === 'Active');

  // Load data from context on mount
  useEffect(() => {
    if (contextData.mealPlan.notes) {
      setNotes(contextData.mealPlan.notes);
    }
  }, [contextData.mealPlan.notes]);

  // Update context when notes change
  useEffect(() => {
    updateMealPlan({ notes });
  }, [notes, updateMealPlan]);

  // Update nutrition when basket changes
  useEffect(() => {
    updateNutrition(basketItems);
  }, [basketItems, updateNutrition]);

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : 'white', 
      minHeight: '100vh' 
    }}>
      <Grid container spacing={3} sx={{ p: 1 }}>
        {/* Left Column - Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Tabs */}
          <Box sx={{ mb: 3 }}>
            <TabContext value={tabValue}>
              <Box sx={{ 
                borderBottom: 1, 
                borderColor: 'divider', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
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
                      color: theme.palette.mode === 'dark' ? '#cccccc' : themeColors.secondary,
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
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={toggleAllSections}
                    startIcon={notesExpanded || templatesExpanded || creationFormExpanded || 
                             foodListingExpanded || graphExpanded || adimeNoteExpanded ? 
                             <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{
                      borderColor: themeColors.primary,
                      color: themeColors.primary,
                      '&:hover': { 
                        borderColor: themeColors.primaryHover,
                        backgroundColor: themeColors.primary + '10'
                      },
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      fontWeight: 600,
                      textTransform: 'none'
                    }}
                  >
                    {notesExpanded || templatesExpanded || creationFormExpanded || 
                     foodListingExpanded || graphExpanded || adimeNoteExpanded ? 
                     'Collapse All' : 'Expand All'}
                  </Button>
                  
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
              </Box>

              <TabPanel value="1" sx={{ p: 0, mt: 3 }}>
                {/* Meal Plan Notes - Collapsible */}
                <Accordion 
                  expanded={notesExpanded} 
                  onChange={() => setNotesExpanded(!notesExpanded)}
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      minHeight: 60,
                      '& .MuiAccordionSummary-content': { 
                        alignItems: 'center' 
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                    }}>
                      Meal Plan Notes
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Enter meal plan notes, dietary restrictions, or special instructions..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
                          borderRadius: 2,
                        }
                      }}
                    />
                  </AccordionDetails>
                </Accordion>

                {/* Templates Table - Collapsible */}
                <Accordion 
                  expanded={templatesExpanded} 
                  onChange={() => setTemplatesExpanded(!templatesExpanded)}
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      minHeight: 60,
                      '& .MuiAccordionSummary-content': { 
                        alignItems: 'center' 
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                    }}>
                      Meal Plan Templates
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <TemplatesTable 
                      templates={templates}
                      onEdit={handleEditTemplate}
                      onDownload={handleDownloadTemplate}
                      onView={handleViewTemplate}
                    />
                  </AccordionDetails>
                </Accordion>

                {/* Meal Plan Creation Form - Collapsible */}
                <Accordion 
                  expanded={creationFormExpanded} 
                  onChange={() => setCreationFormExpanded(!creationFormExpanded)}
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      minHeight: 60,
                      '& .MuiAccordionSummary-content': { 
                        alignItems: 'center' 
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                    }}>
                      Create New Plan
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <MealPlanCreationForm 
                      calorieNeed={calorieNeed}
                      foodExcluded={foodExcluded}
                      mealTypes={mealTypes}
                      onCalorieNeedChange={setCalorieNeed}
                      onFoodExcludedChange={setFoodExcluded}
                      onMealTypeCountChange={handleMealTypeCountChange}
                    />
                  </AccordionDetails>
                </Accordion>
              </TabPanel>

              <TabPanel value="2" sx={{ p: 0, mt: 3 }}>
                <Accordion 
                  expanded={templatesExpanded} 
                  onChange={() => setTemplatesExpanded(!templatesExpanded)}
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      minHeight: 60,
                      '& .MuiAccordionSummary-content': { 
                        alignItems: 'center' 
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                    }}>
                      Meal Plan Templates
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <TemplatesTable 
                      templates={templates}
                      onEdit={handleEditTemplate}
                      onDownload={handleDownloadTemplate}
                      onView={handleViewTemplate}
                    />
                  </AccordionDetails>
                </Accordion>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>

        {/* Right Column - Food Management and ADIME Note */}
        <Grid item xs={12} lg={4}>
          {/* Food Listing - Collapsible */}
          <Accordion 
            expanded={foodListingExpanded} 
            onChange={() => setFoodListingExpanded(!foodListingExpanded)}
            sx={{ 
              mb: 2,
              borderRadius: 2,
              boxShadow: 2,
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                minHeight: 60,
                '& .MuiAccordionSummary-content': { 
                  alignItems: 'center' 
                }
              }}
            >
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}>
                Food Basket
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <FoodListingCard 
                onFoodSelect={handleFoodSelect}
                basketItems={basketItems}
                onRemoveFromBasket={handleRemoveFromBasket}
              />
            </AccordionDetails>
          </Accordion>
          
          {/* Nutrition Graph - Collapsible */}
          <Accordion 
            expanded={graphExpanded} 
            onChange={() => setGraphExpanded(!graphExpanded)}
            sx={{ 
              mb: 2,
              borderRadius: 2,
              boxShadow: 2,
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                minHeight: 60,
                '& .MuiAccordionSummary-content': { 
                  alignItems: 'center' 
                }
              }}
            >
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}>
                Nutrition Summary
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <GraphCard 
                nutritionSummary={nutritionSummary}
                targetCalories={2200}
              />
            </AccordionDetails>
          </Accordion>
          
          {/* ADIME Note - Collapsible */}
          <Accordion 
            expanded={adimeNoteExpanded} 
            onChange={() => setAdimeNoteExpanded(!adimeNoteExpanded)}
            sx={{ 
              mb: 2,
              borderRadius: 2,
              boxShadow: 2,
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                minHeight: 60,
                '& .MuiAccordionSummary-content': { 
                  alignItems: 'center' 
                }
              }}
            >
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }}>
                ADIME Note
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <AdimeNotePanel />
            </AccordionDetails>
          </Accordion>

          {/* Completion Status Section */}
          <Card 
            sx={{ 
              borderRadius: 3, 
              boxShadow: 2, 
              height: 'fit-content',
              mt: 2,
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#FFFFFF'
            }}
          >
            <CardContent sx={{ 
              p: 3, 
              bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#F9F4F2' 
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3, 
                color: '#02BE6A' 
              }}>
                Complete Client File
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={contextData.isComplete || false}
                      onChange={(e) => setCompletionStatus(e.target.checked)}
                      sx={{
                        color: '#02BE6A',
                        '&.Mui-checked': {
                          color: '#02BE6A',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ 
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#2c3e50',
                      fontWeight: 500
                    }}>
                      Mark as complete and ready for submission
                    </Typography>
                  }
                />
              </Box>

              {!isDataComplete() && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Incomplete Data:</strong> Please ensure all required fields are filled before marking as complete.
                  </Typography>
                </Alert>
              )}

              {isDataComplete() && !contextData.isComplete && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Ready to Complete:</strong> All required data is present. You can now mark this client file as complete.
                  </Typography>
                </Alert>
              )}

              {contextData.isComplete && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Complete:</strong> This client file is marked as complete and ready for final submission.
                  </Typography>
                </Alert>
              )}

              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? '#cccccc' : '#666666',
                fontSize: '0.875rem',
                lineHeight: 1.6
              }}>
                Only check this box when you have completed all required information across all steps. 
                This will mark the client file as complete and ready for final submission.
              </Typography>
            </CardContent>
          </Card>

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