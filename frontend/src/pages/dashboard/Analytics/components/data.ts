export type TableRecord = {
  id: number;
  channel: string;
  visits: string;
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit";
  now: number;
  network: string;
  duration: string;
  session: string;
  views: string;
};

// dummy record
export const records: TableRecord[] = [
  {
    id: 1,
    channel: "Direct",
    visits: "2,050",
    color: "primary",
    now: 65,
    network: "Facebook",
    duration: "0-30",
    session: "2,250",
    views: "4,250",
  },
  {
    id: 2,
    channel: "Organic Search",
    visits: "1,405",
    color: "info",
    now: 45,
    network: "Instagram",
    duration: "31-60",
    session: "1,501",
    views: "2,050",
  },
  {
    id: 3,
    channel: "Refferal",
    visits: "750",
    color: "warning",
    now: 30,
    network: "Twitter",
    duration: "61-120",
    session: "750",
    views: "1,600",
  },
  {
    id: 4,
    channel: "Social",
    visits: "540",
    color: "error",
    now: 25,
    network: "LinkedIn",
    duration: "121-240",
    session: "540",
    views: "1,040",
  },
  {
    id: 5,
    channel: "Other",
    visits: "8,965",
    color: "success",
    now: 30,
    network: "Other",
    duration: "141-420",
    session: "56",
    views: "886",
  },
];
