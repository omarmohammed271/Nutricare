import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { EventInput } from "@fullcalendar/core";
import { Box, Typography } from '@mui/material';
import { useViewPort } from "@src/hooks";

type CalendarProps = {
  onDateClick: (value: any) => void;
  onEventClick: (value: any) => void;
  onEventDrop?: (value: any) => void;
  onEventResize?: (value: any) => void;
  events: EventInput[];
  currentView: 'day' | 'week' | 'month' | 'list';
  onCalendarRef: (ref: any) => void;
  currentDate: Date;
};

const Calendar = ({ onDateClick, onEventClick, onEventDrop, onEventResize, events, currentView, onCalendarRef, currentDate }: CalendarProps) => {
  const { height } = useViewPort();
  
  const getInitialView = () => {
    switch(currentView) {
      case 'day': return 'timeGridDay';
      case 'week': return 'timeGridWeek';
      case 'month': return 'dayGridMonth';
      case 'list': return 'listWeek';
      default: return 'timeGridWeek';
    }
  };

  /*
   * handle calendar methods
   */
  const handleDateClick = (arg: any) => {
    onDateClick(arg);
  };
  const handleEventClick = (arg: any) => {
    onEventClick(arg);
  };
  const handleEventDrop = (arg: any) => {
    if (onEventDrop) {
      onEventDrop(arg);
    }
  };
  const handleEventResize = (arg: any) => {
    if (onEventResize) {
      onEventResize(arg);
    }
  };

  const renderEventContent = (eventInfo: any) => {
    const { event } = eventInfo;
    const { extendedProps } = event;
    
    // Format start and end times
    const startTime = event.start ? event.start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    }) : '';
    const endTime = event.end ? event.end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    }) : '';
    
    // Get patient name from the new API structure
    const patientName = extendedProps.patient_name?.name || 'Unknown Patient';
    const appointmentType = extendedProps.appointment_type || 'Appointment';
    const status = extendedProps.status || 'next';
    
    return (
      <Box sx={{
        p: 0.5,
        borderRadius: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.3,
        border: `2px solid ${getEventColor(status).border}`,
        backgroundColor: getEventColor(status).bg,
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* Prominent Time Display at Top */}
        <Box sx={{
          backgroundColor: getEventColor(status).border,
          color: 'white',
          px: 0.5,
          py: 0.3,
          borderRadius: 0.5,
          fontSize: '0.7rem',
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {startTime} - {endTime}
        </Box>
        
        {/* Status Badge */}
        <Box sx={{
          backgroundColor: getEventColor(status).border,
          color: 'white',
          px: 0.5,
          py: 0.2,
          borderRadius: 0.3,
          fontSize: '0.6rem',
          fontWeight: 600,
          textAlign: 'center',
          alignSelf: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%'
        }}>
          {status?.toUpperCase() || 'EVENT'}
        </Box>
        
        {/* Patient Name */}
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '0.75rem',
            lineHeight: 1.1,
            color: '#333',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        >
          {patientName || 'N/A'}
        </Typography>
        
        {/* Appointment Type */}
        <Typography 
          variant="caption" 
          sx={{ 
            fontSize: '0.65rem',
            color: '#555',
            fontWeight: 400,
            textAlign: 'center',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        >
          {appointmentType || event.title}
        </Typography>
      </Box>
    );
  };

  const getEventColor = (status: string) => {
    switch(status) {
      case 'completed':
        return {
          border: '#4CAF50',
          bg: 'rgba(76, 175, 80, 0.1)',
          text: '#333'
        };
      case 'canceled':
        return {
          border: '#FF5722',
          bg: 'rgba(255, 87, 34, 0.1)',
          text: '#333'
        };
      case 'next':
        return {
          border: '#2196F3',
          bg: 'rgba(33, 150, 243, 0.1)',
          text: '#333'
        };
      default:
        return {
          border: '#666',
          bg: 'rgba(102, 102, 102, 0.1)',
          text: '#333'
        };
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box 
        id="calendar" 
        sx={{
          '& .fc-v-event ':{
            background:'none'
          },
          '& .css-1eq835z':{
            width: '100%',
            height: `${height - 100}px`,
            borderRadius: '8px',
       
          },
          '& .fc': {
            fontFamily: 'Inter, sans-serif'
          },
          '& .fc-theme-standard td, & .fc-theme-standard th': {
            border: '1px solid #e0e0e0'
          },
          '& .fc-timegrid-slot': {
            height: '120px !important',
            minHeight: '120px !important'
          },
          '& .fc-timegrid-axis': {
            width: '80px !important'
          },
          '& .fc-timegrid-col': {
            minWidth: '250px !important'
          },
          '& .fc-daygrid-day': {
            minHeight: '180px !important'
          },
          '& .fc-timegrid-body': {
            minHeight: '100% !important'
          },
          '& .fc-timegrid-slot-label': {
            fontSize: '0.875rem',
            color: '#666',
            paddingRight: '1rem',
            verticalAlign: 'top !important'
          },
          '& .fc-event': {
            borderRadius: '8px !important',
            border: 'none !important',
            margin: '3px 6px !important',
            boxShadow: '0 3px 6px rgba(0,0,0,0.15) !important',
            minHeight: '100px !important',
            width: '100% !important',
          },
          '& .fc-event.bg-success': {
            backgroundColor: 'rgba(53, 194, 130, 0.3) !important',
            borderColor: '#02BE6A !important',
            color: 'black !important'
          },
          '& .fc-event.bg-error': {
            backgroundColor: 'rgba(255, 107, 107, 0.3) !important',
            borderColor: '#FF6B6B !important',
            color: 'black !important'
          },
          '& .fc-event.bg-info': {
            backgroundColor: 'rgba(77, 171, 247, 0.3) !important',
            borderColor: '#4DABF7 !important',
            color: 'black !important'
          },
          '& .fc-event.bg-warning': {
            backgroundColor: 'rgba(255, 212, 59, 0.3) !important',
            borderColor: '#FFD43B !important',
            color: 'black !important'
          },
          '& .fc-timegrid-now-indicator-line': {
            borderColor: '#02BE6A !important',
            borderWidth: '2px !important'
          },
          '& .fc-col-header-cell': {
            backgroundColor: '#f8f9fa !important',
            fontWeight: '600 !important',
            color: '#333 !important',
            borderBottom: '2px solid #e0e0e0 !important'
          },
          '& .fc-scrollgrid': {
            border: '1px solid #e0e0e0 !important'
          },
          '& .fc-timegrid-divider': {
            display: 'none !important'
          },
          '& .fc-day-today .fc-col-header-cell-cushion': {
            color: '#02BE6A !important'
          }
        }}
      >
        <FullCalendar
          ref={onCalendarRef}
          key={currentView}
          initialView={getInitialView()}
          initialDate={currentDate}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
          handleWindowResize={true}
          slotDuration="01:00:00"
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          headerToolbar={false}
          height={height - 100}
          editable={true}
          selectable={true}
          allDaySlot={false}
          expandRows={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventContent={renderEventContent}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
          }}
          dayHeaderFormat={{
            weekday: 'long',
            month: 'numeric',
            day: 'numeric'
          }}
          nowIndicator={true}
          scrollTime="06:00:00"
        />
      </Box>
    </Box>
  );
};

export default Calendar;
