import { useState } from "react";
import { useForm } from "react-hook-form";
import { EventInput } from "@fullcalendar/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuX } from "react-icons/lu";
import { Box, Button, DialogContent, DialogTitle, IconButton, MenuItem, Typography } from "@mui/material";
import { BootstrapDialog } from "@src/pages/base-ui/Dialogs";
import { FormInput, SelectInput } from "@src/components";
import { createAppointment } from "@src/api/endpoints";

type FormValues = {
  className: string;
  appointmentType: string;
  startTime: string;
  endTime: string;
  date: string;
};

type AddEditEventProps = {
  isOpen: boolean;
  onClose: () => void;
  isEditable?: boolean;
  eventData: EventInput;
  onRemoveEvent?: () => void;
  onUpdateEvent: (value: any) => void;
  onAddEvent: (value: any) => void;
  dateInfo?: any;
  selectedClient?: any;
};

const AddEditEvent = ({
  isOpen,
  onClose,
  isEditable,
  eventData,
  onRemoveEvent,
  onUpdateEvent,
  onAddEvent,
  dateInfo,
  selectedClient,
}: AddEditEventProps) => {
  // event state
  const [event] = useState<EventInput>(eventData);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      className: yup.string().required("Please select category"),
      appointmentType: yup.string().required("Please select appointment type"),
      startTime: yup.string().required("Please select start time"),
      endTime: yup.string().required("Please select end time"),
      date: yup.string().required("Please select date"),
    }),
  );

  /*
   * form methods
   */
  const getTimeString = (dateInput: any): string => {
    if (!dateInput) return "09:00";
    try {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      if (isNaN(date.getTime())) return "09:00";
      return date.toTimeString().slice(0, 5);
    } catch {
      return "09:00";
    }
  };
  
  const getDateString = (dateInput: any): string => {
    if (!dateInput) return new Date().toISOString().split('T')[0];
    try {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];
      return date.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  };
  
  const methods = useForm<FormValues>({
    defaultValues: {
      className: event.className ? String(event.className) : "event-next",
      // Ensure appointmentType is one of the valid options
      appointmentType: (event.extendedProps?.appointment_type === "initial" || event.extendedProps?.appointment_type === "follow_up") 
        ? event.extendedProps?.appointment_type 
        : "initial",
      startTime: getTimeString(event.start),
      endTime: event.end ? getTimeString(event.end) : "10:00",
      date: dateInfo?.dateStr || getDateString(event.start),
    },
    resolver: schemaResolver,
  });
  const { handleSubmit, reset, control } = methods;

  /*
   * handle form submission
   */
  const onSubmitEvent = async (data: FormValues) => {
    // Create start and end datetime objects
    // HTML5 time input always returns 24-hour format (HH:MM)
    const startDateTime = new Date(`${data.date}T${data.startTime}:00.000`);
    const endDateTime = new Date(`${data.date}T${data.endTime}:00.000`);
    
    // Format data according to the required structure
    const appointmentData = {
      patient_name_id: selectedClient?.id || 0,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      appointment_type: data.appointmentType,
      status: data.className.replace('event-', ''),
      notes: data.appointmentType
    };
    
    try {
      // Submit the appointment data to the API
      console.log('Submitting appointment data:', appointmentData);
      
      // Make the API call to create the appointment
      const response = await createAppointment(appointmentData);
      console.log('Appointment created:', response);
      
      // Create event data for the calendar
      const eventData = {
        ...(isEditable && event.id && { id: event.id }), // Include ID when editing
        className: data.className,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        extendedProps: {
          patient_name: {
            id: selectedClient?.id || (isEditable ? event.extendedProps?.patient_name?.id || 0 : 0),
            name: selectedClient?.name || ""
          },
          doctor_name: isEditable ? event.extendedProps?.doctor_name || "" : "",
          appointment_type: data.appointmentType,
          status: data.className.replace('event-', ''),
          notes: data.appointmentType
        }
      };
      
      if (isEditable) {
        console.log('Updating event:', eventData);
        onUpdateEvent(eventData);
      } else {
        console.log('Adding new event:', eventData);
        onAddEvent(eventData);
      }
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting appointment:', error);
      // Handle error appropriately (show error message to user)
    }
  };

  return (
    <BootstrapDialog open={isOpen} onClose={onClose} >
      <DialogTitle sx={{ m: 0, p: 2 }}>{isEditable ? "Edit Event" : "Add New Event"}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}>
        <LuX />
      </IconButton>
      <DialogContent sx={{ width: 600 }}>
        <form onSubmit={handleSubmit(onSubmitEvent)}>
          <Box sx={{ pb: "24px" }}>
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
              <Typography sx={{ width: '15%', fontSize: '0.875rem', fontWeight: 500 }}>Appointment Type:</Typography>
              <SelectInput 
                type="select" 
                name="appointmentType" 
                control={control}
                containerSx={{ flex: 1 }}
              >
                <MenuItem value="initial">Initial</MenuItem>
                <MenuItem value="follow_up">Follow Up</MenuItem>
              </SelectInput>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
              <Typography sx={{ width: '15%', fontSize: '0.875rem', fontWeight: 500 }}>Date:</Typography>
              <FormInput
                type="date"
                name="date"
                control={control}
                containerSx={{ flex: 1 }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1 }}>
                <Typography sx={{ width: '30%', fontSize: '0.875rem', fontWeight: 500 }}>Start Time:</Typography>
                <FormInput
                  type="time"
                  name="startTime"
                  control={control}
                  containerSx={{ flex: 1 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1 }}>
                <Typography sx={{ width: '30%', fontSize: '0.875rem', fontWeight: 500 }}>End Time:</Typography>
                <FormInput
                  type="time"
                  name="endTime"
                  control={control}
                  containerSx={{ flex: 1 }}
                />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
              <Typography sx={{ width: '15%', fontSize: '0.875rem', fontWeight: 500 }}>Status:</Typography>
              <SelectInput 
                type="select" 
                name="className" 
                control={control}
                containerSx={{ flex: 1 }}
              >
                <MenuItem value="event-completed" disabled>Completed</MenuItem>
                <MenuItem value="event-canceled" disabled>Canceled</MenuItem>
                <MenuItem value="event-next">Next</MenuItem>
              </SelectInput>
            </Box>
          </Box>

          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
            {isEditable && (
              <Button color="error" variant="contained" onClick={onRemoveEvent}>
                Delete
              </Button>
            )}
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Button variant="contained" onClick={onClose}>
                Close
              </Button>
              <Button color="success" type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default AddEditEvent;