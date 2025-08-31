import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { EventDropArg, EventInput } from "@fullcalendar/core";
import { useViewPort } from "@src/hooks";

type CalendarProps = {
  onDateClick: (value: any) => void;
  onEventClick: (value: any) => void;
  onDrop: (value: any) => void;
  onEventDrop: (value: any) => void;
  events: EventInput[];
};

const Calendar = ({ onDateClick, onEventClick, onDrop, onEventDrop, events }: CalendarProps) => {
  const { height } = useViewPort();

  /*
   * handle calendar methods
   */
  const handleDateClick = (arg: any) => {
    onDateClick(arg);
  };
  const handleEventClick = (arg: any) => {
    onEventClick(arg);
  };
  const handleDrop = (arg: any) => {
    onDrop(arg);
  };
  const handleEventDrop = (arg: EventDropArg) => {
    onEventDrop(arg);
  };

  return (
    <>
      <div id="calendar">
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
          themeSystem="bootstrap"
          handleWindowResize={true}
          slotDuration="00:15:00"
          slotMinTime="08:00:00"
          slotMaxTime="19:00:00"
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
            list: "List",
            prev: "Prev",
            next: "Next",
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          height={height - 200}
          dayMaxEventRows={1}
          editable={true}
          selectable={true}
          droppable={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          drop={handleDrop}
          eventDrop={handleEventDrop}
        />
      </div>
    </>
  );
};

export default Calendar;
