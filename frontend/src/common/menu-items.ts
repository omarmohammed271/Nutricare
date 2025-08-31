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
    key: "navigation",
    label: "Navigation",
    isTitle: true,
  },
  {
    key: "dashboard",
    label: "Dashboards",
    isTitle: false,
    icon: LuHome,
    badge: {
      variant: "bg-success rounded-full",
      text: "2",
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
    key: "apps",
    label: "Apps",
    isTitle: true,
  },
  {
    key: "apps-calendar",
    label: "Calendar",
    isTitle: false,
    icon: LuCalendar,
    url: "/apps/calendar",
  },
  {
    key: "apps-chat",
    label: "Chat",
    isTitle: false,
    icon: LuMessageSquare,
    url: "/apps/chat",
  },
  {
    key: "apps-email",
    label: "Email",
    isTitle: false,
    icon: LuMail,
    children: [
      {
        key: "email-inbox",
        label: "Inbox",
        url: "/apps/email/inbox",
        parentKey: "apps-email",
      },
      {
        key: "email-read",
        label: "Read Email",
        url: "/apps/email/read",
        parentKey: "apps-email",
      },
    ],
  },
  {
    key: "apps-tasks",
    label: "Tasks",
    isTitle: false,
    icon: LuListTodo,
    children: [
      {
        key: "tasks-list",
        label: "List",
        url: "/apps/tasks/list",
        parentKey: "apps-tasks",
      },
      {
        key: "tasks-details",
        label: "Details",
        url: "/apps/tasks/details",
        parentKey: "apps-tasks",
      },
    ],
  },
  {
    key: "apps-kanban",
    label: "Kanban Board",
    isTitle: false,
    icon: LuKanbanSquare,
    url: "/apps/kanban",
  },
  {
    key: "apps-file-manager",
    label: "File Manager",
    isTitle: false,
    icon: LuFolderClosed,
    url: "/apps/file-manager",
  },
  {
    key: "custom",
    label: "Custom",
    isTitle: true,
  },
  {
    key: "pages",
    label: "Pages",
    isTitle: false,
    icon: LuNewspaper,
    children: [
      {
        key: "pages-starter",
        label: "Starter Page",
        url: "/pages/starter",
        parentKey: "pages",
      },
      {
        key: "pages-profile",
        label: "Profile",
        url: "/pages/profile",
        parentKey: "pages",
      },
      {
        key: "pages-timeline",
        label: "Timeline",
        url: "/pages/timeline",
        parentKey: "pages",
      },
      {
        key: "pages-invoice",
        label: "Invoice",
        url: "/pages/invoice",
        parentKey: "pages",
      },
      {
        key: "pages-faq",
        label: "FAQ",
        url: "/pages/faq",
        parentKey: "pages",
      },
      {
        key: "pages-pricing",
        label: "Pricing",
        url: "/pages/pricing",
        parentKey: "pages",
      },
      {
        key: "pages-maintenance",
        label: "Maintenance",
        url: "/maintenance",
        parentKey: "pages",
      },
    ],
  },
  {
    key: "auth",
    label: "Auth Pages",
    isTitle: false,
    icon: LuFingerprint,
    children: [
      {
        key: "auth-login",
        label: "Login",
        url: "/auth/login",
        parentKey: "auth",
      },
      {
        key: "auth-login2",
        label: "Login 2",
        url: "/auth/login2",
        parentKey: "auth",
      },
      {
        key: "auth-register",
        label: "Register",
        url: "/auth/register",
        parentKey: "auth",
      },
      {
        key: "auth-register2",
        label: "Register 2",
        url: "/auth/register2",
        parentKey: "auth",
      },
      {
        key: "auth-logout",
        label: "Logout",
        url: "/auth/logout",
        parentKey: "auth",
      },
      {
        key: "auth-logout2",
        label: "Logout 2",
        url: "/auth/logout2",
        parentKey: "auth",
      },
      {
        key: "auth-recover-password",
        label: "Recover Password",
        url: "/auth/recover-password",
        parentKey: "auth",
      },
      {
        key: "auth-recover-password2",
        label: "Recover Password 2",
        url: "/auth/recover-password2",
        parentKey: "auth",
      },
      {
        key: "auth-lock-screen",
        label: "Lock Screen",
        url: "/auth/lock-screen",
        parentKey: "auth",
      },
      {
        key: "auth-lock-screen2",
        label: "Lock Screen 2",
        url: "/auth/lock-screen2",
        parentKey: "auth",
      },
      {
        key: "auth-confirm-mail",
        label: "Confirm Mail",
        url: "/auth/confirm-mail",
        parentKey: "auth",
      },
      {
        key: "auth-confirm-mail2",
        label: "Confirm Mail 2",
        url: "/auth/confirm-mail2",
        parentKey: "auth",
      },
    ],
  },
  {
    key: "error",
    label: "Error Pages",
    isTitle: false,
    icon: LuAlertCircle,
    children: [
      {
        key: "error-404",
        label: "Error 404",
        url: "/error-404",
        parentKey: "pages-error",
      },
      {
        key: "error-404-alt",
        label: "Error 404-alt",
        url: "/error-404-alt",
        parentKey: "pages-error",
      },
      {
        key: "error-500",
        label: "Error 500",
        url: "/error-500",
        parentKey: "pages-error",
      },
    ],
  },
  {
    key: "components",
    label: "Components",
    isTitle: true,
  },
  {
    key: "base-ui",
    label: "Base UI",
    isTitle: false,
    icon: LuBriefcase,
    children: [
      {
        key: "ui-accordions",
        label: "Accordions",
        url: "/ui/accordions",
        parentKey: "base-ui",
      },
      {
        key: "ui-alerts",
        label: "Alerts",
        url: "/ui/alerts",
        parentKey: "base-ui",
      },
      {
        key: "ui-avatars",
        label: "Avatars",
        url: "/ui/avatars",
        parentKey: "base-ui",
      },
      {
        key: "ui-buttons",
        label: "Buttons",
        url: "/ui/buttons",
        parentKey: "base-ui",
      },
      {
        key: "ui-badges",
        label: "Badges",
        url: "/ui/badges",
        parentKey: "base-ui",
      },
      {
        key: "ui-breadcrumb",
        label: "Breadcrumb",
        url: "/ui/breadcrumbs",
        parentKey: "base-ui",
      },
      {
        key: "ui-cards",
        label: "Cards",
        url: "/ui/cards",
        parentKey: "base-ui",
      },
      {
        key: "ui-collapse",
        label: "Collapse",
        url: "/ui/collapses",
        parentKey: "base-ui",
      },
      {
        key: "ui-dismissible",
        label: "Dismissible",
        url: "/ui/dismissibles",
        parentKey: "base-ui",
      },
      {
        key: "ui-menus",
        label: "Menus",
        url: "/ui/menus",
        parentKey: "base-ui",
      },
      {
        key: "ui-progress",
        label: "Progress",
        url: "/ui/progresses",
        parentKey: "base-ui",
      },
      {
        key: "ui-skeleton",
        label: "Skeleton",
        url: "/ui/skeletons",
        parentKey: "base-ui",
      },
      {
        key: "ui-spinners",
        label: "Spinners",
        url: "/ui/spinners",
        parentKey: "base-ui",
      },
      {
        key: "ui-lists",
        label: "Lists",
        url: "/ui/lists",
        parentKey: "base-ui",
      },
      {
        key: "ui-ratio",
        label: "Ratio",
        url: "/ui/ratios",
        parentKey: "base-ui",
      },
      {
        key: "ui-tabs",
        label: "Tabs",
        url: "/ui/tabs",
        parentKey: "base-ui",
      },
      {
        key: "ui-dialogs",
        label: "Dialogs",
        url: "/ui/dialogs",
        parentKey: "base-ui",
      },
      {
        key: "ui-drawer",
        label: "Drawer",
        url: "/ui/drawers",
        parentKey: "base-ui",
      },
      {
        key: "ui-popovers",
        label: "Popovers",
        url: "/ui/popovers",
        parentKey: "base-ui",
      },
      {
        key: "ui-tooltips",
        label: "Tooltips",
        url: "/ui/tooltips",
        parentKey: "base-ui",
      },
      {
        key: "ui-typography",
        label: "Typography",
        url: "/ui/typographies",
        parentKey: "base-ui",
      },
    ],
  },
  {
    key: "extended",
    label: "Extended UI",
    isTitle: false,
    icon: LuLayers,
    children: [
      {
        key: "extended-swiper",
        label: "Swiper",
        url: "/extended-ui/swipers",
        parentKey: "extended",
      },
      {
        key: "extended-nestable-list",
        label: "Nestable List",
        url: "/extended-ui/nestable-list",
        parentKey: "extended",
      },
      {
        key: "extended-ratings",
        label: "Ratings",
        url: "/extended-ui/ratings",
        parentKey: "extended",
      },
      {
        key: "extended-player",
        label: "Player",
        url: "/extended-ui/players",
        parentKey: "extended",
      },
      {
        key: "extended-scrollbar",
        label: "Scrollbar",
        url: "/extended-ui/scrollbars",
        parentKey: "extended",
      },
    ],
  },
  {
    key: "icons",
    label: "Icons",
    isTitle: false,
    icon: LuHeartHandshake,
    children: [
      {
        key: "icons-lucide",
        label: "Lucide icons",
        url: "/icons/lucide-icons",
        parentKey: "icons",
      },
    ],
  },
  {
    key: "forms",
    label: "Forms",
    isTitle: false,
    icon: LuClipboardCheck,
    children: [
      {
        key: "forms-basic-elements",
        label: "Basic Elements",
        url: "/forms/basic-elements",
        parentKey: "forms",
      },
      {
        key: "forms-editors",
        label: "Editors",
        url: "/forms/editors",
        parentKey: "forms",
      },
      {
        key: "forms-file-uploads",
        label: "File Uploads",
        url: "/forms/file-uploads",
        parentKey: "forms",
      },
      {
        key: "forms-layout",
        label: "Form Layout",
        url: "/forms/layout",
        parentKey: "forms",
      },
    ],
  },
  {
    key: "tables",
    label: "Tables",
    isTitle: false,
    icon: LuTable,
    children: [
      {
        key: "tables-basic",
        label: "Basic Tables",
        url: "/tables/basic-tables",
        parentKey: "tables",
      },
      {
        key: "tables-data-grid",
        label: "Data Grid",
        url: "/tables/data-grid",
        parentKey: "tables",
      },
    ],
  },
  {
    key: "apex-charts",
    label: "Apex Charts",
    isTitle: false,
    icon: LuBarChart2,
    children: [
      {
        key: "area-apex",
        label: "Area",
        url: "/ui/apex/area",
        parentKey: "apex-charts",
      },
      {
        key: "bar-apex",
        label: "Bar",
        url: "/ui/apex/bar",
        parentKey: "apex-charts",
      },
      {
        key: "bubble-apex",
        label: "Bubble",
        url: "/ui/apex/bubble",
        parentKey: "apex-charts",
      },
      {
        key: "candlestick-apex",
        label: "Candlestick",
        url: "/ui/apex/candlestick",
        parentKey: "apex-charts",
      },
      {
        key: "column-apex",
        label: "Column",
        url: "/ui/apex/column",
        parentKey: "apex-charts",
      },
      {
        key: "heatmap-apex",
        label: "Heatmap",
        url: "/ui/apex/heatmap",
        parentKey: "apex-charts",
      },
      {
        key: "line-apex",
        label: "Line",
        url: "/ui/apex/line",
        parentKey: "apex-charts",
      },
      {
        key: "mixed-apex",
        label: "Mixed",
        url: "/ui/apex/mixed",
        parentKey: "apex-charts",
      },
      {
        key: "timeline-apex",
        label: "Timeline",
        url: "/ui/apex/timeline",
        parentKey: "apex-charts",
      },
      {
        key: "boxplot-apex",
        label: "Boxplot",
        url: "/ui/apex/boxplot",
        parentKey: "apex-charts",
      },
      {
        key: "treemap-apex",
        label: "Treemap",
        url: "/ui/apex/treemap",
        parentKey: "apex-charts",
      },
      {
        key: "pie-apex",
        label: "Pie",
        url: "/ui/apex/pie",
        parentKey: "apex-charts",
      },
      {
        key: "radar-apex",
        label: "Radar",
        url: "/ui/apex/radar",
        parentKey: "apex-charts",
      },
      {
        key: "radialbar-apex",
        label: "RadialBar",
        url: "/ui/apex/radialbar",
        parentKey: "apex-charts",
      },
      {
        key: "scatter-apex",
        label: "Scatter",
        url: "/ui/apex/scatter",
        parentKey: "apex-charts",
      },
      {
        key: "polararea-apex",
        label: "Polar Area",
        url: "/ui/apex/polararea",
        parentKey: "apex-charts",
      },
      {
        key: "sparklines-apex",
        label: "Sparklines",
        url: "/ui/apex/sparklines",
        parentKey: "apex-charts",
      },
    ],
  },
  {
    key: "chartjs-charts",
    label: "ChartJS",
    isTitle: false,
    icon: LuPieChart,
    children: [
      {
        key: "area-chartjs",
        label: "Area",
        url: "/ui/chartjs/area",
        parentKey: "chartjs-charts",
      },
      {
        key: "bar-chartjs",
        label: "Bar",
        url: "/ui/chartjs/bar",
        parentKey: "chartjs-charts",
      },
      {
        key: "line-chartjs",
        label: "Line",
        url: "/ui/chartjs/line",
        parentKey: "chartjs-charts",
      },
      {
        key: "other-chartjs",
        label: "Other",
        url: "/ui/chartjs/other",
        parentKey: "chartjs-charts",
      },
    ],
  },
  {
    key: "maps",
    label: "Maps",
    isTitle: false,
    icon: LuMap,
    children: [
      {
        key: "maps-google-maps",
        label: "Google maps",
        url: "/ui/maps/google-maps",
        parentKey: "maps",
      },
      {
        key: "maps-vector-maps",
        label: "Vector maps",
        url: "/ui/maps/vector-maps",
        parentKey: "maps",
      },
    ],
  },
]

export { MENU_ITEMS }
