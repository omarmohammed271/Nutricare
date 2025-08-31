/*
 * Copyright (c) 2023.
 * File Name: index.tsx
 * Author: Coderthemes
 */

import "@fullcalendar/react";
import { DateClickArg, Draggable } from "@fullcalendar/interaction";
import { DateInput, EventClickArg, EventDropArg, EventInput } from "@fullcalendar/core";

// test data
import { defaultEvents } from "./helper";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import Calendar from "./Calendar";
import SidePanel from "./SidePanel";
import AddEditEvent from "./AddEditEvent";
import { useEffect, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";

const index = () => {
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

  useEffect(() => {
    // create draggable events
    const draggableEl = document.getElementById("external-events");
    if (draggableEl) {
      new Draggable(draggableEl!, {
        itemSelector: ".external-event",
      });
    } else {
      throw new Error("Element with id 'external-events' not found");
    }
  }, []);

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

  // on drop
  const onDrop = (arg: any) => {
    const dropEventData = arg;
    const title = dropEventData.draggedEl.title;
    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title: title,
        start: dropEventData ? dropEventData.dateStr : new Date(),
        className: dropEventData.draggedEl.attributes["data-class"]["value"],
      };
      const modifiedEvents = [...events];
      modifiedEvents.push(newEvent);
      setEvents(modifiedEvents);
    }
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

  return (
    <>
      <PageBreadcrumb title="Calender" subName="Apps" />

      <Grid container spacing={3}>
        <Grid item xl={3} lg={4} xs={12}>
          <Card>
            <CardContent sx={{ paddingX: "25px" }}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                sx={{ width: "100%", marginY: "8px" }}
                onClick={createNewEvent}>
                <LuPlusCircle />
                <Typography sx={{ paddingInlineStart: "5px" }}>Create New Event</Typography>
              </Button>
              <SidePanel />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={9} lg={8} xs={12}>
          <Card>
            <CardContent>
              <Calendar
                onDateClick={onDateClick}
                onEventClick={onEventClick}
                onDrop={onDrop}
                onEventDrop={onEventDrop}
                events={events}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AddEditEvent
        isOpen={show}
        onClose={onCloseModal}
        isEditable={isEditable}
        eventData={eventData}
        onUpdateEvent={onUpdateEvent}
        onRemoveEvent={onRemoveEvent}
        onAddEvent={onAddEvent}
      />
    </>
  );
};

export default index;
