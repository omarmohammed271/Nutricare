# NutriCare Dashboard

A comprehensive nutrition and health management dashboard built with React, Material-UI, and ApexCharts.

## Features

### 🚀 Quick Actions
- **Client Onboarding**: Streamlined process for adding new clients
- **Quick Calculators**: Nutrition calculation tools
- **Nutrition Risk Screening**: Assessment tools for identifying health risks
- **Food & Drug Interaction**: Safety checking for medication interactions

### 📈 Data Visualization
- **Client Chart**: Weekly client acquisition trends with stacked bar charts
- **Case Overview**: Pie chart showing distribution of case types (Diabetes, Cancer, Neurological)

### 📅 Appointment Management
- **Calendar View**: Monthly calendar with highlighted appointment dates
- **Appointment List**: Detailed view of daily appointments with status tracking
- **Status Indicators**: Visual status for completed, pending, and upcoming appointments

### 💬 Dietitian Chat
- **AI Assistant**: Interactive chat interface for nutrition questions
- **Quick Responses**: Pre-built responses for common nutrition queries
- **Professional Support**: Direct access to dietitian expertise

## Components

### Core Components
- `QuickActions`: Action buttons for common tasks
- `ClientChart`: Client acquisition trends
- `CaseOverview`: Case distribution visualization
- `Appointments`: Calendar and appointment management
- `DietitianChat`: Interactive chat interface

### Data Structure
- **Cases**: Medical case types and counts
- **Appointments**: Client appointment details with status tracking

## Technology Stack

- **React 18**: Modern React with hooks
- **Material-UI (MUI)**: Component library and theming
- **ApexCharts**: Interactive charts and visualizations
- **TypeScript**: Type-safe development
- **Lucide Icons**: Modern icon set

## Color Scheme

- **Primary Green**: #02BE6A (NutriCare brand color)
- **Success Green**: #26c362 (positive indicators)
- **Info Blue**: #3FC6FC (information and actions)
- **Warning Yellow**: #fdb906 (pending/upcoming items)

## Responsive Design

The dashboard is fully responsive and works on:
- Desktop (lg+): Full layout with side-by-side components
- Tablet (md): Optimized grid layout
- Mobile (xs, sm): Stacked layout for mobile devices

## Usage

1. Navigate to `/ecommerce` route
2. Use quick action buttons for common tasks
3. View client trends and case distribution
4. Manage appointments and client cases
5. Interact with the dietitian chat for nutrition guidance

## Customization

The dashboard can be easily customized by:
- Modifying the color scheme in the theme
- Adding new chart types and visualizations
- Extending the appointment system
- Integrating with external nutrition APIs
- Adding new action buttons

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Quick Actions                        │
├─────────────────────────────────────────────────────────┤
│        Client Chart         │      Case Overview       │
│        (8 columns)          │       (4 columns)        │
├─────────────────────────────────────────────────────────┤
│        Appointments         │      Dietitian Chat      │
│        (8 columns)          │       (4 columns)        │
└─────────────────────────────────────────────────────────┘
```
