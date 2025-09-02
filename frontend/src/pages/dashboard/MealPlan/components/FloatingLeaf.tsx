import React from 'react';
import { Box } from '@mui/material';

interface FloatingLeafProps {
  top: string;
  left: string;
  delay: string;
  size?: number;
}

const FloatingLeaf: React.FC<FloatingLeafProps> = ({ top, left, delay, size = 20 }) => (
  <Box
    sx={{
      position: 'absolute',
      top,
      left,
      width: size,
      height: size,
      backgroundColor: '#FFA726',
      borderRadius: '0 100% 0 100%',
      opacity: 0.7,
      animation: `fall 4s infinite ease-in-out`,
      animationDelay: delay,
      zIndex: 100,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '2px',
        backgroundColor: '#E65100',
        borderRadius: '1px',
      },
      '@keyframes fall': {
        '0%': {
          transform: 'translateY(-10px) rotate(0deg)',
          opacity: 0.7,
        },
        '50%': {
          transform: 'translateY(10px) rotate(180deg)',
          opacity: 1,
        },
        '100%': {
          transform: 'translateY(-10px) rotate(360deg)',
          opacity: 0.7,
        },
      },
    }}
  />
);

export default FloatingLeaf;