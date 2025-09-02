import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import { FORM_STYLES } from '../constants/recipeConstants';

interface PublishRecipeSectionProps {
  isPublic: boolean;
  onPublicChange: (checked: boolean) => void;
  onPublish: () => void;
}

const PublishRecipeSection: React.FC<PublishRecipeSectionProps> = ({
  isPublic,
  onPublicChange,
  onPublish,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography sx={FORM_STYLES.sectionTitle}>
          Publish Recipe
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={(e) => onPublicChange(e.target.checked)}
              sx={{
                color: '#22C55E',
                '&.Mui-checked': {
                  color: '#22C55E',
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
              Share your recipe on your website or with the NutriCare community to inspire others and expand your reach.
            </Typography>
          }
          sx={{ alignItems: 'flex-start', ml: 0 }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={onPublish}
        sx={FORM_STYLES.publishButton}
      >
        Publish
      </Button>
    </Box>
  );
};

export default PublishRecipeSection;