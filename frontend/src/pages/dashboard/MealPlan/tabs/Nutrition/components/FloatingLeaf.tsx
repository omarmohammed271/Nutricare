import React from 'react';
import { Box, keyframes } from '@mui/material';

interface FloatingLeafProps {
  top: string;
  left: string;
  delay: string;
  size: number;
}

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.9;
  }
  25% {
    transform: translateY(-20px) rotate(45deg) scale(1.1);
    opacity: 1;
  }
  50% {
    transform: translateY(-35px) rotate(90deg) scale(0.9);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-15px) rotate(135deg) scale(1.05);
    opacity: 1;
  }
  100% {
    transform: translateY(0px) rotate(180deg) scale(1);
    opacity: 0.9;
  }
`;

const FloatingLeaf = ({ top, left, delay, size }: FloatingLeafProps) => {
  // Random leaf type for variety
  const leafType = Math.floor(Math.random() * 3);
  
  const leafStyle = {
    position: 'absolute' as const,
    top,
    left,
    width: size,
    height: size,
    animation: `${float} 6s ease-in-out infinite`,
    animationDelay: delay,
    zIndex: 10,
    opacity: 0.85,
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
  };

  const getLeafShape = () => {
    switch(leafType) {
      case 0: // Maple leaf
        return "M12 2 C10 4 8 6 6 9 C4 12 5 15 8 16 C10 17 12 18 12 22 C12 18 14 17 16 16 C19 15 20 12 18 9 C16 6 14 4 12 2 Z M8 10 C6 8 8 6 10 8 M16 10 C18 8 16 6 14 8 M10 14 C8 12 10 10 12 12 M14 14 C16 12 14 10 12 12";
      case 1: // Oak leaf
        return "M12 2 C11 4 10 6 8 8 C6 10 5 12 6 14 C7 16 9 17 11 18 C11.5 19 12 20 12 22 C12 20 12.5 19 13 18 C15 17 17 16 18 14 C19 12 18 10 16 8 C14 6 13 4 12 2 Z M9 9 C7 7 9 5 11 7 M15 9 C17 7 15 5 13 7 M10 13 C8 11 10 9 12 11 M14 13 C16 11 14 9 12 11";
      default: // Simple autumn leaf
        return "M12 2 C10.5 4.5 9 7 7.5 10 C6 13 6.5 16 9 17.5 C10.5 18.5 11.5 19.5 12 22 C12.5 19.5 13.5 18.5 15 17.5 C17.5 16 18 13 16.5 10 C15 7 13.5 4.5 12 2 Z";
    }
  };

  return (
    <Box sx={leafStyle}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Golden Yellow Gradient */}
          <radialGradient id={`goldenGrad-${top}-${left}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} /> {/* Gold */}
            <stop offset="40%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} /> {/* Orange */}
            <stop offset="100%" style={{ stopColor: '#FF6347', stopOpacity: 1 }} /> {/* Tomato */}
          </radialGradient>
          
          {/* Warm Orange Gradient */}
          <radialGradient id={`orangeGrad-${top}-${left}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" style={{ stopColor: '#FFCC02', stopOpacity: 1 }} /> {/* Golden */}
            <stop offset="50%" style={{ stopColor: '#FF8C00', stopOpacity: 1 }} /> {/* Dark Orange */}
            <stop offset="100%" style={{ stopColor: '#D2691E', stopOpacity: 1 }} /> {/* Chocolate */}
          </radialGradient>
          
          {/* Autumn Red Gradient */}
          <radialGradient id={`redGrad-${top}-${left}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} /> {/* Gold */}
            <stop offset="30%" style={{ stopColor: '#FF4500', stopOpacity: 1 }} /> {/* Orange Red */}
            <stop offset="100%" style={{ stopColor: '#8B0000', stopOpacity: 1 }} /> {/* Dark Red */}
          </radialGradient>
        </defs>
        
        {/* Beautiful autumn leaf */}
        <path
          d={getLeafShape()}
          fill={leafType === 0 ? `url(#goldenGrad-${top}-${left})` : 
                leafType === 1 ? `url(#orangeGrad-${top}-${left})` : 
                `url(#redGrad-${top}-${left})`}
          stroke="#8B4513"
          strokeWidth="0.8"
          opacity="0.95"
        />
        
        {/* Central vein */}
        <path
          d="M12 2 Q12 8 12 14 Q12 18 12 22"
          stroke="#654321"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        
        {/* Detailed side veins */}
        <path
          d="M12 5 Q9 7 7 9 M12 5 Q15 7 17 9 M12 8 Q10 10 8 12 M12 8 Q14 10 16 12 M12 11 Q10.5 13 9 15 M12 11 Q13.5 13 15 15 M12 14 Q11 16 10 18 M12 14 Q13 16 14 18"
          stroke="#8B4513"
          strokeWidth="0.6"
          fill="none"
          opacity="0.5"
        />
        
        {/* Highlights for realism */}
        <ellipse
          cx="10"
          cy="8"
          rx="1.5"
          ry="1"
          fill="#FFE55C"
          opacity="0.6"
          transform="rotate(25)"
        />
        <ellipse
          cx="14"
          cy="12"
          rx="1"
          ry="0.8"
          fill="#FFE55C"
          opacity="0.4"
          transform="rotate(-15)"
        />
      </svg>
    </Box>
  );
};

export default FloatingLeaf;