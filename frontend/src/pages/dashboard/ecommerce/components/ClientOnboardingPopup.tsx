import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Card, 
  Avatar, 
  IconButton,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { LuEye, LuX, LuUserPlus } from "react-icons/lu";
import { useState } from "react";

interface Client {
  id: number;
  name: string;
  profession: string;
  profilePic: string;
  email?: string;
  phone?: string;
  status?: string;
}

interface ClientOnboardingPopupProps {
  open: boolean;
  onClose: () => void;
}

const ClientOnboardingPopup = ({ open, onClose }: ClientOnboardingPopupProps) => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Nathan Dough",
      profession: "Professor",
      profilePic: "/src/assets/images/landing/Group 1171275335.svg",
      email: "nathan.dough@email.com",
      phone: "+1 (555) 123-4567",
      status: "Active"
    },
    {
      id: 2,
      name: "Angelica Bjork",
      profession: "Professor",
      profilePic: "/src/assets/images/landing/Group 1171275335.svg",
      email: "angelica.bjork@email.com",
      phone: "+1 (555) 234-5678",
      status: "Active"
    },
    {
      id: 3,
      name: "Asad Ullah",
      profession: "Professor",
      profilePic: "/src/assets/images/landing/Group 1171275335.svg",
      email: "asad.ullah@email.com",
      phone: "+1 (555) 345-6789",
      status: "Pending"
    },
    {
      id: 4,
      name: "Mandy Wright",
      profession: "Professor",
      profilePic: "/src/assets/images/landing/Group 1171275335.svg",
      email: "mandy.wright@email.com",
      phone: "+1 (555) 456-7890",
      status: "Active"
    },
    {
      id: 5,
      name: "Steve Martin",
      profession: "Professor",
      profilePic: "/src/assets/images/landing/Group 1171275335.svg",
      email: "steve.martin@email.com",
      phone: "+1 (555) 567-8901",
      status: "Active"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    status: "Pending"
  });

  const handleAddClient = () => {
    if (newClient.name && newClient.profession && newClient.email) {
      const client: Client = {
        id: clients.length + 1,
        name: newClient.name,
        profession: newClient.profession,
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        email: newClient.email,
        phone: newClient.phone,
        status: newClient.status
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          minHeight: "600px"
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 2, 
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          color: "#2c3e50",
          fontSize: "24px"
        }}>
          Client Onboarding
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#7f8c8d" }}>
          <LuX size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Header Section */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 4,
          mt: 2
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: "#2c3e50",
            fontSize: "18px"
          }}>
            Clients List
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => setShowAddForm(true)}
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
              Add Client
            </Button>
            
            <Button
              variant="outlined"
              sx={{
                borderColor: "#e0e0e0",
                color: "#2c3e50",
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  borderColor: "#02BE6A",
                  backgroundColor: "#f8f9fa",
                }
              }}
            >
              See All
            </Button>
          </Box>
        </Box>

        {/* Clients List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8.01px" }}>
          {clients.map((client) => (
            <Card
              key={client.id}
              sx={{
                width: "100%",
                height: "40.0625px",
                borderRadius: "8.01px",
                padding: 0,
                backgroundColor: "background.paper",
                border: "0.8px solid",
                borderColor: "divider",
                boxShadow: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                }
              }}
            >
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                height: "100%",
                paddingLeft: "8.01px",
                paddingRight: "8.01px"
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={client.profilePic}
                    alt={client.name}
                    sx={{
                      width: 32,
                      height: 32,
                      border: "1px solid #ffffff",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
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
                  
                  <Box>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 600, 
                      color: "#2c3e50",
                      fontSize: "12px",
                      lineHeight: 1.2
                    }}>
                      {client.name}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: "#7f8c8d",
                      fontSize: "10px",
                      lineHeight: 1.2
                    }}>
                      {client.profession}
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  onClick={() => handleViewClient(client)}
                  sx={{
                    backgroundColor: "#f8f9fa",
                    color: "#02BE6A",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "0.8px solid #e9ecef",
                    "&:hover": {
                      backgroundColor: "#02BE6A",
                      color: "white",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease"
                  }}
                >
                  <LuEye size={16} />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#e0e0e0",
            color: "#2c3e50",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#02BE6A",
              backgroundColor: "#f8f9fa",
            }
          }}
        >
          Close
        </Button>
      </DialogActions>

      {/* Add Client Form Dialog */}
      <Dialog
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: "background.paper",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: "#2c3e50",
            fontSize: "24px"
          }}>
            Add New Client
          </Typography>
          <IconButton onClick={() => setShowAddForm(false)} sx={{ color: "#7f8c8d" }}>
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
            />
            <TextField
              label="Profession"
              value={newClient.profession}
              onChange={(e) => setNewClient({...newClient, profession: e.target.value})}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              value={newClient.phone}
              onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newClient.status}
                onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                label="Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setShowAddForm(false)}
            variant="outlined"
            sx={{
              borderColor: "#e0e0e0",
              color: "#2c3e50",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                borderColor: "#02BE6A",
                backgroundColor: "#f8f9fa",
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
            backgroundColor: "background.paper",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: "#2c3e50",
            fontSize: "24px"
          }}>
            Client Details
          </Typography>
          <IconButton onClick={() => setShowViewDialog(false)} sx={{ color: "#7f8c8d" }}>
            <LuX size={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {selectedClient && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar
                  src={selectedClient.profilePic}
                  alt={selectedClient.name}
                  sx={{
                    width: 80,
                    height: 80,
                    border: "3px solid #ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                />
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    color: "#2c3e50",
                    fontSize: "24px",
                    mb: 1
                  }}>
                    {selectedClient.name}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: "#7f8c8d",
                    fontSize: "16px",
                    mb: 2
                  }}>
                    {selectedClient.profession}
                  </Typography>
                  <Box sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: selectedClient.status === "Active" ? "#d4edda" : "#fff3cd",
                    color: selectedClient.status === "Active" ? "#155724" : "#856404",
                    fontSize: "12px",
                    fontWeight: 600
                  }}>
                    {selectedClient.status}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 0.5 }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#2c3e50", fontWeight: 500 }}>
                    {selectedClient.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 0.5 }}>
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#2c3e50", fontWeight: 500 }}>
                    {selectedClient.phone}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "#7f8c8d", mb: 0.5 }}>
                    Client ID
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#2c3e50", fontWeight: 500 }}>
                    #{selectedClient.id.toString().padStart(4, '0')}
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
              borderColor: "#e0e0e0",
              color: "#2c3e50",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                borderColor: "#02BE6A",
                backgroundColor: "#f8f9fa",
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ClientOnboardingPopup;
