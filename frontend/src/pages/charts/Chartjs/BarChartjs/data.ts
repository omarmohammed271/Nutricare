import { hexToRGB } from "@src/utils";
import { type ChartConfiguration } from "chart.js/auto";

const colors = ["#3e60d5", "#47ad77"];
export const borderRadiusConfig: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [12, -19, 14, -15, 12, -14],
        borderColor: colors[0],
        backgroundColor: hexToRGB(colors[0], 0.3),
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
      {
        label: "Small Radius",
        data: [-10, 19, -15, -8, 12, -7],
        backgroundColor: hexToRGB(colors[1], 0.3),
        borderColor: colors[1],
        borderWidth: 2,
        borderRadius: 5,
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

export const floatingConfig: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [12, -19, 14, -15, 12, -14],
        backgroundColor: colors[0],
      },
      {
        label: "Small Radius",
        data: [-10, 19, -15, -8, 12, -7],
        backgroundColor: colors[1],
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

export const horizontalConfig: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "March", "April"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [12, -19, 14, -15],
        borderColor: colors[0],
        backgroundColor: hexToRGB(colors[0], 0.3),
        borderWidth: 1,
      },
      {
        label: "Small Radius",
        data: [-10, 19, -15, -8],
        backgroundColor: hexToRGB(colors[1], 0.3),
        borderColor: colors[1],
        borderWidth: 1,
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
export const stackedConfig: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "March", "April"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, -19, 14, -15],
        backgroundColor: colors[0],
      },
      {
        label: "Dataset 2",
        data: [-10, 19, -15, -8],
        backgroundColor: colors[1],
      },
      {
        label: "Dataset 3",
        data: [-10, 19, -15, -8],
        backgroundColor: colors[2],
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
        stacked: true,

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
export const groupStackConfig: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "March", "April"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, -19, 14, -15],
        backgroundColor: colors[0],
        stack: "Stack 0",
      },
      {
        label: "Dataset 2",
        data: [-10, 19, -15, -8],
        backgroundColor: colors[1],
        stack: "Stack 0",
      },
      {
        label: "Dataset 3",
        data: [-10, 19, -15, -8],
        backgroundColor: colors[2],
        stack: "Stack 1",
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
        stacked: true,

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
export const verticalConfig: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "March", "April"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, -19, 14, -15],
        backgroundColor: colors[0],
      },
      {
        label: "Dataset 2",
        data: [-10, 19, -15, -8],
        backgroundColor: colors[1],
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
