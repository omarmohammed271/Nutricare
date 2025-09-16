import React from 'react';
import { Box, Typography, Card, Chip, useTheme } from '@mui/material';
import { LuHeart, LuClock, LuUsers, LuZap } from 'react-icons/lu';

interface RecipeCardProps {
  recipeName: string;
  creatorName: string;
  image?: string;
  energy: number;
  weight: string;
  servings: string;
  tags: string[];
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipeName,
  creatorName,
  image,
  energy,
  weight,
  servings,
  tags,
  isFavorite = false,
  onFavoriteClick,
  onClick
}) => {
  const theme = useTheme();
  
  return (
    <Card
      onClick={onClick}
      sx={{
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        height: 120,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'dark' ? '0 4px 16px rgba(0, 0, 0, 0.5)' : '0 4px 16px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          minWidth: 120,
          backgroundImage: image ? `url(${image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Tag Chip */}
        {tags.length > 0 && (
          <Chip
            label={tags[0]}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: '#02BE6A',
              color: 'white',
              fontWeight: 600,
              fontSize: '10px',
              height: 20,
              borderRadius: '10px',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        )}
        
        {/* Favorite Button */}
        <Box
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick?.();
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.9)' : 'white',
              transform: 'scale(1.1)',
            },
          }}
        >
          <LuHeart
            size={14}
            style={{
              color: isFavorite ? '#EF4444' : theme.palette.mode === 'dark' ? '#d4d4d4' : '#6B7280',
              fill: isFavorite ? '#EF4444' : 'none',
            }}
          />
        </Box>

        {/* Placeholder if no image */}
        {!image && (
          <Box
            sx={{
              color: 'white',
              textAlign: 'center',
              opacity: 0.7,
            }}
          >
            <LuZap size={24} />
          </Box>
        )}
      </Box>

      {/* Content Section */}
      <Box sx={{ 
        p: 2, 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Top Section: Title & Creator */}
        <Box>
          {/* Recipe Name */}
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 0.5,
              lineHeight: 1.2,
            }}
          >
            {recipeName}
          </Typography>

          {/* Creator */}
          <Typography
            sx={{
              fontSize: '12px',
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
            }}
          >
            Creator Name: {creatorName}
          </Typography>
        </Box>

        {/* Bottom Section: Nutrition Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            mt: 1,
          }}
        >
          {/* Energy */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LuZap size={12} style={{ color: '#F59E0B' }} />
            <Typography sx={{ fontSize: '11px', color: theme.palette.text.secondary }}>
              {energy} kcal
            </Typography>
          </Box>

          {/* Weight */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                backgroundColor: '#10B981',
              }}
            />
            <Typography sx={{ fontSize: '11px', color: theme.palette.text.secondary }}>
              {weight}g
            </Typography>
          </Box>

          {/* Servings */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LuUsers size={12} style={{ color: '#8B5CF6' }} />
            <Typography sx={{ fontSize: '11px', color: theme.palette.text.secondary }}>
              {servings}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default RecipeCard;