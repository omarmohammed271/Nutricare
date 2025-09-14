import { useTheme } from "@mui/material/styles";

import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Tooltip,
  Badge,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  useTheme as muiUseTheme
} from "@mui/material";
import {
  LuPlus,
  LuClock,
  LuCheck,
  LuCalendar,
  LuChevronDown,
  LuPencil,
  LuTrash2,
  LuEye,
  LuMessageCircle,
  LuX,
  LuUser,
  LuPhone,
  LuMail
} from "react-icons/lu";
import { useState, useEffect } from "react";

interface AppointmentsProps {
  chatOpen?: boolean;
  onChatClose?: () => void;
}

interface Appointment {
  id: number;
  name: string;
  type: string;
  time: string;
  status: string;
  profilePic: string;
  phone: string;
  email: string;
  notes: string;
}

const Appointments = ({ chatOpen = false, onChatClose }: AppointmentsProps) => {
  const theme = muiUseTheme();
  const [month, setMonth] = useState("November");
  const [year, setYear] = useState("2024");
  const [selectedDate, setSelectedDate] = useState(10);
  const [localChatOpen, setLocalChatOpen] = useState(false);
  
  // All appointments data for different dates
  const allAppointmentsData = {
    10: [
      {
        id: 1,
        name: "Sarah Johnson",
        type: "Weight Loss",
        time: "09:00 AM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 123-4567",
        email: "sarah.johnson@email.com",
        notes: "Focus on Mediterranean diet and portion control"
      },
      {
        id: 2,
        name: "Michael Chen",
        type: "Diabetes Management",
        time: "10:30 AM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 234-5678",
        email: "michael.chen@email.com",
        notes: "Monitor blood sugar levels and carbohydrate counting"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        type: "Sports Nutrition",
        time: "02:00 PM",
        status: "completed",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 345-6789",
        email: "emily.rodriguez@email.com",
        notes: "Post-workout meal planning and protein requirements"
      },
      {
        id: 4,
        name: "David Thompson",
        type: "Heart Health",
        time: "03:30 PM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 456-7890",
        email: "david.thompson@email.com",
        notes: "Low-sodium diet and omega-3 rich foods"
      }
    ],
    17: [
      {
        id: 5,
        name: "Lisa Wang",
        type: "Prenatal Nutrition",
        time: "09:30 AM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 567-8901",
        email: "lisa.wang@email.com",
        notes: "Pregnancy nutrition and supplements"
      },
      {
        id: 6,
        name: "James Wilson",
        type: "Gastrointestinal Health",
        time: "11:00 AM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 678-9012",
        email: "james.wilson@email.com",
        notes: "IBS-friendly diet and gut health"
      },
      {
        id: 7,
        name: "Maria Garcia",
        type: "Kidney Disease",
        time: "01:30 PM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 789-0123",
        email: "maria.garcia@email.com",
        notes: "Low-potassium and low-phosphorus diet"
      }
    ],
    24: [
      {
        id: 8,
        name: "Robert Brown",
        type: "Cancer Support",
        time: "10:00 AM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 890-1234",
        email: "robert.brown@email.com",
        notes: "Nutrition during chemotherapy"
      },
      {
        id: 9,
        name: "Jennifer Lee",
        type: "Eating Disorders",
        time: "02:30 PM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 901-2345",
        email: "jennifer.lee@email.com",
        notes: "Recovery meal planning and support"
      }
    ],
    25: [
      {
        id: 10,
        name: "Thomas Anderson",
        type: "Senior Nutrition",
        time: "09:00 AM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 012-3456",
        email: "thomas.anderson@email.com",
        notes: "Age-appropriate nutrition and supplements"
      },
      {
        id: 11,
        name: "Amanda Taylor",
        type: "Food Allergies",
        time: "11:30 AM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 123-4567",
        email: "amanda.taylor@email.com",
        notes: "Gluten-free and dairy-free meal planning"
      },
      {
        id: 12,
        name: "Christopher Martinez",
        type: "Athletic Performance",
        time: "03:00 PM",
        status: "upcoming",
        profilePic: "/src/assets/images/landing/Group 1171275335.svg",
        phone: "+1 (555) 234-5678",
        email: "christopher.martinez@email.com",
        notes: "Pre-competition nutrition strategy"
      }
    ]
  };

  const [appointments, setAppointments] = useState<Appointment[]>(allAppointmentsData[10] || []);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    type: '',
    time: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Use props if provided, otherwise use local state
  const isChatOpen = chatOpen !== undefined ? chatOpen : localChatOpen;
  const handleChatClose = onChatClose || (() => setLocalChatOpen(false));

  // Update appointments when date changes
  useEffect(() => {
    const dateAppointments = allAppointmentsData[selectedDate as keyof typeof allAppointmentsData] || [];
    setAppointments(dateAppointments);
  }, [selectedDate]);

  const getStatusIcon = (status: string) => {
    return status === "completed" ? <LuCheck size={14} /> : <LuClock size={14} />;
  };

  const getStatusColor = (status: string) => {
    return status === "completed" ? "#e8f5e8" : "#fff8e1";
  };

  const getStatusTextColor = (status: string) => {
    return status === "completed" ? "#02BE6A" : "#fdb906";
  };

  const calendarDays = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30]
  ];
  const appointmentDates = [10, 17, 24, 25];

  const handleDateClick = (date: number | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleAddAppointment = () => {
    setAddDialogOpen(true);
  };

  const handleEditAppointment = (appointmentId: number) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setNewAppointment({
        name: appointment.name,
        type: appointment.type,
        time: appointment.time,
        phone: appointment.phone,
        email: appointment.email,
        notes: appointment.notes
      });
      setAddDialogOpen(true);
    }
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setDeleteDialogOpen(true);
    }
  };

  const handleViewAppointment = (appointmentId: number) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      setSelectedAppointment(appointment);
      setViewDialogOpen(true);
    }
  };

  const handleSaveAppointment = () => {
    if (selectedAppointment) {
      // Edit existing appointment
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, ...newAppointment }
          : apt
      ));
      setSnackbar({ open: true, message: 'Appointment updated successfully!', severity: 'success' });
    } else {
      // Add new appointment
      const newId = Math.max(...appointments.map(apt => apt.id)) + 1;
      const newApt: Appointment = {
        id: newId,
        ...newAppointment,
        status: 'upcoming',
        profilePic: "/src/assets/images/landing/Group 1171275335.svg"
      };
      setAppointments(prev => [...prev, newApt]);
      setSnackbar({ open: true, message: 'Appointment added successfully!', severity: 'success' });
    }
    
    setAddDialogOpen(false);
    setSelectedAppointment(null);
    setNewAppointment({ name: '', type: '', time: '', phone: '', email: '', notes: '' });
  };

  const handleConfirmDelete = () => {
    if (selectedAppointment) {
      setAppointments(prev => prev.filter(apt => apt.id !== selectedAppointment.id));
      setSnackbar({ open: true, message: 'Appointment deleted successfully!', severity: 'success' });
      setDeleteDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      {/* Appointments Card */}
      <Card sx={{
        p: 2,
        height: "100%",
        backgroundColor: "background.paper",
        borderRadius: 3,
        boxShadow: theme.palette.mode === 'dark' 
          ? "0 4px 20px rgba(255,255,255,0.08)" 
          : "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: "divider"
      }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#ffffff' : "#2c3e50" }}>
            Appointments for {month} {selectedDate}, {year}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {/* Month/Year Selectors */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                sx={{
                  fontSize: "14px",
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  "& .MuiSelect-icon": { color: theme.palette.mode === 'dark' ? '#cccccc' : "#666" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.mode === 'dark' ? '#444444' : '#e0e0e0',
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  }
                }}
                IconComponent={LuChevronDown}
              >
                <MenuItem value="November" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? '#111111' : '#f5f5f5',
                  }
                }}>
                  November
                </MenuItem>
                <MenuItem value="December" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? '#111111' : '#f5f5f5',
                  }
                }}>
                  December
                </MenuItem>
                <MenuItem value="January" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? '#111111' : '#f5f5f5',
                  }
                }}>
                  January
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                sx={{
                  fontSize: "14px",
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  "& .MuiSelect-icon": { color: theme.palette.mode === 'dark' ? '#cccccc' : "#666" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.mode === 'dark' ? '#444444' : '#e0e0e0',
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#02BE6A",
                  }
                }}
                IconComponent={LuChevronDown}
              >
                <MenuItem value="2024" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? '#111111' : '#f5f5f5',
                  }
                }}>
                  2024
                </MenuItem>
                <MenuItem value="2025" sx={{ 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? '#111111' : '#f5f5f5',
                  }
                }}>
                  2025
                </MenuItem>
              </Select>
            </FormControl>

            {/* Add Appointment Button */}
            <Button
              variant="contained"
              onClick={handleAddAppointment}
              sx={{
                backgroundColor: "#02BE6A",
                color: "white",
                minWidth: "auto",
                px: 2,
                py: 1,
                borderRadius: 2,
                fontSize: "18px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#029e56",
                },
              }}
            >
              +
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Calendar Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: theme.palette.mode === 'dark' ? '#ffffff' : "#34495e" }}>
                Calendar
              </Typography>
              <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 0.5,
                backgroundColor: theme.palette.mode === 'dark' ? '#111111' : "background.default",
                p: 1,
                borderRadius: 2
              }}>
                {/* Days of Week Header */}
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <Box
                    key={day}
                    sx={{
                      textAlign: "center",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#cccccc' : "#7f8c8d",
                      py: 1,
                      px: 0.5,
                    }}
                  >
                    {day}
                  </Box>
                ))}

                {/* Calendar Dates */}
                {calendarDays.flat().map((day, index) => (
                  <Box
                    key={index}
                    onClick={() => handleDateClick(day)}
                    sx={{
                      textAlign: "center",
                      fontSize: "13px",
                      py: 1,
                      px: 0.5,
                      borderRadius: 1,
                      cursor: day ? "pointer" : "default",
                      backgroundColor: day === selectedDate ? "#02BE6A" : "transparent",
                      color: day === selectedDate ? "white" :
                             day && appointmentDates.includes(day) ? "#02BE6A" :
                             day ? theme.palette.mode === 'dark' ? '#ffffff' : "#2c3e50" : "transparent",
                      fontWeight: day === selectedDate ? 600 :
                                 day && appointmentDates.includes(day) ? 500 : 400,
                      border: day && appointmentDates.includes(day) && day !== selectedDate ?
                             "2px solid #02BE6A" : "none",
                      "&:hover": day ? {
                        backgroundColor: day === selectedDate ? "primary.main" : "success.light",
                      } : {},
                      transition: "all 0.2s ease",
                    }}
                  >
                    {day || ""}
                    {day && appointmentDates.includes(day) && (
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          backgroundColor: day === selectedDate ? "white" : "#02BE6A",
                          borderRadius: "50%",
                          margin: "2px auto 0",
                          display: "block"
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Appointments List Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#ffffff' : "#34495e" }}>
                Appointments ({appointments.length})
              </Typography>
              <Chip
                label={`${appointments.length} appointments`}
                size="small"
                sx={{ 
                  backgroundColor: "success.light", 
                  color: "#000000"  // Changed to black text as requested
                }}
              />
            </Box>

            {appointments.length === 0 ? (
              <Box sx={{ 
                textAlign: "center", 
                py: 4, 
                color: theme.palette.mode === 'dark' ? '#cccccc' : "#7f8c8d",
                backgroundColor: theme.palette.mode === 'dark' ? '#111111' : "background.default",
                borderRadius: 2
              }}>
                <LuCalendar size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                <Typography variant="body1">
                  No appointments scheduled for this date
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Click the + button to add a new appointment
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {appointments.map((appointment, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: getStatusColor(appointment.status),
                      border: `1px solid ${getStatusTextColor(appointment.status)}20`,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: theme.palette.mode === 'dark' 
                          ? "0 2px 8px rgba(255,255,255,0.1)" 
                          : "0 2px 8px rgba(0,0,0,0.1)",
                      }
                    }}
                  >
                    {/* Client Avatar */}
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: getStatusTextColor(appointment.status),
                            border: theme.palette.mode === 'dark' ? "2px solid #000000" : "2px solid white"
                          }}
                        />
                      }
                    >
                      <Avatar
                        src={appointment.profilePic}
                        sx={{ 
                          width: 45, 
                          height: 45,
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
                    </Badge>

                    {/* Client Info */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.mode === 'dark' ? '#ffffff' : "#2c3e50" }}>
                        {appointment.name}
                      </Typography>
                      <Chip
                        label={appointment.type}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.mode === 'dark' ? '#333333' : "white",
                          color: theme.palette.mode === 'dark' ? '#ffffff' : "#7f8c8d",
                          fontSize: "11px",
                          height: "20px"
                        }}
                      />
                    </Box>

                    {/* Time and Status */}
                    <Box sx={{ textAlign: "right", mr: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.mode === 'dark' ? '#ffffff' : "#2c3e50" }}>
                        {appointment.time}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {getStatusIcon(appointment.status)}
                        <Typography
                          variant="caption"
                          sx={{
                            color: getStatusTextColor(appointment.status),
                            fontWeight: 500,
                            fontSize: "11px"
                          }}
                        >
                          {appointment.status === "completed" ? "Completed" : "Upcoming"}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleViewAppointment(appointment.id)}
                          sx={{ color: theme.palette.mode === 'dark' ? '#cccccc' : "#666", "&:hover": { color: "#02BE6A" } }}
                        >
                          <LuEye size={14} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Appointment">
                        <IconButton
                          size="small"
                          onClick={() => handleEditAppointment(appointment.id)}
                          sx={{ color: theme.palette.mode === 'dark' ? '#cccccc' : "#666", "&:hover": { color: "#3FC6FC" } }}
                        >
                          <LuPencil size={14} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Appointment">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          sx={{ color: theme.palette.mode === 'dark' ? '#cccccc' : "#666", "&:hover": { color: "#ff4444" } }}
                        >
                          <LuTrash2 size={14} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>

      {/* Add/Edit Appointment Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          backgroundColor: selectedAppointment ? "#3FC6FC" : "#02BE6A",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LuCalendar size={20} />
            <Typography variant="h6">
              {selectedAppointment ? "Edit Appointment" : "Add New Appointment"}
            </Typography>
          </Box>
          <IconButton onClick={() => setAddDialogOpen(false)} sx={{ color: "white" }}>
            <LuX size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Client Name"
                value={newAppointment.name}
                onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
                InputProps={{ startAdornment: <LuUser size={16} style={{ marginRight: 8, color: '#666' }} /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Appointment Type"
                value={newAppointment.type}
                onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                placeholder="e.g., Weight Loss, Diabetes Management"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={newAppointment.phone}
                onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                InputProps={{ startAdornment: <LuPhone size={16} style={{ marginRight: 8, color: '#666' }} /> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newAppointment.email}
                onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
                InputProps={{ startAdornment: <LuMail size={16} style={{ marginRight: 8, color: '#666' }} /> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                placeholder="Additional notes about the appointment..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setAddDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAppointment}
            variant="contained"
            sx={{
              backgroundColor: selectedAppointment ? "#3FC6FC" : "#02BE6A",
              "&:hover": {
                backgroundColor: selectedAppointment ? "#2ba8d4" : "#029e56",
              },
            }}
          >
            {selectedAppointment ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Appointment Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          backgroundColor: "#02BE6A",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LuEye size={20} />
            <Typography variant="h6">Appointment Details</Typography>
          </Box>
          <IconButton onClick={() => setViewDialogOpen(false)} sx={{ color: "white" }}>
            <LuX size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedAppointment && (
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Avatar
                  src={selectedAppointment.profilePic}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    margin: "0 auto 16px",
                    objectFit: "contain",
                    backgroundColor: "transparent",
                    padding: 1,
                    "& img": {
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                    }
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                  {selectedAppointment.name}
                </Typography>
                <Chip
                  label={selectedAppointment.type}
                  sx={{
                    backgroundColor: "success.light",
                    color: "#02BE6A",
                    mt: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LuClock size={16} color="#666" />
                  <Typography variant="body2" color="text.secondary">Time</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedAppointment.time}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LuCheck size={16} color="#666" />
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                </Box>
                <Chip
                  label={selectedAppointment.status === "completed" ? "Completed" : "Upcoming"}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(selectedAppointment.status),
                    color: getStatusTextColor(selectedAppointment.status),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LuPhone size={16} color="#666" />
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedAppointment.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LuMail size={16} color="#666" />
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedAppointment.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LuCalendar size={16} color="#666" />
                  <Typography variant="body2" color="text.secondary">Notes</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedAppointment.notes}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setViewDialogOpen(false)} color="inherit">
            Close
          </Button>
          {selectedAppointment && (
            <Button
              onClick={() => {
                setViewDialogOpen(false);
                handleEditAppointment(selectedAppointment.id);
              }}
              variant="contained"
              sx={{
                backgroundColor: "#3FC6FC",
                "&:hover": { backgroundColor: "#2ba8d4" },
              }}
            >
              Edit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{
          backgroundColor: "#ff4444",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LuTrash2 size={20} />
            <Typography variant="h6">Delete Appointment</Typography>
          </Box>
          <IconButton onClick={() => setDeleteDialogOpen(false)} sx={{ color: "white" }}>
            <LuX size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete the appointment for{" "}
            <strong>{selectedAppointment?.name}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#ff4444",
              "&:hover": { backgroundColor: "#cc3333" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Chat Popup Dialog */}
      <Dialog
        open={isChatOpen}
        onClose={handleChatClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }
        }}
      >
        <DialogTitle sx={{
          backgroundColor: "#02BE6A",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LuMessageCircle size={20} />
            <Typography variant="h6">Dietitian Chat</Typography>
          </Box>
          <IconButton onClick={handleChatClose} sx={{ color: "white" }}>
            <LuX size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, minHeight: "400px" }}>
          <Box sx={{
            backgroundColor: "#f8f9fa",
            p: 2,
            borderRadius: 2,
            mb: 2,
            border: "1px solid",
            borderColor: "divider"
          }}>
            <Typography variant="body2" color="text.secondary">
              Welcome! I'm here to help with your nutrition questions. How can I assist you today?
            </Typography>
          </Box>

          {/* Chat messages would go here */}
          <Box sx={{
            backgroundColor: "success.light",
            p: 2,
            borderRadius: 2,
            mb: 2,
            border: "1px solid #02BE6A20"
          }}>
            <Typography variant="body2" color="#2c3e50">
              Hi! I have a question about meal planning for diabetes management.
            </Typography>
          </Box>

          <Box sx={{
            backgroundColor: "#fff8e1",
            p: 2,
            borderRadius: 2,
            mb: 2,
            border: "1px solid #fdb90620"
          }}>
            <Typography variant="body2" color="#2c3e50">
              Great question! Let me help you create a balanced meal plan that's suitable for diabetes management.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <input
              type="text"
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none"
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#02BE6A",
                color: "white",
                px: 3,
                "&:hover": {
                  backgroundColor: "#029e56",
                },
              }}
            >
              Send
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Appointments;
