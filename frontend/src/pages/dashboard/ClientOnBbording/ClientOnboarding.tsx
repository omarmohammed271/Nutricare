import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  InputAdornment,
  Pagination,
  useTheme
} from "@mui/material";
import { LuEye, LuX, LuUserPlus, LuList, LuSquare, LuSearch, LuPlus, LuCalendar, LuTrash2, LuFilter } from "react-icons/lu";
import PageMetaData from "@src/components/PageMetaData";
import { getClients } from "@src/api/endpoints";
import AddEditEvent from "./componenets/AddEditEvent";

interface LabResult {
  id: number;
  test_name: string;
  result: string;
  reference_range: string;
  interpretation: string;
  file: string | null;
  date: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  notes: string;
}

interface Client {
  id: number;
  name: string;
  gender: string;
  age: number;
  date_of_birth: string;
  weight: number;
  height: number;
  physical_activity: string;
  ward_type: string;
  stress_factor: string;
  feeding_type: string;
  lab_results: LabResult[];
  medications: Medication[];
}

const ClientOnboarding = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [wardFilter, setWardFilter] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    status: "Pending"
  });

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching clients from API...');
        const clientsData = await getClients();
        console.log('✅ Clients fetched successfully:', clientsData);
        setClients(clientsData);
      } catch (err) {
        console.error('❌ Failed to fetch clients:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = () => {
    if (newClient.name && newClient.profession && newClient.email) {
      // Note: This creates a minimal client object for display purposes
      // In a real app, you would call an API to create the client
      const client: Client = {
        id: clients.length + 1,
        name: newClient.name,
        gender: "unknown",
        age: 0,
        date_of_birth: new Date().toISOString().split('T')[0],
        weight: 0,
        height: 0,
        physical_activity: "sedentary",
        ward_type: "outpatient",
        stress_factor: "none",
        feeding_type: "oral",
        lab_results: [],
        medications: []
      };
      setClients([...clients, client]);
      setNewClient({ name: "", profession: "", email: "", phone: "", status: "Pending" });
      setShowAddForm(false);
    }
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setShowViewDialog(true);
  };

  const handleAddNewClient = () => {
    navigate('/client-file');
  };

  return (
    <>
      <PageMetaData title="Client Onboarding" />
      
      <Box sx={{ p: 3 }}>

        {/* Header Section */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 4 
        }}>
          <Button
            variant="contained"
            startIcon={<LuUserPlus size={16} />}
            onClick={handleAddNewClient}
            sx={{
              backgroundColor: "#02BE6A",
              color: "white",
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#029e56",
              }
            }}
          >
            Add New Client +
          </Button>
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => setViewMode('table')}
              sx={{
                backgroundColor: viewMode === 'table' ? "#02BE6A" : (theme.palette.mode === 'dark' ? "transparent" : "transparent"),
                color: viewMode === 'table' ? "white" : (theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d"),
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: viewMode === 'table' ? "#029e56" : (theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa"),
                }
              }}
            >
              <LuList size={20} />
            </IconButton>
            <IconButton
              onClick={() => setViewMode('card')}
              sx={{
                backgroundColor: viewMode === 'card' ? "#02BE6A" : (theme.palette.mode === 'dark' ? "transparent" : "transparent"),
                color: viewMode === 'card' ? "white" : (theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d"),
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: viewMode === 'card' ? "#029e56" : (theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa"),
                }
              }}
            >
              <LuSquare size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Clients Section Header */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 3 
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "24px"
          }}>
            Clients
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              placeholder="Search or select a client"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LuSearch size={20} color={theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d"} />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: "250px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "background.paper",
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  "& fieldset": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#02BE6A",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                }
              }}
            />
            
            <FormControl sx={{ minWidth: "120px" }}>
              <Select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "background.paper",
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>By Age</MenuItem>
                <MenuItem value="18-25" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>18-25</MenuItem>
                <MenuItem value="26-35" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>26-35</MenuItem>
                <MenuItem value="36-45" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>36-45</MenuItem>
                <MenuItem value="46+" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>46+</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: "120px" }}>
              <Select
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "background.paper",
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>By Ward</MenuItem>
                <MenuItem value="ward1" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>Ward 1</MenuItem>
                <MenuItem value="ward2" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>Ward 2</MenuItem>
                <MenuItem value="ward3" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>Ward 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Loading and Error States */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#2c3e50' }}>
              Loading clients...
            </Typography>
          </Box>
        )}

        {error && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ color: '#f44336' }}>
              Error: {error}
            </Typography>
          </Box>
        )}

        {/* Content based on view mode */}
        {!loading && !error && (
          viewMode === 'table' ? (
          <TableContainer component={Paper} sx={{ 
            borderRadius: 3, 
            boxShadow: theme.palette.mode === 'dark' 
              ? "0 2px 8px rgba(255,255,255,0.08)" 
              : "0 2px 8px rgba(0,0,0,0.08)",
            backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "background.paper"
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#02BE6A" }}>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Client Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Age</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Ward Type
                    <LuFilter size={16} style={{ marginLeft: 8 }} />
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Last Lab Date
                    <LuFilter size={16} style={{ marginLeft: 8 }} />
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Medications
                    <LuFilter size={16} style={{ marginLeft: 8 }} />
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} sx={{ 
                    "&:hover": { 
                      backgroundColor: theme.palette.mode === 'dark' ? "#2d2d2d" : "#f8f9fa" 
                    },
                    backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#ffffff"
                  }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          sx={{ 
                            width: 40, 
                            height: 40,
                            backgroundColor: theme.palette.mode === 'dark' ? "#02BE6A" : "#02BE6A",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "16px"
                          }}
                        >
                          {client.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
                          {client.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
                        {client.age} y.o
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
                        {client.ward_type}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
                        {client.lab_results.length > 0 ? new Date(client.lab_results[0].date).toLocaleDateString() : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
                        {client.medications.length > 0 ? `${client.medications.length} meds` : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          onClick={() => handleViewClient(client)}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#02BE6A",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#02BE6A",
                              color: "white",
                            }
                          }}
                        >
                          <LuEye size={14} />
                        </IconButton>
                        <IconButton
                          onClick={() => navigate('/client-file')}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#02BE6A",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#02BE6A",
                              color: "white",
                            }
                          }}
                        >
                          <LuPlus size={14} />
                        </IconButton>
                        <IconButton
                        onClick={() => {
                          setSelectedClient(client);
                          setShowAddEventDialog(true);
                        }}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#02BE6A",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#02BE6A",
                              color: "white",
                            }
                          }}
                        >
                          <LuCalendar size={14} />
                        </IconButton>
                        <IconButton
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#02BE6A",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#02BE6A",
                              color: "white",
                            }
                          }}
                        >
                          <LuTrash2 size={14} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            {clients.map((client) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={client.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "background.paper",
                    border: "1px solid",
                    borderColor: theme.palette.mode === 'dark' ? "#404040" : "divider",
                    boxShadow: theme.palette.mode === 'dark' 
                      ? "0 2px 8px rgba(255,255,255,0.08)" 
                      : "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: theme.palette.mode === 'dark' 
                        ? "0 8px 24px rgba(255,255,255,0.12)" 
                        : "0 8px 24px rgba(0,0,0,0.12)",
                      transform: "translateY(-4px)",
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ 
                      display: "flex", 
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center"
                    }}>
                        <Avatar
                          sx={{ 
                            width: 60, 
                            height: 60,
                            backgroundColor: theme.palette.mode === 'dark' ? "#02BE6A" : "#02BE6A",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "24px",
                            mb: 2
                          }}
                        >
                          {client.name.charAt(0).toUpperCase()}
                        </Avatar>
                      
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                        fontSize: "18px",
                        mb: 0.5
                      }}>
                        {client.name}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                        fontSize: "14px",
                        mb: 1
                      }}>
                        Age: {client.age} y.o
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                        fontSize: "14px",
                        mb: 1
                      }}>
                        Gender: {client.gender}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                        fontSize: "14px",
                        mb: 1
                      }}>
                        Ward: {client.ward_type}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                        fontSize: "14px",
                        mb: 1
                      }}>
                        Lab Results: {client.lab_results.length}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                        fontSize: "14px",
                        mb: 2
                      }}>
                        Medications: {client.medications.length}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          onClick={() => handleViewClient(client)}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#02BE6A",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#02BE6A",
                              color: "white",
                            }
                          }}
                        >
                          <LuEye size={14} />
                        </IconButton>
                        <IconButton
                          onClick={() => navigate('/client-file')}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#02BE6A",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#02BE6A",
                              color: "white",
                            }
                          }}
                        >
                          <LuPlus size={14} />
                        </IconButton>
                        <IconButton
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#02BE6A",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#02BE6A",
                              color: "white",
                            }
                          }}
                        >
                          <LuCalendar size={14} />
                        </IconButton>
                        <IconButton
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#02BE6A",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#02BE6A",
                              color: "white",
                            }
                          }}
                        >
                          <LuTrash2 size={14} />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          )
        )}

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={10}
            page={1}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: 2,
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#ffffff",
                border: theme.palette.mode === 'dark' ? "1px solid #404040" : "1px solid #e0e0e0",
              },
              "& .Mui-selected": {
                backgroundColor: "#02BE6A",
                color: "white",
                "&:hover": {
                  backgroundColor: "#029e56",
                }
              }
            }}
          />
        </Box>
      </Box>

      {/* Add Client Form Dialog */}
      <Dialog
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "background.paper",
            boxShadow: theme.palette.mode === 'dark' 
              ? "0 8px 32px rgba(255,255,255,0.12)" 
              : "0 8px 32px rgba(0,0,0,0.12)"
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          borderBottom: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "24px"
          }}>
            Add New Client
          </Typography>
          <IconButton onClick={() => setShowAddForm(false)} sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
            <LuX size={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Full Name"
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              fullWidth
              required
              InputProps={{
                sx: {
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                }
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#02BE6A",
                  },
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                },
              }}
            />
            <TextField
              label="Profession"
              value={newClient.profession}
              onChange={(e) => setNewClient({...newClient, profession: e.target.value})}
              fullWidth
              required
              InputProps={{
                sx: {
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                }
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#02BE6A",
                  },
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                },
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              fullWidth
              required
              InputProps={{
                sx: {
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                }
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#02BE6A",
                  },
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                },
              }}
            />
            <TextField
              label="Phone Number"
              value={newClient.phone}
              onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              fullWidth
              InputProps={{
                sx: {
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                }
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#02BE6A",
                  },
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ 
                color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
              }}>
                Status
              </InputLabel>
              <Select
                value={newClient.status}
                onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                label="Status"
                sx={{
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  },
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                }}
              >
                <MenuItem value="Pending" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>
                  Pending
                </MenuItem>
                <MenuItem value="Active" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>
                  Active
                </MenuItem>
                <MenuItem value="Inactive" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>
                  Inactive
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setShowAddForm(false)}
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                borderColor: "#02BE6A",
                backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddClient}
            variant="contained"
            sx={{
              backgroundColor: "#02BE6A",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#029e56",
              }
            }}
          >
            Add Client
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Client Dialog */}
      <Dialog
        open={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "background.paper",
            boxShadow: theme.palette.mode === 'dark' 
              ? "0 8px 32px rgba(255,255,255,0.12)" 
              : "0 8px 32px rgba(0,0,0,0.12)"
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          borderBottom: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "24px"
          }}>
            Client Details
          </Typography>
          <IconButton onClick={() => setShowViewDialog(false)} sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
            <LuX size={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {selectedClient && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: theme.palette.mode === 'dark' ? "#02BE6A" : "#02BE6A",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "32px",
                    border: theme.palette.mode === 'dark' ? "3px solid #333333" : "3px solid #ffffff",
                    boxShadow: theme.palette.mode === 'dark' 
                      ? "0 4px 12px rgba(255,255,255,0.1)" 
                      : "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                >
                  {selectedClient.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                    fontSize: "24px",
                    mb: 1
                  }}>
                    {selectedClient.name}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                    fontSize: "16px",
                    mb: 2
                  }}>
                    {selectedClient.age} years old • {selectedClient.gender}
                  </Typography>
                  <Box sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? "#004d1a" : "#d4edda",
                    color: theme.palette.mode === 'dark' ? "#66ff99" : "#155724",
                    fontSize: "12px",
                    fontWeight: 600
                  }}>
                    Active Client
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                    mb: 0.5 
                  }}>
                    Client ID
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                    fontWeight: 500 
                  }}>
                    #{selectedClient.id.toString().padStart(4, '0')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                    mb: 0.5 
                  }}>
                    Date of Birth
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                    fontWeight: 500 
                  }}>
                    {new Date(selectedClient.date_of_birth).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                    mb: 0.5 
                  }}>
                    Ward Type
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                    fontWeight: 500 
                  }}>
                    {selectedClient.ward_type}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                    mb: 0.5 
                  }}>
                    Physical Activity
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                    fontWeight: 500 
                  }}>
                    {selectedClient.physical_activity}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                    mb: 0.5 
                  }}>
                    Lab Results
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                    fontWeight: 500 
                  }}>
                    {selectedClient.lab_results.length} test(s)
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                    mb: 0.5 
                  }}>
                    Medications
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                    fontWeight: 500 
                  }}>
                    {selectedClient.medications.length} medication(s)
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setShowViewDialog(false)}
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                borderColor: "#02BE6A",
                backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Event Dialog */}
      <AddEditEvent
        isOpen={showAddEventDialog}
        onClose={() => setShowAddEventDialog(false)}
        isEditable={false}
        eventData={{}}
        selectedClient={selectedClient}
        onAddEvent={(data) => {
          console.log('Adding new event:', data);
          setShowAddEventDialog(false);
        }}
        onUpdateEvent={(data) => {
          console.log('Updating event:', data);
          setShowAddEventDialog(false);
        }}
        onRemoveEvent={() => {
          console.log('Removing event');
          setShowAddEventDialog(false);
        }}
      />
    </>
  );
};

export default ClientOnboarding;
