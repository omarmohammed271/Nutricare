import { type IconType } from "react-icons"
import {
  LuAlertCircle,
  LuBarChart2,
  LuBriefcase,
  LuCalendar,
  LuClipboardCheck,
  LuFingerprint,
  LuFolderClosed,
  LuHeartHandshake,
  LuHome,
  LuKanbanSquare,
  LuLayers,
  LuListTodo,
  LuMail,
  LuMap,
  LuMessageSquare,
  LuNewspaper,
  LuPieChart,
  LuTable,
  LuUsers,
  LuUserPlus,
  LuBookOpen,
  LuFileText,
  LuBarChart3,
  LuShare2,
  LuUtensils,
} from "react-icons/lu"

export type MenuItemTypes = {
  key: string
  label: string
  isTitle?: boolean
  icon?: IconType
  url?: string
  badge?: {
    variant: string
    text: string
  }
  parentKey?: string
  target?: string
  children?: MenuItemTypes[]
}

const MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    isTitle: false,
    icon: LuHome,
    badge: {
      variant: "bg-success rounded-full",
      text: "3",
    },
    children: [
      {
        key: "dashboard-analytics",
        label: "Analytics",
        url: "/analytics",
        parentKey: "dashboard",
      },
      {
        key: "dashboard-ecommerce",
        label: "Ecommerce",
        url: "/ecommerce",
        parentKey: "dashboard",
      },
  
    ],
  },
  {
    key: "meal-plan",
    label: "Meal Plan",
    isTitle: false,
    icon: LuUtensils,
    url: "/meal-plan",
  },
  {
    key: "clients-onboarding",
    label: "Clients Onboarding",
    isTitle: false,
    icon: LuUserPlus,
    url: "/clients/onboarding",
  },
  {
    key: "clients-file",
    label: "Clients File",
    isTitle: false,
    icon: LuUsers,
    url: "/clients/file",
  },
  {
    key: "calendar",
    label: "Calendar",
    isTitle: false,
    icon: LuCalendar,
    url: "/calendar",
  },
  {
    key: "blog",
    label: "Blog",
    isTitle: false,
    icon: LuMessageSquare,
    url: "/blog",
  },
  {
    key: "library",
    label: "Library",
    isTitle: false,
    icon: LuBookOpen,
    url: "/library",
  },
  {
    key: "my-files",
    label: "My Files",
    isTitle: false,
    icon: LuFolderClosed,
    url: "/files",
  },
  {
    key: "reports",
    label: "Reports",
    isTitle: false,
    icon: LuBarChart3,
    url: "/reports",
  },
  {
    key: "about-us",
    label: "About Us",
    isTitle: false,
    icon: LuShare2,
    url: "/about",
  },
]

export { MENU_ITEMS }
