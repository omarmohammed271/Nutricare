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
import { LuEye, LuX, LuUserPlus, LuList, LuSquare, LuSearch, LuPlus, LuCalendar, LuTrash2, LuFilter, LuPencil } from "react-icons/lu";
import PageMetaData from "@src/components/PageMetaData";
import { getClients, createFollowUp } from "@src/api/endpoints";
import httpClient from "@src/helpers/httpClient";

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

interface FollowUp {
  id: number;
  date: string;
  notes: string;
  weight?: number;
  height?: number;
  blood_pressure?: string;
  temperature?: number;
  status: string;
  // Complete client data structure
  name?: string;
  gender?: string;
  date_of_birth?: string;
  physical_activity?: string;
  ward_type?: string;
  stress_factor?: string;
  feeding_type?: string;
  lab_results?: LabResult[];
  medications?: Medication[];
}

interface Client {
  id: number;
  name: string;
  profession: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
  gender: string;
  age?: number; // Make age optional since we'll calculate it
  date_of_birth: string;
  weight: number;
  height: number;
  physical_activity: string;
  ward_type: string;
  stress_factor: string;
  feeding_type: string;
  lab_results: LabResult[];
  medications: Medication[];
  follow_ups: FollowUp[];
  is_finished: boolean;
}

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

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
  const [showFollowUpDialog, setShowFollowUpDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  // Removed edit mode states - now using ClientFile tabs for editing
  const [followUpData, setFollowUpData] = useState({
    notes: '',
    weight: '',
    height: '',
    blood_pressure: '',
    temperature: '',
    status: 'scheduled',
    // Complete client data
    name: '',
    gender: '',
    date_of_birth: '',
    physical_activity: '',
    ward_type: '',
    stress_factor: '',
    feeding_type: '',
    lab_results: [] as LabResult[],
    medications: [] as Medication[]
  });
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
        
        // Ensure all clients have is_finished field and follow_ups array (default to false if missing)
        const clientsWithStatus = clientsData.map((client: any) => ({
          ...client,
          is_finished: client.is_finished !== undefined ? client.is_finished : false,
          follow_ups: client.follow_ups || []
        }));
        
        setClients(clientsWithStatus);
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
      // Create new client
      const client: Client = {
        id: clients.length + 1,
        name: newClient.name,
        profession: newClient.profession,
        email: newClient.email,
        phone: newClient.phone,
        status: newClient.status as "Active" | "Inactive" | "Pending",
        gender: "unknown",
        date_of_birth: new Date().toISOString().split('T')[0],
        weight: 0,
        height: 0,
        physical_activity: "sedentary",
        ward_type: "outpatient",
        stress_factor: "none",
        feeding_type: "oral",
        lab_results: [],
        medications: [],
        follow_ups: [],
        is_finished: false
      };
      setClients([...clients, client]);
      
      // Reset form
      setNewClient({ 
        name: "", 
        profession: "", 
        email: "", 
        phone: "", 
        status: "Pending"
      });
      setShowAddForm(false);
    }
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setShowViewDialog(true);
  };

  const handleEditClient = (client: Client) => {
    // Store client data in localStorage to load in client file for editing
    const clientData = {
      assessment: {
        name: client.name,
        gender: client.gender,
        dateOfBirth: client.date_of_birth,
        weight: client.weight.toString(),
        height: client.height.toString(),
        weightTypeSelection: "",
        physicalActivity: client.physical_activity,
        wardType: client.ward_type,
        stressFactor: client.stress_factor,
        feedingType: client.feeding_type,
      },
      biochemical: {
        labResults: client.lab_results.map(lab => ({
          id: lab.id,
          test_name: lab.test_name,
          result: lab.result,
          reference_range: lab.reference_range,
          interpretation: lab.interpretation,
          file: lab.file,
          date: lab.date
        }))
      },
      medication: {
        medications: client.medications.map(med => ({
          id: med.id.toString(),
          name: med.name,
          dosage: med.dosage,
          notes: med.notes
        }))
      },
      mealPlan: {
        notes: "" // This would need to be added to Client interface if available
      },
      isComplete: client.is_finished
    };
    
    // Store in localStorage for edit mode
    localStorage.setItem('clientFileData', JSON.stringify(clientData));
    localStorage.setItem('clientId', client.id.toString());
    localStorage.setItem('isEditMode', 'true');
    
    // Navigate to client file in edit mode
    console.log('🔄 Navigating to client file in edit mode with data:', clientData);
    navigate('/client-file');
  };

  const handleAddNewClient = () => {
    navigate('/client-file');
  };

  const handleClientClick = (client: Client) => {
    // Store client data in localStorage to load in client file
    const clientData = {
      assessment: {
        name: client.name,
        gender: client.gender,
        dateOfBirth: client.date_of_birth,
        weight: client.weight.toString(),
        height: client.height.toString(),
        weightTypeSelection: "",
        physicalActivity: client.physical_activity,
        wardType: client.ward_type,
        stressFactor: client.stress_factor,
        feedingType: client.feeding_type,
      },
      biochemical: {
        labResults: client.lab_results.map(lab => ({
          id: lab.id,
          test_name: lab.test_name,
          result: lab.result,
          reference_range: lab.reference_range,
          interpretation: lab.interpretation,
          file: lab.file,
          date: lab.date
        }))
      },
      medication: {
        medications: client.medications.map(med => ({
          id: med.id.toString(),
          name: med.name,
          dosage: med.dosage,
          notes: med.notes
        }))
      },
      mealPlan: {
        notes: ""
      },
      isComplete: client.is_finished
    };
    
    // Store in localStorage
    localStorage.setItem('clientFileData', JSON.stringify(clientData));
    localStorage.setItem('clientId', client.id.toString());
    
    // Navigate to client file
    console.log('🔄 Navigating to client file with data:', clientData);
    navigate('/client-file');
  };

  const handleFollowUpClick = (client: Client) => {
    setSelectedClient(client);
    // Pre-populate form with client data
    setFollowUpData({
      notes: '',
      weight: client.weight.toString(),
      height: client.height.toString(),
      blood_pressure: '',
      temperature: '',
      status: 'scheduled',
      // Pre-populate with client data
      name: client.name,
      gender: client.gender,
      date_of_birth: client.date_of_birth,
      physical_activity: client.physical_activity,
      ward_type: client.ward_type,
      stress_factor: client.stress_factor,
      feeding_type: client.feeding_type,
      lab_results: [...client.lab_results],
      medications: [...client.medications]
    });
    setShowFollowUpDialog(true);
  };

  const handleCreateFollowUp = async () => {
    if (!selectedClient) return;
    
    try {
      const followUpPayload = {
        notes: followUpData.notes,
        weight: followUpData.weight ? parseFloat(followUpData.weight) : undefined,
        height: followUpData.height ? parseFloat(followUpData.height) : undefined,
        blood_pressure: followUpData.blood_pressure || undefined,
        temperature: followUpData.temperature ? parseFloat(followUpData.temperature) : undefined,
        status: followUpData.status,
        date: new Date().toISOString().split('T')[0],
        // Complete client data
        name: followUpData.name,
        gender: followUpData.gender,
        date_of_birth: followUpData.date_of_birth,
        physical_activity: followUpData.physical_activity,
        ward_type: followUpData.ward_type,
        stress_factor: followUpData.stress_factor,
        feeding_type: followUpData.feeding_type,
        lab_results: followUpData.lab_results,
        medications: followUpData.medications
      };

      console.log('🔄 Creating follow-up for client:', selectedClient.id, followUpPayload);
      const response = await createFollowUp(selectedClient.id, followUpPayload);
      console.log('✅ Follow-up created successfully:', response);

      // Update the client with the new follow-up data
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === selectedClient.id 
            ? { ...client, follow_ups: [...client.follow_ups, response] }
            : client
        )
      );

      // Reset form and close dialog
      setFollowUpData({
        notes: '',
        weight: '',
        height: '',
        blood_pressure: '',
        temperature: '',
        status: 'scheduled',
        // Complete client data
        name: '',
        gender: '',
        date_of_birth: '',
        physical_activity: '',
        ward_type: '',
        stress_factor: '',
        feeding_type: '',
        lab_results: [],
        medications: []
      });
      setShowFollowUpDialog(false);
      setSelectedClient(null);

    } catch (error) {
      console.error('❌ Failed to create follow-up:', error);
    }
  };

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    setShowDeleteDialog(true);
  };

  const confirmDeleteClient = async () => {
    if (!clientToDelete) return;
    
    try {
      console.log('🗑️ Deleting client:', clientToDelete.id);
      await httpClient.delete(`/clients/${clientToDelete.id}/`);
      console.log('✅ Client deleted successfully');
      
      // Remove client from local state
      setClients(prevClients => 
        prevClients.filter(client => client.id !== clientToDelete.id)
      );
      
      // Close dialog and reset state
      setShowDeleteDialog(false);
      setClientToDelete(null);
      
    } catch (error) {
      console.error('❌ Failed to delete client:', error);
      // You might want to show an error message to the user here
    }
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
                        <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleClientClick(client)}>
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
                          {!client.is_finished && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: -2,
                                right: -2,
                                width: 12,
                                height: 12,
                                backgroundColor: '#f44336',
                                borderRadius: '50%',
                                border: '2px solid white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
                          {client.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
                        {calculateAge(client.date_of_birth)} y.o
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
                          onClick={() => handleEditClient(client)}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#ff9800",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#ff9800",
                              color: "white",
                            }
                          }}
                        >
                          <LuPencil size={14} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            // Navigate to ClientFile in follow-up mode
                            console.log('🔄 Plus button clicked for client:', client.id);
                            console.log('📋 Client data:', client);
                            
                            navigate('/client-file', {
                              state: {
                                isFollowUp: true,
                                clientId: client.id,
                                clientData: {
                                  assessment: {
                                    name: client.name,
                                    gender: client.gender,
                                    dateOfBirth: client.date_of_birth,
                                    weight: client.weight.toString(),
                                    height: client.height.toString(),
                                    weightTypeSelection: "",
                                    physicalActivity: client.physical_activity,
                                    wardType: client.ward_type,
                                    stressFactor: client.stress_factor,
                                    feedingType: client.feeding_type,
                                  },
                                  biochemical: {
                                    labResults: client.lab_results.map(lab => ({
                                      id: lab.id,
                                      test_name: lab.test_name,
                                      result: lab.result,
                                      reference_range: lab.reference_range,
                                      interpretation: lab.interpretation,
                                      file: lab.file,
                                      date: lab.date
                                    }))
                                  },
                                  medication: {
                                    medications: client.medications.map(med => ({
                                      name: med.name,
                                      dosage: med.dosage,
                                      notes: med.notes
                                    }))
                                  },
                                  mealPlan: {
                                    notes: ""
                                  },
                                  isComplete: client.is_finished
                                }
                              }
                            });
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
                          onClick={() => handleDeleteClient(client)}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#f44336",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#f44336",
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
                        <Box sx={{ position: 'relative', cursor: 'pointer', mb: 2 }} onClick={() => handleClientClick(client)}>
                          <Avatar
                            sx={{ 
                              width: 60, 
                              height: 60,
                              backgroundColor: theme.palette.mode === 'dark' ? "#02BE6A" : "#02BE6A",
                              color: "white",
                              fontWeight: 600,
                              fontSize: "24px"
                            }}
                          >
                            {client.name.charAt(0).toUpperCase()}
                          </Avatar>
                          {!client.is_finished && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: -2,
                                right: -2,
                                width: 16,
                                height: 16,
                                backgroundColor: '#f44336',
                                borderRadius: '50%',
                                border: '3px solid white',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                              }}
                            />
                          )}
                        </Box>
                      
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
                        Age: {calculateAge(client.date_of_birth)} y.o
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
                          onClick={() => handleEditClient(client)}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#ff9800",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#ff9800",
                              color: "white",
                            }
                          }}
                        >
                          <LuPencil size={14} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            // Navigate to ClientFile in follow-up mode
                            console.log('🔄 Plus button clicked for client:', client.id);
                            console.log('📋 Client data:', client);
                            
                            navigate('/client-file', {
                              state: {
                                isFollowUp: true,
                                clientId: client.id,
                                clientData: {
                                  assessment: {
                                    name: client.name,
                                    gender: client.gender,
                                    dateOfBirth: client.date_of_birth,
                                    weight: client.weight.toString(),
                                    height: client.height.toString(),
                                    weightTypeSelection: "",
                                    physicalActivity: client.physical_activity,
                                    wardType: client.ward_type,
                                    stressFactor: client.stress_factor,
                                    feedingType: client.feeding_type,
                                  },
                                  biochemical: {
                                    labResults: client.lab_results.map(lab => ({
                                      id: lab.id,
                                      test_name: lab.test_name,
                                      result: lab.result,
                                      reference_range: lab.reference_range,
                                      interpretation: lab.interpretation,
                                      file: lab.file,
                                      date: lab.date
                                    }))
                                  },
                                  medication: {
                                    medications: client.medications.map(med => ({
                                      name: med.name,
                                      dosage: med.dosage,
                                      notes: med.notes
                                    }))
                                  },
                                  mealPlan: {
                                    notes: ""
                                  },
                                  isComplete: client.is_finished
                                }
                              }
                            });
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
                          onClick={() => handleDeleteClient(client)}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f8f9fa",
                            color: "#f44336",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: theme.palette.mode === 'dark' ? "0.8px solid #333333" : "0.8px solid #e9ecef",
                            "&:hover": {
                              backgroundColor: "#f44336",
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
          <IconButton onClick={() => {
            setShowAddForm(false);
          }} sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
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
            onClick={() => {
              setShowAddForm(false);
            }}
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
                    {calculateAge(selectedClient.date_of_birth)} years old • {selectedClient.gender}
                  </Typography>
                  <Box sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: selectedClient.is_finished 
                      ? (theme.palette.mode === 'dark' ? "#004d1a" : "#d4edda")
                      : (theme.palette.mode === 'dark' ? "#4d1a00" : "#f8d7da"),
                    color: selectedClient.is_finished 
                      ? (theme.palette.mode === 'dark' ? "#66ff99" : "#155724")
                      : (theme.palette.mode === 'dark' ? "#ff9999" : "#721c24"),
                    fontSize: "12px",
                    fontWeight: 600
                  }}>
                    {selectedClient.is_finished ? 'Complete' : 'Incomplete'}
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
                <Box>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                    mb: 0.5 
                  }}>
                    Follow-ups
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                    fontWeight: 500 
                  }}>
                    {selectedClient.follow_ups.length} follow-up(s)
                  </Typography>
                </Box>
              </Box>

              {/* Follow-ups Comparison Section */}
              {selectedClient.follow_ups.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                    mb: 2
                  }}>
                    Follow-up History & Comparison
                  </Typography>
                  
                  {selectedClient.follow_ups.map((followUp, index) => (
                    <Card key={followUp.id} sx={{ 
                      mb: 2, 
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
                      border: "1px solid",
                      borderColor: theme.palette.mode === 'dark' ? "#333333" : "#e0e0e0"
                    }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 600, 
                            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                          }}>
                            Follow-up #{index + 1}
                          </Typography>
                          <Chip 
                            label={followUp.status} 
                            size="small"
                            sx={{
                              backgroundColor: followUp.status === 'completed' ? '#4caf50' : 
                                             followUp.status === 'scheduled' ? '#ff9800' : '#f44336',
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                          <Box>
                            <Typography variant="body2" sx={{ 
                              color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                              mb: 0.5 
                            }}>
                              Date
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                              fontWeight: 500 
                            }}>
                              {new Date(followUp.date).toLocaleDateString()}
                            </Typography>
                          </Box>

                          {followUp.name && (
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                                mb: 0.5 
                              }}>
                                Name
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                                fontWeight: 500 
                              }}>
                                {followUp.name}
                              </Typography>
                            </Box>
                          )}

                          {followUp.gender && (
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                                mb: 0.5 
                              }}>
                                Gender
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                                fontWeight: 500 
                              }}>
                                {followUp.gender}
                              </Typography>
                            </Box>
                          )}

                          {followUp.date_of_birth && (
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
                                {new Date(followUp.date_of_birth).toLocaleDateString()}
                              </Typography>
                            </Box>
                          )}

                          {followUp.physical_activity && (
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
                                {followUp.physical_activity}
                              </Typography>
                            </Box>
                          )}

                          {followUp.ward_type && (
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
                                {followUp.ward_type}
                              </Typography>
                            </Box>
                          )}

                          {followUp.stress_factor && (
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                                mb: 0.5 
                              }}>
                                Stress Factor
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                                fontWeight: 500 
                              }}>
                                {followUp.stress_factor}
                              </Typography>
                            </Box>
                          )}

                          {followUp.feeding_type && (
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                                mb: 0.5 
                              }}>
                                Feeding Type
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                                fontWeight: 500 
                              }}>
                                {followUp.feeding_type}
                              </Typography>
                            </Box>
                          )}
                          
                          {followUp.weight && (
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                                mb: 0.5 
                              }}>
                                Weight
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                                fontWeight: 500 
                              }}>
                                {followUp.weight} kg
                                {selectedClient.weight && (
                                  <span style={{ 
                                    color: followUp.weight > selectedClient.weight ? '#f44336' : 
                                           followUp.weight < selectedClient.weight ? '#4caf50' : '#666',
                                    marginLeft: '8px',
                                    fontSize: '12px'
                                  }}>
                                    ({followUp.weight > selectedClient.weight ? '+' : ''}{(followUp.weight - selectedClient.weight).toFixed(1)} kg)
                                  </span>
                                )}
                              </Typography>
                            </Box>
                          )}
                          
                          {followUp.height && (
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                                mb: 0.5 
                              }}>
                                Height
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                                fontWeight: 500 
                              }}>
                                {followUp.height} cm
                                {selectedClient.height && (
                                  <span style={{ 
                                    color: followUp.height > selectedClient.height ? '#4caf50' : 
                                           followUp.height < selectedClient.height ? '#f44336' : '#666',
                                    marginLeft: '8px',
                                    fontSize: '12px'
                                  }}>
                                    ({followUp.height > selectedClient.height ? '+' : ''}{(followUp.height - selectedClient.height).toFixed(1)} cm)
                                  </span>
                                )}
                              </Typography>
                            </Box>
                          )}
                          
                          {followUp.blood_pressure && (
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                                mb: 0.5 
                              }}>
                                Blood Pressure
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                                fontWeight: 500 
                              }}>
                                {followUp.blood_pressure}
                              </Typography>
                            </Box>
                          )}
                          
                          {followUp.temperature && (
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                                mb: 0.5 
                              }}>
                                Temperature
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                                fontWeight: 500 
                              }}>
                                {followUp.temperature}°C
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        
                        {followUp.notes && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ 
                              color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                              mb: 0.5 
                            }}>
                              Notes
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50", 
                              fontWeight: 500,
                              fontStyle: 'italic'
                            }}>
                              "{followUp.notes}"
                            </Typography>
                          </Box>
                        )}

                        {/* Lab Results in Follow-up */}
                        {followUp.lab_results && followUp.lab_results.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ 
                              color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                              mb: 1,
                              fontWeight: 600
                            }}>
                              Lab Results ({followUp.lab_results.length})
                            </Typography>
                            {followUp.lab_results.map((labResult, labIndex) => (
                              <Box key={labIndex} sx={{ 
                                mb: 1, 
                                p: 1, 
                                backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f0f0f0",
                                borderRadius: 1
                              }}>
                                <Typography variant="body2" sx={{ 
                                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                                  fontWeight: 500
                                }}>
                                  {labResult.test_name}: {labResult.result} {labResult.reference_range && `(${labResult.reference_range})`}
                                </Typography>
                                {labResult.interpretation && (
                                  <Typography variant="caption" sx={{ 
                                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                                    fontStyle: 'italic'
                                  }}>
                                    {labResult.interpretation}
                                  </Typography>
                                )}
                              </Box>
                            ))}
                          </Box>
                        )}

                        {/* Medications in Follow-up */}
                        {followUp.medications && followUp.medications.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ 
                              color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d", 
                              mb: 1,
                              fontWeight: 600
                            }}>
                              Medications ({followUp.medications.length})
                            </Typography>
                            {followUp.medications.map((medication, medIndex) => (
                              <Box key={medIndex} sx={{ 
                                mb: 1, 
                                p: 1, 
                                backgroundColor: theme.palette.mode === 'dark' ? "#222222" : "#f0f0f0",
                                borderRadius: 1
                              }}>
                                <Typography variant="body2" sx={{ 
                                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                                  fontWeight: 500
                                }}>
                                  {medication.name} - {medication.dosage}
                                </Typography>
                                {medication.notes && (
                                  <Typography variant="caption" sx={{ 
                                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                                    fontStyle: 'italic'
                                  }}>
                                    {medication.notes}
                                  </Typography>
                                )}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
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

      {/* Follow-up Dialog */}
      <Dialog
        open={showFollowUpDialog}
        onClose={() => setShowFollowUpDialog(false)}
        maxWidth="md"
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
            Create Follow-up for {selectedClient?.name}
          </Typography>
          <IconButton onClick={() => setShowFollowUpDialog(false)} sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
            <LuX size={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Notes"
              value={followUpData.notes}
              onChange={(e) => setFollowUpData({...followUpData, notes: e.target.value})}
              fullWidth
              multiline
              rows={3}
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
            
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Weight (kg)"
                value={followUpData.weight}
                onChange={(e) => setFollowUpData({...followUpData, weight: e.target.value})}
                type="number"
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
                label="Height (cm)"
                value={followUpData.height}
                onChange={(e) => setFollowUpData({...followUpData, height: e.target.value})}
                type="number"
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
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Blood Pressure"
                value={followUpData.blood_pressure}
                onChange={(e) => setFollowUpData({...followUpData, blood_pressure: e.target.value})}
                placeholder="120/80"
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
                label="Temperature (°C)"
                value={followUpData.temperature}
                onChange={(e) => setFollowUpData({...followUpData, temperature: e.target.value})}
                type="number"
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
            </Box>

            {/* Complete Client Data Section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                mb: 2
              }}>
                Client Information
              </Typography>
              
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  label="Name"
                  value={followUpData.name}
                  onChange={(e) => setFollowUpData({...followUpData, name: e.target.value})}
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
                <TextField
                  label="Gender"
                  value={followUpData.gender}
                  onChange={(e) => setFollowUpData({...followUpData, gender: e.target.value})}
                  select
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
                <TextField
                  label="Date of Birth"
                  type="date"
                  value={followUpData.date_of_birth}
                  onChange={(e) => setFollowUpData({...followUpData, date_of_birth: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: 150 }}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                <TextField
                  label="Physical Activity"
                  value={followUpData.physical_activity}
                  onChange={(e) => setFollowUpData({...followUpData, physical_activity: e.target.value})}
                  select
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value="sedentary">Sedentary</MenuItem>
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="very_active">Very Active</MenuItem>
                  <MenuItem value="extra">Extra Active</MenuItem>
                </TextField>
                <TextField
                  label="Ward Type"
                  value={followUpData.ward_type}
                  onChange={(e) => setFollowUpData({...followUpData, ward_type: e.target.value})}
                  select
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="outpatient">Out-patient</MenuItem>
                  <MenuItem value="icu">ICU</MenuItem>
                  <MenuItem value="medical">Medical Ward</MenuItem>
                  <MenuItem value="cardiac">Cardiac Ward</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </TextField>
                <TextField
                  label="Stress Factor"
                  value={followUpData.stress_factor}
                  onChange={(e) => setFollowUpData({...followUpData, stress_factor: e.target.value})}
                  select
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value="minor_surgery">Minor Surgery</MenuItem>
                  <MenuItem value="major_surgery">Major Surgery</MenuItem>
                  <MenuItem value="skeletal_trauma">Skeletal Trauma</MenuItem>
                  <MenuItem value="blunt_trauma">Blunt Trauma</MenuItem>
                  <MenuItem value="closed_head_injury">Closed Head Injury</MenuItem>
                  <MenuItem value="mild_infection">Mild Infection</MenuItem>
                  <MenuItem value="moderate_infection">Moderate Infection</MenuItem>
                  <MenuItem value="severe_infection">Severe Infection</MenuItem>
                  <MenuItem value="starvation">Starvation</MenuItem>
                  <MenuItem value="burns_lt_20">Burns &lt;20% TBSA</MenuItem>
                  <MenuItem value="burns_20_40">Burns 20%-40% TBSA</MenuItem>
                  <MenuItem value="burns_gt_40">Burns &gt;40% TBSA</MenuItem>
                </TextField>
                <TextField
                  label="Feeding Type"
                  value={followUpData.feeding_type}
                  onChange={(e) => setFollowUpData({...followUpData, feeding_type: e.target.value})}
                  select
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="oral">Oral</MenuItem>
                  <MenuItem value="enteral_parenteral">Enteral & Parenteral</MenuItem>
                  <MenuItem value="tpn">TPN</MenuItem>
                </TextField>
              </Box>
            </Box>

            <FormControl fullWidth>
              <InputLabel sx={{ 
                color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
              }}>
                Status
              </InputLabel>
              <Select
                value={followUpData.status}
                onChange={(e) => setFollowUpData({...followUpData, status: e.target.value})}
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
                <MenuItem value="scheduled" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>
                  Scheduled
                </MenuItem>
                <MenuItem value="completed" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>
                  Completed
                </MenuItem>
                <MenuItem value="cancelled" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                  }
                }}>
                  Cancelled
                </MenuItem>
              </Select>
            </FormControl>

            {/* Lab Results Section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                mb: 2
              }}>
                Lab Results
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newLabResult: LabResult = {
                    id: Date.now(),
                    test_name: '',
                    result: '',
                    reference_range: '',
                    interpretation: '',
                    file: null,
                    date: new Date().toISOString().split('T')[0]
                  };
                  setFollowUpData({
                    ...followUpData,
                    lab_results: [...followUpData.lab_results, newLabResult]
                  });
                }}
                sx={{
                  borderColor: "#02BE6A",
                  color: "#02BE6A",
                  mb: 2,
                  "&:hover": {
                    borderColor: "#01A85A",
                    backgroundColor: "#f0f9f4",
                  }
                }}
              >
                Add Lab Result
              </Button>
              
              {followUpData.lab_results.map((labResult, index) => (
                <Card key={labResult.id} sx={{ mb: 2, p: 2, backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa" }}>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      label="Test Name"
                      value={labResult.test_name}
                      onChange={(e) => {
                        const updated = [...followUpData.lab_results];
                        updated[index].test_name = e.target.value;
                        setFollowUpData({ ...followUpData, lab_results: updated });
                      }}
                      size="small"
                      sx={{ minWidth: 150 }}
                    />
                    <TextField
                      label="Result"
                      value={labResult.result}
                      onChange={(e) => {
                        const updated = [...followUpData.lab_results];
                        updated[index].result = e.target.value;
                        setFollowUpData({ ...followUpData, lab_results: updated });
                      }}
                      size="small"
                      sx={{ minWidth: 120 }}
                    />
                    <TextField
                      label="Reference Range"
                      value={labResult.reference_range}
                      onChange={(e) => {
                        const updated = [...followUpData.lab_results];
                        updated[index].reference_range = e.target.value;
                        setFollowUpData({ ...followUpData, lab_results: updated });
                      }}
                      size="small"
                      sx={{ minWidth: 120 }}
                    />
                    <TextField
                      label="Interpretation"
                      value={labResult.interpretation}
                      onChange={(e) => {
                        const updated = [...followUpData.lab_results];
                        updated[index].interpretation = e.target.value;
                        setFollowUpData({ ...followUpData, lab_results: updated });
                      }}
                      size="small"
                      sx={{ minWidth: 150 }}
                    />
                    <IconButton
                      onClick={() => {
                        const updated = followUpData.lab_results.filter((_, i) => i !== index);
                        setFollowUpData({ ...followUpData, lab_results: updated });
                      }}
                      size="small"
                      sx={{ color: "#f44336" }}
                    >
                      <LuX size={16} />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>

            {/* Medications Section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                mb: 2
              }}>
                Medications
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newMedication: Medication = {
                    id: Date.now(),
                    name: '',
                    dosage: '',
                    notes: ''
                  };
                  setFollowUpData({
                    ...followUpData,
                    medications: [...followUpData.medications, newMedication]
                  });
                }}
                sx={{
                  borderColor: "#02BE6A",
                  color: "#02BE6A",
                  mb: 2,
                  "&:hover": {
                    borderColor: "#01A85A",
                    backgroundColor: "#f0f9f4",
                  }
                }}
              >
                Add Medication
              </Button>
              
              {followUpData.medications.map((medication, index) => (
                <Card key={medication.id} sx={{ mb: 2, p: 2, backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa" }}>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      label="Medication Name"
                      value={medication.name}
                      onChange={(e) => {
                        const updated = [...followUpData.medications];
                        updated[index].name = e.target.value;
                        setFollowUpData({ ...followUpData, medications: updated });
                      }}
                      size="small"
                      sx={{ minWidth: 200 }}
                    />
                    <TextField
                      label="Dosage"
                      value={medication.dosage}
                      onChange={(e) => {
                        const updated = [...followUpData.medications];
                        updated[index].dosage = e.target.value;
                        setFollowUpData({ ...followUpData, medications: updated });
                      }}
                      size="small"
                      sx={{ minWidth: 120 }}
                    />
                    <TextField
                      label="Notes"
                      value={medication.notes}
                      onChange={(e) => {
                        const updated = [...followUpData.medications];
                        updated[index].notes = e.target.value;
                        setFollowUpData({ ...followUpData, medications: updated });
                      }}
                      size="small"
                      sx={{ minWidth: 200 }}
                    />
                    <IconButton
                      onClick={() => {
                        const updated = followUpData.medications.filter((_, i) => i !== index);
                        setFollowUpData({ ...followUpData, medications: updated });
                      }}
                      size="small"
                      sx={{ color: "#f44336" }}
                    >
                      <LuX size={16} />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setShowFollowUpDialog(false)}
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
            onClick={handleCreateFollowUp}
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
            Create Follow-up
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
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
            color: "#f44336",
            fontSize: "24px"
          }}>
            Delete Client
          </Typography>
          <IconButton onClick={() => setShowDeleteDialog(false)} sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
            <LuX size={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1" sx={{ 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              fontSize: "16px"
            }}>
              Are you sure you want to delete this client?
            </Typography>
            
            {clientToDelete && (
              <Box sx={{ 
                p: 2, 
                backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
                borderRadius: 2,
                border: "1px solid",
                borderColor: theme.palette.mode === 'dark' ? "#333333" : "#e0e0e0"
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                  mb: 1
                }}>
                  {clientToDelete.name}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d"
                }}>
                  Client ID: #{clientToDelete.id.toString().padStart(4, '0')} • Age: {calculateAge(clientToDelete.date_of_birth)} y.o
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d"
                }}>
                  Lab Results: {clientToDelete.lab_results.length} • Medications: {clientToDelete.medications.length}
                </Typography>
              </Box>
            )}
            
            <Typography variant="body2" sx={{ 
              color: "#f44336",
              fontWeight: 600,
              mt: 1
            }}>
              ⚠️ This action cannot be undone. All client data, including lab results, medications, and follow-ups will be permanently deleted.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setShowDeleteDialog(false)}
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
            onClick={confirmDeleteClient}
            variant="contained"
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#d32f2f",
              }
            }}
          >
            Delete Client
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientOnboarding;
