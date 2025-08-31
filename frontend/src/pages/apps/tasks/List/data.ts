// images
import avatar2 from "@src/assets/images/users/avatar-2.jpg";
import avatar4 from "@src/assets/images/users/avatar-4.jpg";
import avatar5 from "@src/assets/images/users/avatar-5.jpg";
import avatar7 from "@src/assets/images/users/avatar-7.jpg";
import avatar9 from "@src/assets/images/users/avatar-9.jpg";

type CheckListItem = {
  id: number;
  title: string;
  completed: boolean;
};

type Comment = {
  id: number;
  author: string;
  text: string;
  posted_on: string;
  author_avatar: string;
  replies?: Comment[];
};

type AttachmentItem = {
  id: number;
  filename: string;
  size: string;
};

export type ListTaskItem = {
  id: number;
  projectName?: string;
  title: string;
  assignee_avatar: string;
  assigned_to: string;
  due_date: string;
  description: string;
  checklists: CheckListItem[];
  attachments: AttachmentItem[];
  comments: Comment[];
  completed: boolean;
  stage: string;
  subtasks?: string;
  priority: string;
};

const todayTasks: ListTaskItem[] = [
  {
    id: 1,
    title: "Draft the new contract document for sales team",
    assigned_to: "Arya Stark",
    assignee_avatar: avatar9,
    due_date: "Today 10am",
    completed: false,
    priority: "High",
    stage: "Todo",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: true },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
  {
    id: 2,
    title: "iOS App home page",
    assigned_to: "James B",
    assignee_avatar: avatar2,
    due_date: "Today 4pm",
    completed: false,
    stage: "In-progress",
    priority: "High",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: false },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
  {
    id: 3,
    title: "Write a release note",
    assigned_to: "Kevin C",
    assignee_avatar: avatar4,
    due_date: "Today 4pm",
    completed: false,
    stage: "In-progress",
    priority: "Medium",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: false },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
];

const upcomingTasks: ListTaskItem[] = [
  {
    id: 4,
    title: "Invite user to a project",
    assigned_to: "Arya Stark",
    assignee_avatar: avatar2,
    due_date: "Tomorrow 10am",
    stage: "Todo",
    completed: false,
    priority: "Low",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: false },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
  {
    id: 5,
    title: "Enable analytics tracking",
    assigned_to: "James B",
    assignee_avatar: avatar2,
    due_date: "27 Aug 10am",
    completed: false,
    stage: "Review",
    priority: "Low",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: false },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
  {
    id: 6,
    title: "Code HTML email template",
    assigned_to: "Kevin C",
    assignee_avatar: avatar7,
    due_date: "No Due Date",
    completed: false,
    stage: "Review",
    priority: "Medium",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: false },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
];

const otherTasks: ListTaskItem[] = [
  {
    id: 7,
    title: "Coordinate with business development",
    assigned_to: "Arya Stark",
    assignee_avatar: avatar9,
    due_date: "No Due Date",
    stage: "Todo",
    completed: false,
    priority: "High",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: false },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
  {
    id: 8,
    title: "Kanban board design",
    assigned_to: "James B",
    assignee_avatar: avatar2,
    stage: "Review",
    due_date: "30 Aug 10am",
    completed: false,
    priority: "Low",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: false },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
  {
    id: 9,
    title: "Code HTML email template for sales outreach",
    assigned_to: "Kevin C",
    assignee_avatar: avatar5,
    due_date: "No Due Date",
    stage: "Done",
    completed: false,
    priority: "Medium",
    checklists: [
      { id: 1, title: "Find out the old contract documents", completed: false },
      {
        id: 2,
        title: "Organize meeting sales associates to understand need in detail",
        completed: false,
      },
      {
        id: 3,
        title: "Make sure to cover every small details",
        completed: false,
      },
    ],
    description:
      "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
    attachments: [
      { id: 1, filename: "sales-assets.zip", size: "2.3 MB" },
      { id: 2, filename: "new-contarcts.docx", size: "1.3 MB" },
    ],
    comments: [
      {
        id: 1,
        author: "Arya Stark",
        text: "Should I review the last 3 years legal documents as well?",
        posted_on: "4:30am",
        author_avatar: avatar9,
      },
      {
        id: 2,
        author: "Gary Somya",
        text: "@Arya FYI..I have created some general guidelines last year.",
        posted_on: "3:30am",
        author_avatar: avatar5,
      },
    ],
  },
];
const allTasks: ListTaskItem[] = [...todayTasks, ...upcomingTasks, ...otherTasks];
export { todayTasks, upcomingTasks, otherTasks, allTasks };
