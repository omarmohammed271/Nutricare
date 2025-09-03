
import React, { useEffect, useState } from 'react';
import "@fullcalendar/react";
import { DateClickArg, Draggable } from "@fullcalendar/interaction";
import { DateInput, EventClickArg, EventDropArg, EventInput } from "@fullcalendar/core";

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
  ButtonGroup
} from "@mui/material";
import { 
  Add as AddIcon,
  Sync as SyncIcon,
  Share as ShareIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { PageBreadcrumb } from "@src/components";
import Calendar from "./Calendar";
import SidePanel from "./SidePanel";
import AddEditEvent from "./AddEditEvent";
import { LuPlusCircle } from "react-icons/lu";

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
  };
  const onOpenModal = () => setShow(true);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  /*
   * event data
   */
  const [events, setEvents] = useState<EventInput[]>([...defaultEvents]);
  const [eventData, setEventData] = useState<EventInput>({});
  const [dateInfo, setDateInfo] = useState<any>({});

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
    };
    setEventData(event);
    setIsEditable(true);
    onOpenModal();
  };

  /*
    on add event
    */
  const onAddEvent = (data: any) => {
    const modifiedEvents = [...events];
    const event = {
      id: String(modifiedEvents.length + 1),
      title: data.title,
      start: Object.keys(dateInfo).length !== 0 ? dateInfo.date : new Date(),
      className: data.className,
    };
    modifiedEvents.push(event);
    setEvents(modifiedEvents);
    onCloseModal();
  };

  /*
    on update event
    */
  const onUpdateEvent = (data: any) => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex((e: any) => e["id"] === eventData!.id);
    modifiedEvents[idx]["title"] = data.title;
    modifiedEvents[idx]["className"] = data.className;
    setEvents(modifiedEvents);
    onCloseModal();
    setIsEditable(false);
  };

  /*
    on remove event
    */
  const onRemoveEvent = () => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex((e: any) => e["id"] === eventData!.id);
    modifiedEvents.splice(idx, 1);
    setEvents(modifiedEvents);
    onCloseModal();
  };

  /**
   * on event drop
   */
  const onEventDrop = (arg: any) => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex((e) => e["id"] === arg.event.id);
    modifiedEvents[idx]["title"] = arg.event.title;
    modifiedEvents[idx]["className"] = arg.event.classNames;
    modifiedEvents[idx]["start"] = arg.event.start;
    modifiedEvents[idx]["end"] = arg.event.end;
    setEvents(modifiedEvents);
    setIsEditable(false);
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
          <Calendar
            onDateClick={onDateClick}
            onEventClick={onEventClick}
            events={events}
            currentView={currentView}
            onCalendarRef={setCalendarRef}
            currentDate={currentDate}
          />
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
      />
    </Box>
  );
};

export default CalendarIndex;
