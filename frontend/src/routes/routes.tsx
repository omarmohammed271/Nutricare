/*
 * Copyright (c) 2023.
 * File Name: routes.tsx
 * Author: Coderthemes
 */
import { LazyExoticComponent, ReactNode, Suspense, lazy } from "react"
import { Navigate, type RouteProps } from "react-router-dom"

const VerticalLayout = lazy(() => import("@src/layouts/VerticalLayout"))
// const GoogleMaps = lazy(() => import("@src/pages/maps/GoogleMaps"))

export type RoutesProps = {
  path: RouteProps['path']
  element: RouteProps['element']
  exact?: boolean
}

const LoadComponent = ({ component: Component }: { component: LazyExoticComponent<() => ReactNode> }) => {
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  )
}

const uiComponentRoutes: RoutesProps[] = [
  { path: "/ui/accordions", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Accordions"))} />, },
  { path: "/ui/alerts", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Alerts"))} /> },
  { path: "/ui/avatars", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Avatars"))} /> },
  { path: "/ui/badges", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Badges"))} /> },
  { path: "/ui/breadcrumbs", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Breadcrumbs"))} />, },
  { path: "/ui/buttons", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Buttons"))} /> },
  { path: "/ui/cards", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Cards"))} /> },
  { path: "/ui/collapses", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Collapses"))} /> },
  { path: "/ui/dismissibles", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Dismissible"))} />, },
  { path: "/ui/menus", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Menus"))} /> },
  { path: "/ui/progresses", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Progresses"))} />, },
  { path: "/ui/skeletons", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Skeletons"))} /> },
  { path: "/ui/spinners", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Spinners"))} /> },
  { path: "/ui/lists", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Lists"))} /> },
  { path: "/ui/ratios", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Ratios"))} /> },
  { path: "/ui/tabs", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Tabs"))} /> },
  { path: "/ui/dialogs", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Dialogs"))} /> },
  { path: "/ui/drawers", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Drawers"))} /> },
  { path: "/ui/popovers", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Popovers"))} /> },
  { path: "/ui/tooltips", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Tooltips"))} /> },
  { path: "/ui/typographies", element: <LoadComponent component={lazy(() => import("@src/pages/base-ui/Typographies"))} />, },

  { path: "/ui/apex/area", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/AreaApex"))} />, },
  { path: "/ui/apex/bar", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/BarApex"))} />, },
  { path: "/ui/apex/bubble", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/BubbleApex"))} />, },
  { path: "/ui/apex/candlestick", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/CandleStickApex"))} />, },
  { path: "/ui/apex/column", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/ColumnApex"))} />, },
  { path: "/ui/apex/heatmap", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/HeatApex"))} />, },
  { path: "/ui/apex/line", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/LineApex"))} />, },
  { path: "/ui/apex/mixed", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/MixedApex"))} />, },
  { path: "/ui/apex/timeline", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/TimelineApex"))} />, },
  { path: "/ui/apex/boxplot", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/BoxPlotApex"))} />, },
  { path: "/ui/apex/treemap", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/TreemapApex"))} />, },
  { path: "/ui/apex/pie", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/PieApex"))} />, },
  { path: "/ui/apex/radar", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/RadarApex"))} />, },
  { path: "/ui/apex/radialbar", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/RadialbarApex"))} />, },
  { path: "/ui/apex/scatter", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/ScatterApex"))} />, },
  { path: "/ui/apex/polararea", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/PolarAreaApex"))} />, },
  { path: "/ui/apex/sparklines", element: <LoadComponent component={lazy(() => import("@src/pages/charts/ApexCharts/SparklinesApex"))} />, },

  { path: "/ui/chartjs/area", element: <LoadComponent component={lazy(() => import("@src/pages/charts/Chartjs/AreaChartjs"))} />, },
  { path: "/ui/chartjs/bar", element: <LoadComponent component={lazy(() => import("@src/pages/charts/Chartjs/BarChartjs"))} />, },
  { path: "/ui/chartjs/line", element: <LoadComponent component={lazy(() => import("@src/pages/charts/Chartjs/LineChartjs"))} />, },
  { path: "/ui/chartjs/other", element: <LoadComponent component={lazy(() => import("@src/pages/charts/Chartjs/OtherChartjs"))} />, },

  // { path: "/ui/maps/google-maps", element: <GoogleMaps />, },
  // { path: "/ui/maps/vector-maps", element: <LoadComponent component={lazy(() => import("@src/pages/maps/VectorMaps"))} />, },
]

const appsRoutes: RoutesProps[] = [
  { path: "/calendar", element: <LoadComponent component={lazy(() => import("@src/pages/apps/Calendar"))} /> },
  { path: "/apps/chat", element: <LoadComponent component={lazy(() => import("@src/pages/apps/Chat"))} /> },
  { path: "/apps/kanban", element: <LoadComponent component={lazy(() => import("@src/pages/apps/Kanban"))} /> },
  { path: "/apps/file-manager", element: <LoadComponent component={lazy(() => import("@src/pages/apps/FileManager"))} /> },
  { path: "/apps/email/inbox", element: <LoadComponent component={lazy(() => import("@src/pages/apps/emails/Inbox"))} /> },
  { path: "/apps/email/read", element: <LoadComponent component={lazy(() => import("@src/pages/apps/emails/Read"))} /> },
  { path: "/apps/tasks/list", element: <LoadComponent component={lazy(() => import("@src/pages/apps/tasks/List"))} /> },
  { path: "/apps/tasks/details", element: <LoadComponent component={lazy(() => import("@src/pages/apps/tasks/Details"))} /> },
]

const otherRotes: RoutesProps[] = [
  { path: "/landing", element: <LoadComponent component={lazy(() => import("@src/pages/landing"))} /> },
  { path: "/maintenance", element: <LoadComponent component={lazy(() => import("@src/pages/other/Maintenance"))} /> },
  { path: "/error-404", element: <LoadComponent component={lazy(() => import("@src/pages/error/Error404"))} /> },
  { path: "/error-500", element: <LoadComponent component={lazy(() => import("@src/pages/error/Error500"))} /> },
  // Removed the conflicting catch-all route that was overriding auth routes
]

const authRoutes: RoutesProps[] = [
  { path: "/auth/login", element: <LoadComponent component={lazy(() => import("@src/pages/auth/Login"))} /> },
  { path: "/admin/auth/login", element: <LoadComponent component={lazy(() => import("@src/pages/auth/Admin/admin"))} /> },
  { path: "/admin/auth/recover-password", element: <LoadComponent component={lazy(() => import("@src/pages/auth/Admin/resetPassAdmin"))} /> },
  { path: "/auth/register", element: <LoadComponent component={lazy(() => import("@src/pages/auth/Register"))} /> },
  { path: "/auth/logout", element: <LoadComponent component={lazy(() => import("@src/pages/auth/Logout"))} /> },
  { path: "/auth/lock-screen", element: <LoadComponent component={lazy(() => import("@src/pages/auth/LockScreen"))} /> },
  { path: "/auth/confirm-mail", element: <LoadComponent component={lazy(() => import("@src/pages/auth/ConfirmMail"))} />, },
  { path: "/auth/login2", element: <LoadComponent component={lazy(() => import("@src/pages/auth/Login2"))} /> },
  { path: "/auth/register2", element: <LoadComponent component={lazy(() => import("@src/pages/auth/Register2"))} /> },
  { path: "/auth/activate-account", element: <LoadComponent component={lazy(() => import("@src/pages/auth/ActivateAccount"))} /> },
  { path: "/auth/recover-password-code", element: <LoadComponent component={lazy(() => import("@src/pages/auth/ResetPasswordCode"))} />, },
  { path: "/auth/recover-password", element: <LoadComponent component={lazy(() => import("@src/pages/auth/ResetPasswordDone"))} />, },
  { path: "/auth/logout2", element: <LoadComponent component={lazy(() => import("@src/pages/auth/Logout2"))} /> },
  { path: "/auth/recover-password2", element: <LoadComponent component={lazy(() => import("@src/pages/auth/ResetPassword2"))} />, },
  { path: "/auth/lock-screen2", element: <LoadComponent component={lazy(() => import("@src/pages/auth/LockScreen"))} />, },
  { path: "/auth/confirm-mail2", element: <LoadComponent component={lazy(() => import("@src/pages/auth/ConfirmMail"))} />, },
  { path: "/auth/multi-step-form", element: <LoadComponent component={lazy(() => import("@src/pages/auth/MultiStepForm"))} /> },
  { path: "/simple-test", element: <div style={{ padding: '50px', fontSize: '24px', color: 'red' }}>SIMPLE TEST ROUTE IS WORKING!</div> },
]

const adminRoutes: RoutesProps[] = [
  { path: "/ecommerce", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/ecommerce/"))} /> },
  { path: "/my-profile", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/Profile/" ))} /> },
  { path: "/auth-test", element: <LoadComponent component={lazy(() => import("@src/components/AuthTest"))} /> },
  { path: "/meal-plan", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/MealPlan"))} /> },
  { path: "/meal-plan/templates", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/MealPlan"))} /> },
  { path: "/meal-plan/recipes", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/MealPlan"))} /> },
  { path: "/meal-plan/client-plans", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/MealPlan"))} /> },
  { path: "/client-file", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/ClientFile"))} /> },
  { path: "/client-file/biochemical-data", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/ClientFile"))} /> },
  { path: "/client-file/medication", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/ClientFile"))} /> },
  { path: "/client-file/meal-plans", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/ClientFile"))} /> },
  { path: "/clients/onboarding", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/ClientOnboarding"))} /> },
  { path: "/test-clients", element: <div style={{ padding: '50px', fontSize: '24px', color: 'green' }}>CLIENT ONBOARDING TEST ROUTE IS WORKING!</div> },
  { path: "/library", element: <LoadComponent component={lazy(() => import("@src/pages/Library"))} /> },
  { path: "error-404-alt", element: <LoadComponent component={lazy(() => import("@src/pages/error/Error404Alt"))} /> },
  
  { path: "/pages/starter", element: <LoadComponent component={lazy(() => import("@src/pages/other/Starter"))} /> },
  { path: "/pages/profile", element: <LoadComponent component={lazy(() => import("@src/pages/other/Profile/"))} /> },
  { path: "/pages/timeline", element: <LoadComponent component={lazy(() => import("@src/pages/other/Timeline"))} /> },
  { path: "/pages/invoice", element: <LoadComponent component={lazy(() => import("@src/pages/other/Invoice"))} /> },
  { path: "/pages/faq", element: <LoadComponent component={lazy(() => import("@src/pages/other/FAQs"))} /> },
  { path: "/pages/pricing", element: <LoadComponent component={lazy(() => import("@src/pages/other/Pricing"))} /> },
  { path: "/terms", element: <LoadComponent component={lazy(() => import("@src/pages/other/TermsAndConditions"))} /> },
  { path: "/privacy", element: <LoadComponent component={lazy(() => import("@src/pages/other/PrivacyPolicy"))} /> },
  { path: "/blog", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/Blog"))} /> },
  { path: "/blog/:id", element: <LoadComponent component={lazy(() => import("@src/pages/dashboard/BlogPost"))} /> },

  { path: "/extended-ui/swipers", element: <LoadComponent component={lazy(() => import("@src/pages/extended-ui/Swipers"))} /> },
  { path: "/extended-ui/nestable-list", element: <LoadComponent component={lazy(() => import("@src/pages/extended-ui/NestableList"))} />, },
  { path: "/extended-ui/ratings", element: <LoadComponent component={lazy(() => import("@src/pages/extended-ui/Ratings"))} /> },
  { path: "/extended-ui/players", element: <LoadComponent component={lazy(() => import("@src/pages/extended-ui/Players"))} /> },
  { path: "/extended-ui/scrollbars", element: <LoadComponent component={lazy(() => import("@src/pages/extended-ui/Scrollbars"))} />, },
  { path: "/icons/lucide-icons", element: <LoadComponent component={lazy(() => import("@src/pages/other/icons/LucideIcons"))} />, },

  { path: "/forms/basic-elements", element: <LoadComponent component={lazy(() => import("@src/pages/forms/BasicElements"))} />, },
  { path: "/forms/editors", element: <LoadComponent component={lazy(() => import("@src/pages/forms/Editors"))} /> },
  { path: "/forms/file-uploads", element: <LoadComponent component={lazy(() => import("@src/pages/forms/FileUploads"))} />, },
  { path: "/forms/layout", element: <LoadComponent component={lazy(() => import("@src/pages/forms/FormsLayout"))} /> },

  { path: "/tables/basic-tables", element: <LoadComponent component={lazy(() => import("@src/pages/tables/BasicTables"))} />, },
  { path: "/tables/data-grid", element: <LoadComponent component={lazy(() => import("@src/pages/tables/DataGrid"))} /> },
]

const adminDashboardRoutes: RoutesProps[] = [
  { path: "/admin/user", element: <LoadComponent component={lazy(() => import("@src/pages/admin/dashboard/UserManagement"))} /> },
  { path: "/admin/content-management", element: <LoadComponent component={lazy(() => import("@src/pages/admin/ContentManagement/ContentManagement"))} /> },
  { path: "/admin/subscription", element: <LoadComponent component={lazy(() => import("@src/pages/admin/subscription/subscription"))} /> },
  { path: "/admin/reporting", element: <LoadComponent component={lazy(() => import("@src/pages/admin/Reporting/Reporting"))} /> },
]

export const defaultLayoutRoutes = [
  ...otherRotes,
  ...authRoutes,
  { path: "*", element: <Navigate to="/error-404" /> },
]

export const verticalLayoutRoutes = [
  { path: "/", element: <Navigate to="/ecommerce" replace /> },
  ...adminRoutes,
  ...adminDashboardRoutes,
  ...appsRoutes,
  ...uiComponentRoutes,
  { path: "*", element: <LoadComponent component={lazy(() => import("@src/pages/error/Error404"))} /> },
]

