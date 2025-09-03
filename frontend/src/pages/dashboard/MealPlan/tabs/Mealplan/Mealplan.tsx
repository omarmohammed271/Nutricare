import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Grid,
  Chip,
  IconButton,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  NoteAdd as NoteAddIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';

import { 
  MealCounter, 
  MealData, 
  FormData, 
  NoteDialogState 
} from './types';
import { 
  clientOptions,
  diagnosisOptions,
  foodExcludedOptions,
  mealTypes,
  defaultFormData,
  defaultMealCounters
} from './data';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const Mealplan = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [mealCounters, setMealCounters] = useState<MealCounter>(defaultMealCounters);
  const [generatedMeals, setGeneratedMeals] = useState<MealData[]>([]);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [noteDialog, setNoteDialog] = useState<NoteDialogState>({ 
    open: false, 
    mealId: '', 
    currentNote: '' 
  });

  const handleSliderChange = (macroType: 'carbs' | 'protein' | 'fat') => (event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    const otherTwo = 100 - value;
    const halfOther = otherTwo / 2;

    if (macroType === 'carbs') {
      setFormData(prev => ({ ...prev, carbs: value, protein: halfOther, fat: halfOther }));
    } else if (macroType === 'protein') {
      setFormData(prev => ({ ...prev, protein: value, carbs: halfOther, fat: halfOther }));
    } else {
      setFormData(prev => ({ ...prev, fat: value, carbs: halfOther, protein: halfOther }));
    }
  };

  const handleCounterChange = (mealType: keyof MealCounter, increment: boolean) => {
    setMealCounters(prev => ({
      ...prev,
      [mealType]: Math.max(0, prev[mealType] + (increment ? 1 : -1))
    }));
  };

  const generatePlan = () => {
    const meals: MealData[] = [];
    
    Object.entries(mealCounters).forEach(([type, count]) => {
      for (let i = 0; i < count; i++) {
        meals.push({
          id: `${type}-${i}`,
          type: mealTypes.find(m => m.key === type)?.label || type,
          foods: [],
          notes: ''
        });
      }
    });
    
    setGeneratedMeals(meals);
    setPlanGenerated(true);
  };

  const handleAddNote = (mealId: string) => {
    const meal = generatedMeals.find(m => m.id === mealId);
    setNoteDialog({
      open: true,
      mealId,
      currentNote: meal?.notes || ''
    });
  };

  const saveNote = () => {
    setGeneratedMeals(prev => prev.map(meal => 
      meal.id === noteDialog.mealId 
        ? { ...meal, notes: noteDialog.currentNote }
        : meal
    ));
    setNoteDialog({ open: false, mealId: '', currentNote: '' });
  };


    const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (




    <Box sx={{ width: '100%', p: 0.5 }}>

      
      {/* Form Section */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 2 ,bgcolor:'#F9F4F2', width:'60%' }}>
        <CardContent sx={{ p: 2 }}>
            <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'left' }}>
            Create New Plan
          </Typography>
    <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="meal plan tabs" 
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#02BE6A',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                color: '#666',
                '&.Mui-selected': {
                  color: '#02BE6A',
                  fontWeight: 700,
                },
              },
            }}
          >
            <Tab label="Meal Planning" value="1" />
            <Tab label="Meal Templates" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{width:'100%', p: 0}}>
     
   
          
          <Grid container spacing={3} sx={{mt:2}}  >
            {/* Client Name */}
            <Grid item xs={12} md={12} sx={{display: 'flex', flexDirection:'row' ,gap:1, alignItems:'center'}}>
                <Typography variant="h6" sx={{fontWeight: 600 ,width:'20%'}}>
                  Client Name
                </Typography>
              <Autocomplete
              sx={{width:'100%'}}
                options={clientOptions}
                value={formData.clientName}
                onChange={(event, newValue) => setFormData(prev => ({ ...prev, clientName: newValue || '' }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Client Name"
                    placeholder="Write"
                    fullWidth
                    sx={{
                        minWidth: '100%',
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#FFFFFF'
                      }
                    }}
                  />
                )}
              />
            </Grid>

            {/* Diagnosis */}
            <Grid item xs={12} md={12} sx={{display: 'flex', flexDirection:'row' ,gap:1, alignItems:'center'}}>
            <Typography variant="h6" sx={{fontWeight: 600 ,width:'20%'}}>
                  Diagnosis
                </Typography>
              <FormControl sx={{width:'100%'}}>
                <InputLabel>Diagnosis</InputLabel>
                <Select
                  value={formData.diagnosis}
                  label="Diagnosis"
                  onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                  sx={{
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  {diagnosisOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Calorie Need */}
            <Grid item xs={12} md={12} sx={{display: 'flex', flexDirection:'row' ,gap:1, alignItems:'center'}}>
            <Typography variant="h6" sx={{fontWeight: 600 ,width:'20%'}}>
                  Calorie Need
                </Typography>
              <TextField
                label="Calorie need"
                placeholder="Write"
                type="number"
                value={formData.calorieNeed}
                onChange={(e) => setFormData(prev => ({ ...prev, calorieNeed: e.target.value }))}
                sx={{
                  width:'100%',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF'
                  }
                }}
              />
            </Grid>

            {/* Food Excluded */}
          
            {/* Macronutrient Distribution */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Macronutrients Distribution %
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Typography gutterBottom>Carbs</Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={formData.carbs}
                      onChange={handleSliderChange('carbs')}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ color: '#4CAF50' }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {Math.round(formData.carbs)}%
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography gutterBottom>Proteins</Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={formData.protein}
                      onChange={handleSliderChange('protein')}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ color: '#4CAF50' }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {Math.round(formData.protein)}%
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography gutterBottom>Fats</Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={formData.fat}
                      onChange={handleSliderChange('fat')}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ color: '#4CAF50' }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {Math.round(formData.fat)}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Food Excluded */}
            <Grid item xs={12} md={12} sx={{display: 'flex', flexDirection:'row' ,gap:1, alignItems:'center'}}>
                <Typography variant="h6" sx={{fontWeight: 600 }}>
                  Food Excluded
                </Typography>
              <FormControl sx={{width:'85%'}}>
                <InputLabel>Food Excluded</InputLabel>
                <Select
                  multiple
                  value={formData.foodExcluded}
                  onChange={(e) => setFormData(prev => ({ ...prev, foodExcluded: e.target.value as string[] }))}
                  input={<OutlinedInput label="Food Excluded" />}
                  sx={{
                    backgroundColor: '#FFFFFF'
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {foodExcludedOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

    <Divider variant="middle" component="li" sx={{mt: 4 ,borderColor:'#9B9B9B'}} />
          {/* Meal Counters */}
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {mealTypes.map((meal) => (
                <Grid item xs={6} md={4} key={meal.key}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    bgcolor: '#f8f9fa'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {meal.label}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleCounterChange(meal.key as keyof MealCounter, false)}
                        sx={{ bgcolor: '#4CAF50', color: 'white', width: 24, height: 24 }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ minWidth: 20, textAlign: 'center', fontWeight: 600 }}>
                        {mealCounters[meal.key as keyof MealCounter]}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => handleCounterChange(meal.key as keyof MealCounter, true)}
                        sx={{ bgcolor: '#4CAF50', color: 'white', width: 24, height: 24 }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Generate Plan Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={generatePlan}
            sx={{
              mt: 4,
              py: 2,
              bgcolor: '#4CAF50',
              '&:hover': { bgcolor: '#45a049' },
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            Generate Plan
          </Button>

            </TabPanel>

        <TabPanel value="2" sx={{width:'100%', p: 2}}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Meal Templates
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse and select from pre-made meal templates to quickly create meal plans.
          </Typography>
        </TabPanel>
      </TabContext>
             </Box>
        </CardContent>
  
        {/* Generated Meals Section */}
        {planGenerated && (
          <Grid container spacing={2} sx={{ p: 4 }}>
            {generatedMeals.map((meal) => (
              <Grid item xs={12} md={12} key={meal.id}>
                <Card sx={{ borderRadius: 2, boxShadow: 2, p: 1, bgcolor: '#F9F4F2' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                        {meal.type}
                      </Typography>
                      <Chip 
                        label={meal.id.split('-')[1] ? `#${parseInt(meal.id.split('-')[1]) + 1}` : '#1'}
                        size="small"
                        sx={{ bgcolor: '#4CAF50', color: 'white' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<RestaurantIcon />}
                        sx={{ 
                          flexGrow: 1,
                          color: '#4CAF50',
                          borderColor: '#4CAF50',
                          '&:hover': { bgcolor: '#f1f8e9' }
                        }}
                      >
                        Add New Food
                      </Button>
                      
                      <IconButton
                        onClick={() => handleAddNote(meal.id)}
                        sx={{ 
                          bgcolor: '#4CAF50',
                          color: 'white',
                          '&:hover': { bgcolor: '#45a049' }
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    
                    <Button
                      variant="outlined"
                      startIcon={<NoteAddIcon />}
                      fullWidth
                      onClick={() => handleAddNote(meal.id)}
                      sx={{ 
                        mt: 1,
                        color: '#4CAF50',
                        borderColor: '#4CAF50',
                        '&:hover': { bgcolor: '#f1f8e9' }
                      }}
                    >
                      Add Note
                    </Button>
                    
                    {meal.notes && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Note:</strong> {meal.notes}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

      </Card>

      {/* Note Dialog */}
      <Dialog open={noteDialog.open} onClose={() => setNoteDialog({ open: false, mealId: '', currentNote: '' })} maxWidth="sm" fullWidth>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={noteDialog.currentNote}
            onChange={(e) => setNoteDialog(prev => ({ ...prev, currentNote: e.target.value }))}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF'
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialog({ open: false, mealId: '', currentNote: '' })}>
            Cancel
          </Button>
          <Button onClick={saveNote} variant="contained" sx={{ bgcolor: '#4CAF50' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    
  );
};

export default Mealplan;