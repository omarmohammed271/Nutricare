import React, { useEffect, useState } from 'react';
import "@fullcalendar/react";
import { DateClickArg, Draggable } from "@fullcalendar/interaction";
import { DateInput, EventClickArg, EventDropArg, EventInput } from "@fullcalendar/core";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// test data
import { defaultEvents } from "./helper";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Chip,
  IconButton,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert
} from "@mui/material";
import { 
  Add as AddIcon,
  Sync as SyncIcon,
  Share as ShareIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { PageBreadcrumb } from "@src/components";
import Calendar from "./Calendar";
import SidePanel from "./SidePanel";
import AddEditEvent from "./AddEditEvent";
import { LuPlusCircle } from "react-icons/lu";
import { useCalendarEvents, useDeleteAppointment } from "./Api/calendarApi";
import { deleteAppointment, patchAppointment } from "@src/api/endpoints";

const CalendarIndex = () => {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month' | 'list'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarRef, setCalendarRef] = useState<any>(null);
  
  /*
   * modal handling
   */
  const [show, setShow] = useState<boolean>(false);
  const onCloseModal = () => {
    setShow(false);
    setEventData({});
    setDateInfo({});
    setIsEditable(false);
  };
  const onOpenModal = () => setShow(true);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  /*
   * event data
   */
  const [eventData, setEventData] = useState<EventInput>({});
  const [dateInfo, setDateInfo] = useState<any>({});

  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventInput | null>(null);

  // State for showing success/error messages
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({open: false, message: '', severity: 'success'});

  // Fetch events from API using our custom hook
  const { data: events, isLoading, isError, refetch } = useCalendarEvents();

  // Delete appointment mutation
  const deleteMutation = useDeleteAppointment();

  // Handle delete event
  const handleDeleteEvent = (event: EventInput) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (eventToDelete && eventToDelete.id) {
      deleteMutation.mutate(parseInt(eventToDelete.id), {
        
        onSuccess: () => {
          console.log('Event deleted successfully');
          setDeleteDialogOpen(false);
          setEventToDelete(null);
          setShow(false)
        },
        onError: (error) => {
          console.error('Error deleting event:', error);
          setDeleteDialogOpen(false);
          setEventToDelete(null);
        }
      });
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  /*
    calendar events
    */
  // on date click
  const onDateClick = (arg: DateClickArg) => {
    setDateInfo(arg);
    onOpenModal();
    setIsEditable(false);
  };

  // on event click
  const onEventClick = (arg: EventClickArg) => {
    const event = {
      id: String(arg.event.id),
      title: arg.event.title,
      className: arg.event.classNames[0],
      start: arg.event.start || undefined,
      end: arg.event.end || undefined,
      extendedProps: arg.event.extendedProps
    };
    setEventData(event as EventInput);
    setIsEditable(true);
    onOpenModal();
  };

  /*
    on add event
    */
  const onAddEvent = (data: any) => {
    console.log('=== Adding New Event ===');
    console.log('Received data:', data);
    
    // Refetch events to get the updated list
    refetch();
    onCloseModal();
    
    console.log('========================');
  };

  /*
    on update event
    */
  const onUpdateEvent = (data: any) => {
    console.log('=== Updating Event ===');
    console.log('Received data:', data);
    console.log('Event ID to update:', eventData?.id);
    
    // Refetch events to get the updated list
    refetch();
    onCloseModal();
    setIsEditable(false);
    setEventData({});
    
    console.log('========================');
  };

  /*
    on remove event
    */
  const onRemoveEvent = () => {
    if (eventData && eventData.id) {
      handleDeleteEvent(eventData);
    }
  };

  /**
   * on event drop
   */
  const onEventDrop = async (arg: EventDropArg) => {
    try {
      // Extract the event ID and new dates
      const eventId = parseInt(arg.event.id);
      const newStart = arg.event.start;
      const newEnd = arg.event.end;
      
      // Format the dates for the API
      const appointmentData = {
        start_time: newStart?.toISOString(),
        end_time: newEnd?.toISOString()
      };
      
      // Send PATCH request to update the appointment
      await patchAppointment(eventId, appointmentData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Appointment time updated successfully',
        severity: 'success'
      });
      
      // Refetch events to get the updated list
      refetch();
    } catch (error) {
      console.error('Error updating appointment time:', error);
      
      // Show error message
      setSnackbar({
        open: true,
        message: 'Failed to update appointment time',
        severity: 'error'
      });
      
      // Revert the event to its original position
      arg.revert();
    }
  };

  /*
    on event resize
    */
  const onEventResize = async (arg: any) => {
    try {
      // Extract the event ID and new dates
      const eventId = parseInt(arg.event.id);
      const newStart = arg.event.start;
      const newEnd = arg.event.end;
      
      // Format the dates for the API
      const appointmentData = {
        start_time: newStart?.toISOString(),
        end_time: newEnd?.toISOString()
      };
      
      // Send PATCH request to update the appointment
      await patchAppointment(eventId, appointmentData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Appointment duration updated successfully',
        severity: 'success'
      });
      
      // Refetch events to get the updated list
      refetch();
    } catch (error) {
      console.error('Error updating appointment duration:', error);
      
      // Show error message
      setSnackbar({
        open: true,
        message: 'Failed to update appointment duration',
        severity: 'error'
      });
      
      // Revert the event to its original duration
      arg.revert();
    }
  };

  // create new event
  const createNewEvent = () => {
    setIsEditable(false);
    onOpenModal();
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (calendarRef) {
      calendarRef.getApi().prev();
      setCurrentDate(calendarRef.getApi().getDate());
    }
  };

  const handleNext = () => {
    if (calendarRef) {
      calendarRef.getApi().next();
      setCurrentDate(calendarRef.getApi().getDate());
    }
  };

  const handleToday = () => {
    if (calendarRef) {
      calendarRef.getApi().today();
      setCurrentDate(calendarRef.getApi().getDate());
    }
  };

  const handleViewChange = (view: 'day' | 'week' | 'month' | 'list') => {
    setCurrentView(view);
    if (calendarRef) {
      const viewMap = {
        day: 'timeGridDay',
        week: 'timeGridWeek', 
        month: 'dayGridMonth',
        list: 'listWeek'
      };
      calendarRef.getApi().changeView(viewMap[view]);
    }
  };

  // Sync handler to refetch data
  const handleSync = () => {
    refetch();
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageBreadcrumb title="Calendar" subName="Apps" />

      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#02BE6A', fontWeight: 600 }}>
            Calendar
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={createNewEvent}
              sx={{
                bgcolor: '#02BE6A',
                '&:hover': { bgcolor: '#02A85A' },
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              New Appointment
            </Button>
            <Button
              variant="outlined"
              startIcon={<SyncIcon />}
              onClick={handleSync}
              sx={{
                borderColor: '#02BE6A',
                color: '#02BE6A',
                '&:hover': { 
                  borderColor: '#02A85A', 
                  bgcolor: 'rgba(2, 190, 106, 0.1)' 
                },
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Sync
            </Button>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              sx={{
                borderColor: '#02BE6A',
                color: '#02BE6A',
                '&:hover': { 
                  borderColor: '#02A85A', 
                  bgcolor: 'rgba(2, 190, 106, 0.1)' 
                },
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Share
            </Button>
          </Box>
        </Box>

        {/* Navigation and View Selector */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handlePrevious} sx={{ color: '#02BE6A' }}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={handleNext} sx={{ color: '#02BE6A' }}>
              <NavigateNextIcon />
            </IconButton>
            <Button 
              variant="outlined" 
              onClick={handleToday}
              sx={{
                borderColor: '#02BE6A',
                color: '#02BE6A',
                '&:hover': { 
                  borderColor: '#02A85A', 
                  bgcolor: 'rgba(2, 190, 106, 0.1)' 
                },
                borderRadius: 1,
                textTransform: 'none',
                px: 2
              }}
            >
              Today
            </Button>
            <Typography variant="h6" sx={{ ml: 2, fontWeight: 600, color: '#333' }}>
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric',
                ...(currentView === 'day' && { day: 'numeric', weekday: 'long' })
              })}
            </Typography>
          </Box>
          
          <ButtonGroup variant="outlined" sx={{ borderRadius: 2 }}>
            {['Day', 'Week', 'Month', 'List'].map((view) => (
              <Button
                key={view}
                onClick={() => handleViewChange(view.toLowerCase() as any)}
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  ...(currentView === view.toLowerCase() ? {
                    bgcolor: '#02BE6A',
                    color: 'white',
                    '&:hover': { bgcolor: '#02A85A' }
                  } : {
                    borderColor: '#e0e0e0',
                    color: '#666',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  })
                }}
              >
                {view}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>

      {/* Calendar Section */}
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
              <Typography>Loading appointments...</Typography>
            </Box>
          ) : isError ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
              <Typography>Error loading appointments. Please try again.</Typography>
            </Box>
          ) : (
            <Calendar
              onDateClick={onDateClick}
              onEventClick={onEventClick}
              onEventDrop={onEventDrop}
              onEventResize={onEventResize}
              events={events || defaultEvents}
              currentView={currentView}
              onCalendarRef={setCalendarRef}
              currentDate={currentDate}
            />
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: '#02BE6A'
          }} />
          <Typography variant="body2" color="text.secondary">
            Completed
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: '#f44336'
          }} />
          <Typography variant="body2" color="text.secondary">
            Canceled
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: '#2196f3'
          }} />
          <Typography variant="body2" color="text.secondary">
            Next
          </Typography>
        </Box>
      </Box>

      <AddEditEvent
        isOpen={show}
        onClose={onCloseModal}
        isEditable={isEditable}
        eventData={eventData}
        onUpdateEvent={onUpdateEvent}
        onRemoveEvent={onRemoveEvent}
        onAddEvent={onAddEvent}
        dateInfo={dateInfo}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this appointment?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            variant="contained"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/error messages */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({...snackbar, open: false})} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CalendarIndex;