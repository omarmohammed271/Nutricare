import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Alert
} from '@mui/material';
import { FoodItem, SelectedFood } from '../types';

interface FoodSelectionDialogProps {
  open: boolean;
  mealId: string;
  selectedFood: FoodItem | null;
  onClose: () => void;
  onAddFood: (food: SelectedFood) => void;
}

const FoodSelectionDialog: React.FC<FoodSelectionDialogProps> = ({
  open,
  mealId,
  selectedFood,
  onClose,
  onAddFood
}) => {
  const [grams, setGrams] = useState<number>(100);
  const [calculatedNutrition, setCalculatedNutrition] = useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fiber: 0
  });

  useEffect(() => {
    if (selectedFood && grams > 0) {
      const ratio = grams / 100;
      setCalculatedNutrition({
        calories: Math.round(selectedFood.caloriesPer100g * ratio),
        carbs: Math.round((selectedFood.carbsPer100g * ratio) * 10) / 10,
        protein: Math.round((selectedFood.proteinPer100g * ratio) * 10) / 10,
        fat: Math.round((selectedFood.fatPer100g * ratio) * 10) / 10,
        fiber: Math.round((selectedFood.fiberPer100g * ratio) * 10) / 10
      });
    }
  }, [selectedFood, grams]);

  const handleAddFood = () => {
    if (!selectedFood || grams <= 0) return;

    const foodToAdd: SelectedFood = {
      foodId: selectedFood.id,
      name: selectedFood.name,
      grams,
      calories: calculatedNutrition.calories,
      carbs: calculatedNutrition.carbs,
      protein: calculatedNutrition.protein,
      fat: calculatedNutrition.fat,
      fiber: calculatedNutrition.fiber,
      mealId
    };

    onAddFood(foodToAdd);
    setGrams(100);
    onClose();
  };

  const handleClose = () => {
    setGrams(100);
    onClose();
  };

  if (!selectedFood) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48,
              backgroundColor: selectedFood.color + '20',
              fontSize: '1.5rem'
            }}
          >
            {selectedFood.icon}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Add {selectedFood.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Specify the amount and see nutritional breakdown
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          {/* Amount Input */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#f8f9fa', border: '1px solid #e9ecef' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Amount
                </Typography>
                <TextField
                  label="Grams"
                  type="number"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(0, parseInt(e.target.value) || 0))}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff'
                    }
                  }}
                />
                {grams <= 0 && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Please enter a valid amount greater than 0 grams
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Nutritional Breakdown */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#f8f9fa', border: '1px solid #e9ecef' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Nutritional Values ({grams}g)
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Calories
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4CAF50' }}>
                      {calculatedNutrition.calories} kcal
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Carbohydrates</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {calculatedNutrition.carbs}g
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Protein</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {calculatedNutrition.protein}g
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Fat</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {calculatedNutrition.fat}g
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Fiber</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {calculatedNutrition.fiber}g
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Reference Values (per 100g) */}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Reference values per 100g: {selectedFood.caloriesPer100g} kcal, 
              {selectedFood.carbsPer100g}g carbs, {selectedFood.proteinPer100g}g protein, 
              {selectedFood.fatPer100g}g fat, {selectedFood.fiberPer100g}g fiber
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleAddFood} 
          variant="contained" 
          disabled={grams <= 0}
          sx={{ 
            bgcolor: '#4CAF50',
            '&:hover': { bgcolor: '#45a049' },
            px: 3
          }}
        >
          Add to Meal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FoodSelectionDialog;