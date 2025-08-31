//images
import avatar2 from "@src/assets/images/users/avatar-2.jpg";
import avatar3 from "@src/assets/images/users/avatar-3.jpg";
import avatar4 from "@src/assets/images/users/avatar-4.jpg";
import avatar5 from "@src/assets/images/users/avatar-5.jpg";
import avatar6 from "@src/assets/images/users/avatar-6.jpg";

import { type ChartConfiguration } from "chart.js/auto";

export const messages = [
  {
    id: 1,
    img: avatar2,
    sender: "Tomaslau",
    message: `I've finished it! See you so...`,
  },
  {
    id: 2,
    img: avatar3,
    sender: "Stillnotdavid",
    message: `This theme is awesome!`,
  },
  {
    id: 3,
    img: avatar4,
    sender: "Kurafire",
    message: `Nice to meet you`,
  },
  {
    id: 4,
    img: avatar5,
    sender: "Shahedk",
    message: `Hey! there I'm available...`,
  },
  {
    id: 5,
    img: avatar6,
    sender: "Adhamdannaway",
    message: `This theme is awesome!`,
  },
];

export const productConfig: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Orders",
        backgroundColor: "#02BE6A",
        borderColor: "#02BE6A",
        hoverBackgroundColor: "#02BE6A",
        hoverBorderColor: "#02BE6A",
        data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
      },
      {
        label: "Revenue",
        backgroundColor: "rgba(93,106,120,0.2)",
        borderColor: "rgba(93,106,120,0.2)",
        hoverBackgroundColor: "rgba(93,106,120,0.2)",
        hoverBorderColor: "rgba(93,106,120,0.2)",
        data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    datasets: {
      bar: {
        barPercentage: 0.7,
        categoryPercentage: 0.5,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
          color: "rgba(0,0,0,0.05)",
        },
        stacked: false,
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        stacked: false,
        grid: {
          color: "rgba(0,0,0,0.01)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

export const projectTableData = [
  {
    id: 1,
    img: avatar2,
    name: "Halette Boivin",
    project: "App design and development",
    start_date: "01/01/2022",
    end_date: "10/12/2023",
    status: "info.main",
    status_message: "Work in Progress",
  },
  {
    id: 2,
    img: avatar3,
    name: "Durandana Jolicoeur",
    project: "Coffee detail page - Main Page",
    start_date: "21/07/2023",
    end_date: "12/05/2024",
    status: "danger.main",
    status_message: "Pending",
  },
  {
    id: 3,
    img: avatar4,
    name: "Lucas Sabourin",
    project: "Poster illustation design",
    start_date: "18/03/2023",
    end_date: "28/09/2023",
    status: "success.main",
    status_message: "Done",
  },
  {
    id: 4,
    img: avatar6,
    name: "Donatien Brunelle",
    project: "Drinking bottle graphics",
    start_date: "02/10/2022",
    end_date: "07/05/2023",
    status: "info.main",
    status_message: "Work in Progress",
  },
  {
    id: 5,
    img: avatar5,
    name: "Karel Auberjo",
    project: "Landing page design - Home",
    start_date: "17/01/2022",
    end_date: "25/05/2023",
    status: "warning.main",
    status_message: "Coming soon",
  },
];

export const experienceData = [
  {
    id: 1,
    variant: "#15d1e9",
    title: "Lead designer / Developer",
    companyName: "websitename.com",
    year: "2015 - 18",
    description:
      "Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words.",
  },
  {
    id: 2,
    variant: "#3366FF",
    title: "Senior Graphic Designer",
    companyName: "Software Inc.",
    year: "2012 - 15",
    description:
      "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.",
  },
  {
    id: 3,
    variant: "#15d1e9",
    title: "Graphic Designer",
    companyName: "Coderthemes Design LLP",
    year: "2010 - 12",
    description:
      "The European languages are members of the same family. Their separate existence is a myth. For science music sport etc, Europe uses the same vocabulary. The languages only differ in their grammar their pronunciation",
  },
];
