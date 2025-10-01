import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Paper,
  List,
  useTheme
} from '@mui/material';
import {
  Search,
  Download,
  Folder,
  PictureAsPdf,
  VideoLibrary
} from '@mui/icons-material';
import { FolderItem, FileItem } from './types';
import StatsCard from './components/StatsCard';
import FolderComponent from './components/FolderComponent';
import FileItemComponent from './components/FileItemComponent';
import { calculateStatistics } from './utils';

// Mock data
const mockFolders: FolderItem[] = [
  {
    id: '1',
    name: 'Latest Research papers published 2025',
    expanded: true,
    files: [
      {
        id: '1-1',
        name: 'Research papers by Elizabeth Shaw, M.S., RDN, CPT.pdf',
        type: 'pdf',
        author: 'Elizabeth Shaw',
        selected: true
      },
      {
        id: '1-2',
        name: 'Research papers by Elizabeth Shaw, M.S., RDN, CPT.pdf',
        type: 'pdf',
        author: 'Elizabeth Shaw'
      },
      {
        id: '1-3',
        name: 'Research papers by Elizabeth Shaw, M.S., RDN, CPT.pdf',
        type: 'pdf',
        author: 'Elizabeth Shaw'
      },
      {
        id: '1-4',
        name: 'Research papers by Elizabeth Shaw, M.S., RDN, CPT.pdf',
        type: 'pdf',
        author: 'Elizabeth Shaw'
      }
    ]
  },
  {
    id: '2',
    name: 'Upcoming dietitian plans updates - patch notes',
    files: []
  },
  {
    id: '3',
    name: 'Emerging nutritional educational certifications',
    files: []
  },
  {
    id: '4',
    name: 'Nutrition Videos',
    files: [
      {
        id: '4-1',
        name: 'Macro Nutrition Basics.mp4',
        type: 'video'
      },
      {
        id: '4-2',
        name: 'Meal Planning Strategies.mp4',
        type: 'video'
      }
    ]
  }
];

const mockFiles: FileItem[] = [
  {
    id: 'f1',
    name: 'Notes.txt',
    type: 'note'
  }
];

const MyFiles = () => {
  const theme = useTheme();
  const [folders, setFolders] = useState<FolderItem[]>(mockFolders);
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handlers
  const handleToggleFolder = (folderId: string): void => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId 
        ? { ...folder, expanded: !folder.expanded }
        : folder
    ));
  };

  const handleToggleFileSelect = (fileId: string): void => {
    // Handle files in folders
    setFolders(prev => prev.map(folder => ({
      ...folder,
      files: folder.files.map(file => 
        file.id === fileId 
          ? { ...file, selected: !file.selected }
          : file
      )
    })));

    // Handle standalone files
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, selected: !file.selected }
        : file
    ));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleDownload = (): void => {
    // Implementation would handle download logic
    console.log('Download selected files');
  };

  // Calculate statistics
  const { totalFolders, totalFiles, totalMedia } = calculateStatistics(folders, files);

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ color: '#02BE6A', fontWeight: 600 }}>
          Client Onboarding
        </Typography>
      </Box>

      {/* Search and Download */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          placeholder="Search"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ 
            minWidth: 300,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff',
            '& .MuiInputBase-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'inherit'
            }
          }}
        />
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={handleDownload}
          sx={{ 
            ml: 'auto',
            color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'inherit'
          }}
        >
          Download
        </Button>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'row-reverse' ,width: '100%', justifyContent:'space-between' ,gap:3 }}>
        {/* Stats Cards */}
        <Box sx={{width: '40%' ,display: 'flex', flexDirection: 'column' , gap:2}}>
          <Box>
            <StatsCard
              title="Folders"
              count={totalFolders}
              color="linear-gradient(135deg, #02BE6A 0%, #6ED475 100%)"
              icon={<Folder sx={{ fontSize: 40 }} />}
            />
          </Box>
          <Box >
            <StatsCard
              title="Files"
              count={totalFiles}
              color="linear-gradient(135deg, #00C897 0%, #00C89780 100%)"
              icon={<PictureAsPdf sx={{ fontSize: 40 }} />}
            />
          </Box>
          <Box >
            <StatsCard
              title="Media"
              count={totalMedia}
              color="linear-gradient(135deg, #4DA55A 0%, #02BE6A 100%)"
              icon={<VideoLibrary sx={{ fontSize: 40 }} />}
            />
          </Box>
          <Box>
            {/* Placeholder for fourth card */}
            <Box sx={{ height: 120 }} />
          </Box>
        </Box>

        <Box sx={{width: '80%'}}>
          {/* Files Section */}
          <Box>
            <Paper sx={{ p: 2 ,bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F9F4F2' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2" sx={{ color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}>
                  Files
                </Typography>
                <Chip label="Folders" variant="outlined" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'inherit'
                }} />
              </Box>

              {/* Folders */}
              {folders.map((folder) => (
                <FolderComponent
                  key={folder.id}
                  folder={folder}
                  onToggleExpand={handleToggleFolder}
                  onToggleFileSelect={handleToggleFileSelect}
                />
              ))}

              {/* Standalone Files */}
              {files.map((file) => (
                <List key={file.id} dense sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff' }}>
                  <FileItemComponent
                    file={file}
                    onToggleSelect={handleToggleFileSelect}
                  />
                </List>
              ))}
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyFiles;