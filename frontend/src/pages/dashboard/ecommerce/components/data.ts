type Client = {
  name: string;
  type: string;
  time: string;
  status: 'completed' | 'pending' | 'upcoming';
  profilePic: string;
};

type CaseType = {
  name: string;
  count: number;
  color: string;
  percentage: number;
};

const caseData: CaseType[] = [
  {
    name: "Diabetes",
    count: 65,
    color: "#02BE6A",
    percentage: 40,
  },
  {
    name: "Cancer",
    count: 65,
    color: "#26c362",
    percentage: 35,
  },
  {
    name: "Neurological",
    count: 65,
    color: "#3FC6FC",
    percentage: 25,
  },
];

const appointments: Client[] = [
  {
    name: "Anastasia",
    type: "Follow up",
    time: "03:00 PM",
    status: "upcoming",
    profilePic: "/src/assets/images/users/user-1.jpg",
  },
  {
    name: "Angelica Bjork",
    type: "Assessment",
    time: "12:00 PM",
    status: "upcoming",
    profilePic: "/src/assets/images/users/user-2.jpg",
  },
  {
    name: "Asad Ullah",
    type: "Assessment",
    time: "12:00 PM",
    status: "upcoming",
    profilePic: "/src/assets/images/users/user-3.jpg",
  },
  {
    name: "Mandy Wright",
    type: "Follow up",
    time: "12:00 PM",
    status: "upcoming",
    profilePic: "/src/assets/images/users/user-4.jpg",
  },
  {
    name: "Steve Martin",
    type: "Consultation",
    time: "09:00 AM",
    status: "completed",
    profilePic: "/src/assets/images/users/user-5.jpg",
  },
];

export { caseData, appointments };
