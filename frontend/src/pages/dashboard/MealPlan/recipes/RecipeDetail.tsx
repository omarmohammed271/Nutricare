import React from 'react';
import { Box, Typography, IconButton, Chip, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LuArrowLeft, LuHeart, LuClock, LuUsers, LuZap } from 'react-icons/lu';

interface RecipeDetailProps {
  recipe: {
    id: string;
    recipeName: string;
    creatorName: string;
    image?: string;
    description: string;
    finalWeight: string;
    numberOfPortions: string;
    tags: string[];
    ingredients: Array<{
      id: string;
      name: string;
      quantity: string;
      unit: string;
    }>;
    cookingMethod: string;
    nutritionData: {
      energy: number;
      fat: number;
      carbohydrates: number;
      protein: number;
      fiber: number;
    };
  };
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const nutritionData = [
    { label: 'Energy', per100g: recipe.nutritionData.energy, perPortion: Math.round(recipe.nutritionData.energy * parseFloat(recipe.finalWeight) / 100 / parseFloat(recipe.numberOfPortions)) },
    { label: 'Fat', per100g: recipe.nutritionData.fat, perPortion: Math.round(recipe.nutritionData.fat * parseFloat(recipe.finalWeight) / 100 / parseFloat(recipe.numberOfPortions)) },
    { label: 'Fatty Acid', per100g: Math.round(recipe.nutritionData.fat * 0.3), perPortion: Math.round(recipe.nutritionData.fat * 0.3 * parseFloat(recipe.finalWeight) / 100 / parseFloat(recipe.numberOfPortions)) },
    { label: 'Cholesterol', per100g: 0, perPortion: 0 },
    { label: 'Sodium', per100g: 0, perPortion: 0 },
    { label: 'Carbohydrates', per100g: recipe.nutritionData.carbohydrates, perPortion: Math.round(recipe.nutritionData.carbohydrates * parseFloat(recipe.finalWeight) / 100 / parseFloat(recipe.numberOfPortions)) },
    { label: 'Sugars', per100g: Math.round(recipe.nutritionData.carbohydrates * 0.4), perPortion: Math.round(recipe.nutritionData.carbohydrates * 0.4 * parseFloat(recipe.finalWeight) / 100 / parseFloat(recipe.numberOfPortions)) },
    { label: 'Fiber', per100g: recipe.nutritionData.fiber, perPortion: Math.round(recipe.nutritionData.fiber * parseFloat(recipe.finalWeight) / 100 / parseFloat(recipe.numberOfPortions)) },
  ];

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ 
        position: 'relative',
        height: 300,
        backgroundImage: recipe.image ? `url(${recipe.image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Overlay */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }} />

        {/* Back Button */}
        <IconButton
          onClick={onBack}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#374151',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          <LuArrowLeft size={20} />
        </IconButton>

        {/* Favorite Button */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#6B7280',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
        >
          <LuHeart size={20} />
        </IconButton>

        {/* Recipe Title */}
        <Box sx={{ 
          textAlign: 'center', 
          color: 'white', 
          position: 'relative', 
          zIndex: 1,
          px: 4 
        }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {recipe.recipeName}
          </Typography>
          <Typography sx={{ fontSize: '18px', opacity: 0.9 }}>
            {recipe.description}
          </Typography>
        </Box>

        {/* Recipe Stats */}
        <Box sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 2,
          p: 2,
          color: '#374151',
        }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
            Final weight: {recipe.finalWeight} gm
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            {recipe.numberOfPortions} portions
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={4}>
          {/* Left Column - Ingredients & Cooking Method */}
          <Grid item xs={12} md={8}>
            {/* Creator Info */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '16px', color: '#6B7280', fontStyle: 'italic' }}>
                Creator Name: {recipe.creatorName}
              </Typography>
            </Box>

            {/* Tags */}
            <Box sx={{ mb: 4 }}>
              {recipe.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    backgroundColor: '#02BE6A',
                    color: 'white',
                    fontWeight: 600,
                    mr: 1,
                    mb: 1,
                  }}
                />
              ))}
            </Box>

            {/* Ingredients */}
            <Card sx={{ mb: 4, borderLeft: '4px solid #02BE6A' }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#02BE6A', 
                  fontWeight: 700, 
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: 1 
                }}>
                  INGREDIENTS
                </Typography>
                <Grid container spacing={2}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <Grid item xs={12} sm={6} key={ingredient.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#02BE6A',
                          mr: 2,
                        }} />
                        <Typography sx={{ fontSize: '14px' }}>
                          {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Cooking Method */}
            <Card sx={{ borderLeft: '4px solid #02BE6A' }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#02BE6A', 
                  fontWeight: 700, 
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: 1 
                }}>
                  COOKING METHOD
                </Typography>
                <Typography sx={{ 
                  fontSize: '14px', 
                  lineHeight: 1.8,
                  color: '#374151'
                }}>
                  {recipe.cookingMethod}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Nutrition Information */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#02BE6A', 
                  fontWeight: 700, 
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: 1 
                }}>
                  NUTRITIONAL INFORMATION
                </Typography>
                
                <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '2px solid #E5E7EB' }}>
                          
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '2px solid #E5E7EB' }}>
                          Per 100 g
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, borderBottom: '2px solid #E5E7EB' }}>
                          Per portion
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {nutritionData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ 
                            fontWeight: 500,
                            color: '#374151',
                            borderBottom: '1px solid #F3F4F6'
                          }}>
                            {row.label}
                          </TableCell>
                          <TableCell sx={{ 
                            color: '#6B7280',
                            borderBottom: '1px solid #F3F4F6'
                          }}>
                            {row.per100g}
                          </TableCell>
                          <TableCell sx={{ 
                            color: '#6B7280',
                            borderBottom: '1px solid #F3F4F6'
                          }}>
                            {row.perPortion}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Chef Illustration */}
                <Box sx={{ 
                  mt: 4, 
                  textAlign: 'center',
                  opacity: 0.7
                }}>
                  <Box sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cg fill=\'%2302BE6A\'%3E%3Ccircle cx=\'100\' cy=\'80\' r=\'40\'/%3E%3Crect x=\'80\' y=\'120\' width=\'40\' height=\'60\' rx=\'5\'/%3E%3Ccircle cx=\'85\' cy=\'70\' r=\'3\'/%3E%3Ccircle cx=\'115\' cy=\'70\' r=\'3\'/%3E%3Cpath d=\'M90 85 Q100 95 110 85\' stroke=\'%2302BE6A\' stroke-width=\'2\' fill=\'none\'/%3E%3Cpath d=\'M70 50 Q100 30 130 50 Q100 20 70 50\' /%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RecipeDetail;