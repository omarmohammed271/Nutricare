import React from 'react';
import { Box, Typography } from '@mui/material';
import { LuImage, LuUpload } from 'react-icons/lu';

interface ImageUploadSectionProps {
  onImageSelect: (file: File | null) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ onImageSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageSelect(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    onImageSelect(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      

        border: '2px dashed #22C55E',
        borderRadius: 2,
        p: 6,
        height:'400px',
        textAlign: 'center',
        backgroundColor: '#F9FAFB',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#F3F4F6',
          borderColor: '#16A34A',
        },
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById('recipe-image-upload')?.click()}
    >
      <LuImage size={48} color="#22C55E" style={{ marginBottom: 16 }} />
      <Typography sx={{ color: '#22C55E', fontWeight: 500, mb: 1 }}>
        Click to upload
      </Typography>
      <Typography sx={{ color: '#6B7280', fontSize: '14px', mb: 1 }}>
        or drag and drop
      </Typography>
      <Typography sx={{ color: '#9CA3AF', fontSize: '12px' }}>
        JPG, JPEG, PNG files less than 1MB
      </Typography>
      
      <input
        id="recipe-image-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ImageUploadSection;