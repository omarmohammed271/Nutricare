import { Box, Card, Typography, Button } from "@mui/material";
import { LuMessageCircle } from "react-icons/lu";

interface DietitianChatProps {
  onOpenChat: () => void;
}

const DietitianChat = ({ onOpenChat }: DietitianChatProps) => {
  return (
    <Card sx={{ 
      p: 2, 
      height: "100%",
      backgroundColor: "background.paper",
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      border: "1px solid",
      borderColor: "divider",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}>
      <Box sx={{ mb: 2 }}>
        <LuMessageCircle size={48} color="#02BE6A" />
      </Box>
      
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50", mb: 2 }}>
        Need Nutrition Advice?
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: "200px" }}>
        Chat with our certified dietitian for personalized nutrition guidance and meal planning
      </Typography>
      
      <Button
        variant="contained"
        startIcon={<LuMessageCircle size={18} />}
        onClick={onOpenChat}
        sx={{
          backgroundColor: "#02BE6A",
          color: "white",
          px: 2,
          py: 2,
          borderRadius: 2,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#029e56",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(2, 190, 106, 0.3)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Start Chat
      </Button>
    </Card>
  );
};

export default DietitianChat;
