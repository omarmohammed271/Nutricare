import { EventInput } from "@fullcalendar/core";

// Mock data matching the API response format
const defaultEvents: EventInput[] = [
  {
    id: "1",
   
    start: "2025-10-02T08:03:50",
    end: "2025-10-02T09:03:50",
    className: "event-next",
    extendedProps: {
      patient_name: {
        id: 1,
        name: "Hina M."
      },
      doctor_name: "Dr. Smith",
      appointment_type: "initial",
      status: "next",
      notes: "PCOS Diet Planning"
    }
  },
  {
    id: "2",
   
    start: "2025-10-03T10:15:00",
    end: "2025-10-03T11:15:00",
    className: "event-completed",
    extendedProps: {
      patient_name: {
        id: 2,
        name: "Ahmed R"
      },
      doctor_name: "Dr. Johnson",
      appointment_type: "follow_up",
      status: "completed",
      notes: "Weight Loss Plan"
    }
  },
  {
    id: "3",
   
    start: "2025-10-04T14:30:00",
    end: "2025-10-04T15:30:00",
    className: "event-canceled",
    extendedProps: {
      patient_name: {
        id: 3,
        name: "Sarah Khan"
      },
      doctor_name: "Dr. Williams",
      appointment_type: "review",
      status: "canceled",
      notes: "Diet Review"
    }
  }
];

export { defaultEvents };