import { hexToRGB } from "@src/utils";
import { type ChartConfiguration } from "chart.js/auto";

const colors1 = ["#3e60d5", "#47ad77"];
const colors2 = ["#3e60d5", "#fa5c7c", "#47ad77", "#ebeff2", "#f56f36"];

export const bubbleConfig: ChartConfiguration = {
  type: "bubble",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [
          { x: 10, y: 20, r: 5 },
          { x: 20, y: 10, r: 5 },
          { x: 15, y: 15, r: 5 },
        ],
        borderColor: colors1[0],
        backgroundColor: hexToRGB(colors1[0], 0.3),
        borderWidth: 2,
        borderSkipped: false,
      },
      {
        label: "Small Radius",
        data: [
          { x: 12, y: 22 },
          { x: 22, y: 20 },
          { x: 5, y: 15 },
        ],
        backgroundColor: hexToRGB(colors1[1], 0.3),
        borderColor: colors1[1],
        borderWidth: 2,
        borderSkipped: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,

        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  },
};
export const donutConfig: ChartConfiguration = {
  type: "doughnut",
  data: {
    labels: ["Direct", "Affilliate", "Sponsored", "E-mail"],
    datasets: [
      {
        data: [300, 135, 48, 154],
        backgroundColor: colors2,
        borderColor: "transparent",
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    // cutoutPercentage: 60,
    plugins: {
      legend: {
        display: false,

        position: "top",
      },
    },
  },
};
export const pieConfig: ChartConfiguration = {
  type: "pie",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [12, 19, 14, 15, 40],
        backgroundColor: colors2,
      },
    ],
  },
  options: {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};
export const polarAreaConfig: ChartConfiguration = {
  type: "polarArea",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, 19, 14, 15, 20],
        backgroundColor: colors2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,

        position: "top",
      },
    },
    scales: {
      r: {
        display: false,
      },
    },
  },
};
export const radarConfig: ChartConfiguration = {
  type: "radar",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, 29, 39, 22, 28, 34],
        borderColor: colors1[0],
        backgroundColor: hexToRGB(colors1[0], 0.3),
      },
      {
        label: "Dataset 2",
        data: [10, 19, 15, 28, 34, 39],
        borderColor: colors1[1],
        backgroundColor: hexToRGB(colors1[1], 0.3),
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};
export const scatterConfig: ChartConfiguration = {
  type: "scatter",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [
          { x: 10, y: 50 },
          { x: 50, y: 10 },
          { x: 15, y: 15 },
          { x: 20, y: 45 },
          { x: 25, y: 18 },
          { x: 34, y: 38 },
        ],
        borderColor: colors1[0],
        backgroundColor: hexToRGB(colors1[0], 0.3),
      },
      {
        label: "Dataset 2",
        data: [
          { x: 15, y: 45 },
          { x: 40, y: 20 },
          { x: 30, y: 5 },
          { x: 35, y: 25 },
          { x: 18, y: 25 },
          { x: 40, y: 8 },
        ],
        borderColor: colors1[1],
        backgroundColor: hexToRGB(colors1[1], 0.3),
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  },
};
export const barLineConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 35, 18, 15, 25, 22],
        backgroundColor: colors1[0],
        stack: "combined",
        type: "bar",
      },
      {
        label: "Dataset 2",
        data: [13, 23, 38, 22, 25, 30, 28],

        borderColor: colors1[1],
        stack: "combined",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
  },
};
