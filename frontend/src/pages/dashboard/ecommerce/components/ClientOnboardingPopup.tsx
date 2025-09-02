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
  Grid
} from "@mui/material";
import { LuEye, LuX } from "react-icons/lu";

interface Client {
  id: number;
  name: string;
  profession: string;
  profilePic: string;
}

interface ClientOnboardingPopupProps {
  open: boolean;
  onClose: () => void;
}

const ClientOnboardingPopup = ({ open, onClose }: ClientOnboardingPopupProps) => {
  const clients: Client[] = [
    {
      id: 1,
      name: "Nathan Dough",
      profession: "Professor",
      profilePic: "/src/assets/images/avatars/avatar-1.png"
    },
    {
      id: 2,
      name: "Angelica Bjork",
      profession: "Professor",
      profilePic: "/src/assets/images/avatars/avatar-2.png"
    },
    {
      id: 3,
      name: "Asad Ullah",
      profession: "Professor",
      profilePic: "/src/assets/images/avatars/avatar-3.png"
    },
    {
      id: 4,
      name: "Mandy Wright",
      profession: "Professor",
      profilePic: "/src/assets/images/avatars/avatar-4.png"
    },
    {
      id: 5,
      name: "Steve Martin",
      profession: "Professor",
      profilePic: "/src/assets/images/avatars/avatar-5.png"
    }
  ];

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
          mb: 3 
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {clients.map((client) => (
            <Card
              key={client.id}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                boxShadow: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                }
              }}
            >
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between" 
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Avatar
                    src={client.profilePic}
                    alt={client.name}
                    sx={{
                      width: 56,
                      height: 56,
                      border: "3px solid #ffffff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                  />
                  
                  <Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: "#2c3e50",
                      fontSize: "16px",
                      mb: 0.5
                    }}>
                      {client.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: "#7f8c8d",
                      fontSize: "14px"
                    }}>
                      {client.profession}
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  sx={{
                    backgroundColor: "#f8f9fa",
                    color: "#02BE6A",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid #e9ecef",
                    "&:hover": {
                      backgroundColor: "#02BE6A",
                      color: "white",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease"
                  }}
                >
                  <LuEye size={18} />
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
    </Dialog>
  );
};

export default ClientOnboardingPopup;
