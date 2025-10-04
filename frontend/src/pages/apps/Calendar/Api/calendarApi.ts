import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppointments, createAppointment, deleteAppointment, patchAppointment, getClients } from "@src/api/endpoints";
import { EventInput } from "@fullcalendar/core";

// Transform API appointment data to FullCalendar event format
export const transformAppointmentToEvent = (appointment: any): EventInput => {
  return {
    id: String(appointment.id),
    start: appointment.start_time,
    end: appointment.end_time,
    className: `event-${appointment.status}`,
    extendedProps: {
      patient_name: {
        id: appointment.patient_name.id,
        name: appointment.patient_name.name
      },
      doctor_name: "", // API doesn't provide doctor name
      appointment_type: appointment.appointment_type,
      status: appointment.status,
      notes: appointment.notes
    }
  };
};

// Custom hook for fetching calendar events
export const useCalendarEvents = () => {
  return useQuery({
    queryKey: ['calendarEvents'],
    queryFn: async () => {
      const appointments = await getAppointments();
      return appointments.map(transformAppointmentToEvent);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,

  });
};

// Custom hook for fetching clients
export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const clients = await getClients();
      return clients;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Function to create a new appointment
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      // Invalidate and refetch calendar events
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
    },
  });
};

// Function to delete an appointment
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteAppointment(id),
    onSuccess: () => {
      // Invalidate and refetch calendar events
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
    },
  });
};

// Delete event function
export const DeleteEvent = async (eventId: number) => {
  try {
    const response = await deleteAppointment(eventId);
    return response;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Patch event function
export const PatchEvent = async (eventId: number, data: Partial<any>) => {
  try {
    // Only allow patching if the event is editable
    if (!eventId) {
      throw new Error('Event ID is required for patching');
    }
    
    const response = await patchAppointment(eventId, data);
    return response;
  } catch (error) {
    console.error('Error patching event:', error);
    throw error;
  }
};