import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox
} from '@mui/material';
import { FileItem } from '../types';
import FileIcon from './FileIcon';

interface FileItemComponentProps {
  file: FileItem;
  onToggleSelect: (fileId: string) => void;
}

const FileItemComponent: React.FC<FileItemComponentProps> = ({ file, onToggleSelect }) => (
  <ListItem dense>
    <ListItemIcon>
      <Checkbox
        edge="start"
        checked={file.selected || false}
        onChange={() => onToggleSelect(file.id)}
        size="small"
      />
    </ListItemIcon>
    <ListItemIcon>
      <FileIcon type={file.type} />
    </ListItemIcon>
    <ListItemText
      primary={file.name}
      primaryTypographyProps={{ 
        fontSize: '0.875rem',
        sx: { wordBreak: 'break-all' }
      }}
    />
  </ListItem>
);

export default FileItemComponent;