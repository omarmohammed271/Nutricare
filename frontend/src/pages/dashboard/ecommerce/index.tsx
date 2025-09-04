import { Grid } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import QuickActions from "./components/QuickActions";
import ClientChart from "./components/ClientChart";
import CaseOverview from "./components/CaseOverview";
import Appointments from "./components/Appointments";
import DietitianChat from "./components/DietitianChat";
import { useState } from "react";
import { Box } from "@mui/material";

const NutriCareDashboard = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <PageBreadcrumb title="NutriCare Dashboard" subName="Nutrition & Health Management" />

      {/* Quick Action Buttons */}
      <Box sx={{ mb: 6 }}>
        <QuickActions />
      </Box>

      {/* Charts Row - Case Distribution and Total Number of Clients (50% each) */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item lg={6} xs={12}>
          <ClientChart />
        </Grid>
        <Grid item lg={6} xs={12}>
          <CaseOverview />
        </Grid>
      </Grid>

      {/* Appointments and Chat Row - Appointments 70%, Chat 30% */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item lg={8.4} xs={12}>
          <Appointments chatOpen={chatOpen} onChatClose={handleCloseChat} />
        </Grid>
        <Grid item lg={3.6} xs={12}>
          <DietitianChat onOpenChat={handleOpenChat} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NutriCareDashboard;
