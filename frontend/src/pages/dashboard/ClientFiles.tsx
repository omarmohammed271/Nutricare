import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  LuSearch,
  LuFilter,
  LuDownload,
  LuEye,
  LuEdit,
  LuTrash2,
  LuFileText,
  LuCalendar,
  LuUser,
  LuLogOut,
  LuPlus,
  LuFolder,
  LuFile,
  LuImage,
  LuVideo,
  LuMusic,
  LuArchive
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@src/states';

interface ClientFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other';
  size: string;
  uploadDate: string;
  clientName: string;
  clientId: string;
  description?: string;
  category: string;
}

const ClientFiles = () => {
  const navigate = useNavigate();
  const { removeSession } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Sample client files data
  const [files] = useState<ClientFile[]>([
    {
      id: '1',
      name: 'Medical Report - Sarah Johnson.pdf',
      type: 'document',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      clientName: 'Sarah Johnson',
      clientId: '1',
      description: 'Comprehensive medical examination report',
      category: 'Medical Records'
    },
    {
      id: '2',
      name: 'Blood Test Results.jpg',
      type: 'image',
      size: '1.2 MB',
      uploadDate: '2024-01-14',
      clientName: 'Sarah Johnson',
      clientId: '1',
      description: 'Latest blood test results',
      category: 'Lab Results'
    },
    {
      id: '3',
      name: 'Diet Plan - Week 1.docx',
      type: 'document',
      size: '856 KB',
      uploadDate: '2024-01-13',
      clientName: 'Sarah Johnson',
      clientId: '1',
      description: 'Personalized diet plan for first week',
      category: 'Treatment Plans'
    },
    {
      id: '4',
      name: 'Progress Photos - Before.jpg',
      type: 'image',
      size: '3.1 MB',
      uploadDate: '2024-01-12',
      clientName: 'Sarah Johnson',
      clientId: '1',
      description: 'Before treatment photos',
      category: 'Progress Tracking'
    },
    {
      id: '5',
      name: 'Consultation Notes - Session 1.pdf',
      type: 'document',
      size: '1.8 MB',
      uploadDate: '2024-01-11',
      clientName: 'Sarah Johnson',
      clientId: '1',
      description: 'Detailed consultation notes from first session',
      category: 'Consultation Notes'
    },
    {
      id: '6',
      name: 'X-Ray Scan - Chest.png',
      type: 'image',
      size: '4.2 MB',
      uploadDate: '2024-01-10',
      clientName: 'Sarah Johnson',
      clientId: '1',
      description: 'Chest X-ray scan results',
      category: 'Medical Records'
    },
    {
      id: '7',
      name: 'Medication Schedule.pdf',
      type: 'document',
      size: '645 KB',
      uploadDate: '2024-01-09',
      clientName: 'Sarah Johnson',
      clientId: '1',
      description: 'Daily medication schedule and dosages',
      category: 'Treatment Plans'
    },
    {
      id: '8',
      name: 'Exercise Video - Cardio.mp4',
      type: 'video',
      size: '15.7 MB',
      uploadDate: '2024-01-08',
      clientName: 'Sarah Johnson',
      clientId: '1',
      description: 'Cardio exercise demonstration video',
      category: 'Exercise Guides'
    }
  ]);

  const handleLogout = () => {
    removeSession();
    navigate('/auth/login2');
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return <LuFileText size={20} color="#02BE6A" />;
      case 'image': return <LuImage size={20} color="#02BE6A" />;
      case 'video': return <LuVideo size={20} color="#02BE6A" />;
      case 'audio': return <LuMusic size={20} color="#02BE6A" />;
      case 'archive': return <LuArchive size={20} color="#02BE6A" />;
      default: return <LuFile size={20} color="#02BE6A" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'primary';
      case 'image': return 'success';
      case 'video': return 'error';
      case 'audio': return 'warning';
      case 'archive': return 'info';
      default: return 'default';
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const paginatedFiles = filteredFiles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Client Files
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<LuPlus />}
            sx={{ 
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white'
              }
            }}
          >
            Upload File
          </Button>
          <Button
            variant="contained"
            startIcon={<LuLogOut />}
            onClick={() => setShowLogoutDialog(true)}
            sx={{ 
              backgroundColor: 'error.main',
              '&:hover': {
                backgroundColor: 'error.dark'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ 
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        border: '1px solid',
        mb: 3
      }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search files or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LuSearch size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: 'background.paper',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>File Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="File Type"
                  sx={{ backgroundColor: 'background.paper' }}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="document">Documents</MenuItem>
                  <MenuItem value="image">Images</MenuItem>
                  <MenuItem value="video">Videos</MenuItem>
                  <MenuItem value="audio">Audio</MenuItem>
                  <MenuItem value="archive">Archives</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  label="Category"
                  sx={{ backgroundColor: 'background.paper' }}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Medical Records">Medical Records</MenuItem>
                  <MenuItem value="Lab Results">Lab Results</MenuItem>
                  <MenuItem value="Treatment Plans">Treatment Plans</MenuItem>
                  <MenuItem value="Progress Tracking">Progress Tracking</MenuItem>
                  <MenuItem value="Consultation Notes">Consultation Notes</MenuItem>
                  <MenuItem value="Exercise Guides">Exercise Guides</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={viewMode === 'grid'}
                    onChange={(e) => setViewMode(e.target.checked ? 'grid' : 'table')}
                  />
                }
                label="Grid View"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Files Display */}
      {viewMode === 'table' ? (
        <Card sx={{ 
          backgroundColor: 'background.paper',
          borderColor: 'divider',
          border: '1px solid'
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>File Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Client</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Size</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Upload Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedFiles.map((file) => (
                  <TableRow key={file.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getFileIcon(file.type)}
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {file.name}
                          </Typography>
                          {file.description && (
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {file.description}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src="/src/assets/images/landing/Group 1171275335.svg"
                          sx={{
                            width: 32,
                            height: 32,
                            objectFit: "contain",
                            backgroundColor: "transparent",
                            padding: 0.5,
                            "& img": {
                              width: "100%",
                              height: "100%",
                              objectFit: "contain"
                            }
                          }}
                        />
                        <Typography variant="body2">{file.clientName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={file.type.charAt(0).toUpperCase() + file.type.slice(1)}
                        color={getTypeColor(file.type) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{file.category}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{file.size}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{file.uploadDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <LuEye size={16} />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <LuDownload size={16} />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <LuEdit size={16} />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <LuTrash2 size={16} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {paginatedFiles.map((file) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
              <Card sx={{ 
                backgroundColor: 'background.paper',
                borderColor: 'divider',
                border: '1px solid',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {getFileIcon(file.type)}
                    <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
                      {file.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Avatar
                      src="/src/assets/images/landing/Group 1171275335.svg"
                      sx={{
                        width: 24,
                        height: 24,
                        objectFit: "contain",
                        backgroundColor: "transparent",
                        padding: 0.5,
                        "& img": {
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {file.clientName}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={file.type.charAt(0).toUpperCase() + file.type.slice(1)}
                      color={getTypeColor(file.type) as any}
                      size="small"
                    />
                    <Chip
                      label={file.category}
                      variant="outlined"
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {file.size} • {file.uploadDate}
                  </Typography>

                  {file.description && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2 }}>
                      {file.description}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <IconButton size="small" color="primary">
                      <LuEye size={16} />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <LuDownload size={16} />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <LuEdit size={16} />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <LuTrash2 size={16} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            borderColor: 'divider',
            border: '1px solid'
          }
        }}
      >
        <DialogTitle sx={{ color: 'text.primary' }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'text.secondary' }}>
            Are you sure you want to logout? You will be redirected to the login page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowLogoutDialog(false)}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{ 
              backgroundColor: 'error.main',
              '&:hover': {
                backgroundColor: 'error.dark'
              }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientFiles;
