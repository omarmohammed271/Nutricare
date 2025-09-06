import { EventInput } from "@fullcalendar/core";

// Get current date and format for this week
const now = new Date();
const getWeekStart = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(today.setDate(diff));
};

const weekStart = getWeekStart();

const defaultEvents: EventInput[] = [
  {
    id: "1",
    title: "PCOS Diet Planning – Hina M.",
    start: new Date(weekStart.getTime() + 24 * 60 * 60 * 1000 + 12.5 * 60 * 60 * 1000), // Tuesday 12:30 PM
    end: new Date(weekStart.getTime() + 24 * 60 * 60 * 1000 + 13.5 * 60 * 60 * 1000), // Tuesday 01:30 PM (1 hour duration)
    className: "event-completed",
    extendedProps: {
      clientName: "Hina M.",
      sessionType: "PCOS Diet Planning",
      status: "completed"
    }
  },
  {
    id: "2",
    title: "Follow-Up: Weight Loss Plan – Ahmed R",
    start: new Date(weekStart.getTime() + 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // Tuesday 02:00 PM
    end: new Date(weekStart.getTime() + 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000), // Tuesday 03:00 PM (1 hour duration)
    className: "event-canceled",
    extendedProps: {
      clientName: "Ahmed R",
      sessionType: "Follow-Up: Weight Loss Plan",
      status: "canceled"
    }
  },
  {
    id: "3",
    title: "Initial Consultation – Sarah Khan",
    start: new Date(weekStart.getTime() + 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // Thursday 10:00 AM
    end: new Date(weekStart.getTime() + 3 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000), // Thursday 11:00 AM
    className: "event-next",
    extendedProps: {
      clientName: "Sarah Khan",
      sessionType: "Initial Consultation",
      status: "next"
    }
  },
  {
    id: "4",
    title: "Follow-up Session – Sarah Khan",
    start: new Date(weekStart.getTime() + 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // Monday 10:00 AM
    end: new Date(weekStart.getTime() + 1 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000), // Monday 11:00 AM
    className: "event-completed",
    extendedProps: {
      clientName: "Sarah Khan",
      sessionType: "Follow-up Session",
      status: "completed"
    }
  },
  {
    id: "5",
    title: "Diet Review – Omar Ali",
    start: new Date(weekStart.getTime() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // Wednesday 2:00 PM
    end: new Date(weekStart.getTime() + 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000), // Wednesday 3:00 PM
    className: "event-next",
    extendedProps: {
      clientName: "Omar Ali",
      sessionType: "Diet Review",
      status: "next"
    }
  }
];

export { defaultEvents };
