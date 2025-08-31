import avatar1 from "@src/assets/images/avatars/avatar1.png";
import avatar2 from "@src/assets/images/avatars/avatar2.png";
import avatar3 from "@src/assets/images/avatars/avatar3.png";
import avatar4 from "@src/assets/images/avatars/avatar4.png";
import avatar5 from "@src/assets/images/avatars/avatar5.png";
import avatar6 from "@src/assets/images/avatars/avatar6.png";
import avatar7 from "@src/assets/images/avatars/avatar7.png";
import avatar8 from "@src/assets/images/avatars/avatar8.png";
import avatar9 from "@src/assets/images/avatars/avatar9.png";
import avatar10 from "@src/assets/images/avatars/avatar10.png";

type UserType = {
  id: string;
  title: string;
  image: string;
  textBg?: string;
};

export type TaskPriorityType = "high" | "medium" | "low";

export type TaskType = {
  id: number;
  title: string;
  section: SectionType["id"];
  priority: TaskPriorityType;
  dueDate: string;
  category: string;
  comments: number;
  userAvatar: UserType[];
};

type AssigneeType = {
  id: number;
  title: string;
  image: string;
  isImage: boolean;
};

export type SectionType = {
  id: string;
  title: string;
};

const sections: SectionType[] = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "in_progress",
    title: "In Progress",
  },
  {
    id: "review",
    title: "Review",
  },
  {
    id: "done",
    title: "Done",
  },
];

const tasks: TaskType[] = [
  {
    id: 1,
    title: "iOS App home page",
    section: "todo",
    priority: "high",
    dueDate: "18 Jul 2023",
    category: "iOS",
    comments: 74,
    userAvatar: [
      {
        id: "1",
        title: "Tosha",
        image: avatar1,
      },
      {
        id: "2",
        title: "Brain",
        image: avatar3,
      },
      {
        id: "3",
        title: "Hooker",
        image: "K",
        textBg: "bg-success text-white",
      },
      {
        id: "4",
        title: "More +",
        image: "9+",
        textBg: "bg-primary text-white",
      },
    ],
  },
  {
    id: 2,
    title: "Topnav layout design",
    section: "todo",
    priority: "medium",
    dueDate: "15 Dec 2023",
    category: "Attex",
    comments: 28,
    userAvatar: [
      {
        id: "5",
        title: "Tosha",
        image: avatar2,
      },
      {
        id: "6",
        title: "Brain",
        image: avatar4,
      },
    ],
  },
  {
    id: 3,
    title: "Invite user to a project",
    section: "todo",
    priority: "low",
    dueDate: "11 Jul 2023",
    category: "CRM",
    comments: 68,
    userAvatar: [
      {
        id: "7",
        title: "Tosha",
        image: avatar5,
      },
      {
        id: "8",
        title: "Brain",
        image: avatar6,
      },
      {
        id: "9",
        title: "Hooker",
        image: "M",
        textBg: "bg-info text-white",
      },
    ],
  },
  {
    id: 4,
    title: "Write a release note",
    section: "in_progress",
    priority: "medium",
    dueDate: "22 Jun 2023",
    category: "Attex",
    comments: 17,
    userAvatar: [
      {
        id: "10",
        title: "Tosha",
        image: avatar7,
      },
      {
        id: "11",
        title: "Brain",
        image: avatar8,
      },
    ],
  },
  {
    id: 5,
    title: "Enable analytics tracking",
    section: "in_progress",
    priority: "low",
    dueDate: "19 Jun 2023",
    category: "CRM",
    comments: 48,
    userAvatar: [
      {
        id: "12",
        title: "Tosha",
        image: avatar10,
      },
      {
        id: "13",
        title: "Hooker",
        image: "K",
        textBg: "bg-warning text-white",
      },
      {
        id: "14",
        title: "Brain",
        image: avatar9,
      },
    ],
  },
  {
    id: 6,
    title: "Kanban board design",
    section: "review",
    priority: "high",
    dueDate: "2 May 2023",
    category: "CRM",
    comments: 65,
    userAvatar: [
      {
        id: "15",
        title: "Tosha",
        image: avatar2,
      },
      {
        id: "16",
        title: "Brain",
        image: avatar4,
      },
      {
        id: "17",
        title: "Hooker",
        image: "D",
        textBg: "bg-light text-black",
      },
    ],
  },
  {
    id: 7,
    title: "Code HTML email template",
    section: "review",
    priority: "medium",
    dueDate: "7 May 2023",
    category: "CRM",
    comments: 106,
    userAvatar: [
      {
        id: "18",
        title: "Tosha",
        image: avatar1,
      },
      {
        id: "19",
        title: "Brain",
        image: avatar10,
      },
      {
        id: "20",
        title: "Brain",
        image: avatar5,
      },
    ],
  },
  {
    id: 8,
    title: "Brand logo design",
    section: "review",
    priority: "medium",
    dueDate: "8 Jul 2023",
    category: "Design",
    comments: 95,
    userAvatar: [
      {
        id: "21",
        title: "Hooker",
        image: "M",
        textBg: "bg-primary text-white",
      },
      {
        id: "22",
        title: "Hooker",
        image: "A",
        textBg: "bg-info text-white",
      },
      {
        id: "23",
        title: "Brain",
        image: avatar1,
      },
    ],
  },
  {
    id: 9,
    title: "Improve animation loader",
    section: "review",
    priority: "high",
    dueDate: "22 Jul 2023",
    category: "CRM",
    comments: 39,
    userAvatar: [
      {
        id: "24",
        title: "Tosha",
        image: avatar2,
      },
      {
        id: "25",
        title: "Brain",
        image: avatar4,
      },
    ],
  },
  {
    id: 10,
    title: "Dashboard design",
    section: "done",
    priority: "low",
    dueDate: "16 Jul 2023",
    category: "Attex",
    comments: 287,
    userAvatar: [
      {
        id: "26",
        title: "Tosha",
        image: avatar1,
      },
      {
        id: "27",
        title: "Brain",
        image: avatar3,
      },
      {
        id: "28",
        title: "Tosha",
        image: avatar8,
      },
      {
        id: "29",
        title: "Hooker",
        image: "K",
        textBg: "bg-danger text-white",
      },
    ],
  },
];

const assignees: AssigneeType[] = [
  {
    id: 1,
    title: "Coderthemes",
    image: avatar1,
    isImage: true,
  },
  {
    id: 2,
    title: "Kenil Sudani",
    image: avatar2,
    isImage: true,
  },
  {
    id: 3,
    title: "Louis Allen",
    image: avatar3,
    isImage: true,
  },
  {
    id: 4,
    title: "Sean White",
    image: avatar4,
    isImage: true,
  },
  {
    id: 5,
    title: "Riley Steele",
    image: avatar5,
    isImage: true,
  },
  {
    id: 6,
    title: "Zak Turnbull",
    image: avatar6,
    isImage: true,
  },
];

export { tasks, assignees, sections };
