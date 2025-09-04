import { useState } from "react";
import { useForm } from "react-hook-form";
import { EventInput } from "@fullcalendar/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuX } from "react-icons/lu";
import { Box, Button, DialogContent, DialogTitle, IconButton, MenuItem, Typography } from "@mui/material";
import { BootstrapDialog } from "@src/pages/base-ui/Dialogs";
import { FormInput, SelectInput } from "@src/components";

type FormValues = {
  title: string;
  className: string;
  clientName: string;
  sessionType: string;
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
}: AddEditEventProps) => {
  // event state
  const [event] = useState<EventInput>(eventData);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup.string().required("Please enter event name"),
      className: yup.string().required("Please select category"),
      clientName: yup.string().required("Please enter client name"),
      sessionType: yup.string().required("Please enter session type"),
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
      title: event.title || "",
      className: event.className ? String(event.className) : "event-completed",
      clientName: event.extendedProps?.clientName || "",
      sessionType: event.extendedProps?.sessionType || "",
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
  const onSubmitEvent = (data: FormValues) => {
    // Create start and end datetime objects
    const startDateTime = new Date(`${data.date}T${data.startTime}:00`);
    const endDateTime = new Date(`${data.date}T${data.endTime}:00`);
    
    const eventData = {
      ...(isEditable && event.id && { id: event.id }), // Include ID when editing
      title: data.title,
      className: data.className,
      start: startDateTime,
      end: endDateTime,
      extendedProps: {
        clientName: data.clientName,
        sessionType: data.sessionType,
        status: data.className.replace('event-', '')
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
  };

  return (
    <BootstrapDialog open={isOpen} onClose={onClose}>
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
      <DialogContent sx={{ width: 500 }}>
        <form onSubmit={handleSubmit(onSubmitEvent)}>
          <Box sx={{ pb: "24px" }}>
            <FormInput
              type="text"
              label="Event Name"
              name="title"
              placeholder="Insert Event Name"
              key="title"
              control={control}
            />
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
              <Typography sx={{ width: '15%', fontSize: '0.875rem', fontWeight: 500 }}>Client Name:</Typography>
              <FormInput
                type="text"
                name="clientName"
                placeholder="Enter client name"
                control={control}
                containerSx={{ flex: 1 }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
              <Typography sx={{ width: '15%', fontSize: '0.875rem', fontWeight: 500 }}>Session Type:</Typography>
              <FormInput
                type="text"
                name="sessionType"
                placeholder="Enter session type"
                control={control}
                containerSx={{ flex: 1 }}
              />
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
                <MenuItem value="event-completed">Completed</MenuItem>
                <MenuItem value="event-canceled">Canceled</MenuItem>
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