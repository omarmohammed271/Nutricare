import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  useTheme,
  Typography
} from '@mui/material';
import {
  ExpandMore,
  Folder,
  FolderOpen
} from '@mui/icons-material';
import { FolderItem } from '../types';
import FileItemComponent from './FileItemComponent';

interface FolderComponentProps {
  folder: FolderItem;
  onToggleExpand: (folderId: string) => void;
  onToggleFileSelect: (fileId: string) => void;
}

const FolderComponent: React.FC<FolderComponentProps> = ({ 
  folder, 
  onToggleExpand, 
  onToggleFileSelect 
}) => {
  const theme = useTheme();
  
  return (
    <Accordion 
      expanded={folder.expanded || false}
      onChange={() => onToggleExpand(folder.id)}
      sx={{ 
        boxShadow: 'none', 
        '&:before': { display: 'none' },
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'
      }}
    >
      <AccordionSummary 
        expandIcon={<ExpandMore />}
        sx={{ 
          '& .MuiAccordionSummary-content': { 
            alignItems: 'center',
            gap: 1
          },
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'
        }}
      >
        {folder.expanded ? <FolderOpen color="primary" /> : <Folder color="action" />}
        <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>
          {folder.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff' }}>
        <List dense>
          {folder.files.map((file) => (
            <FileItemComponent
              key={file.id}
              file={file}
              onToggleSelect={onToggleFileSelect}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default FolderComponent;