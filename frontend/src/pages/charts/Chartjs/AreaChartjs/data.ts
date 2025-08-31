import { hexToRGB } from "@src/utils";
import { type ChartConfiguration } from "chart.js/auto";

export const boundariesConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [12.5, -19.4, 14.3, -15.0, 10.8, -10.5],
        borderColor: ["#3e60d5"],
        backgroundColor: hexToRGB("#3e60d5", 0.3),
        fill: false,
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

const datasetColors = ["#3e60d5", "#fa5c7c", "#47ad77", "#ebeff2", "#f56f36"];
export const datasetConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "D0",
        data: [10, 20, 15, 35, 38, 24],
        borderColor: datasetColors[0],
        hidden: true,
        backgroundColor: hexToRGB(datasetColors[0], 0.3),
      },
      {
        label: "D1",
        data: [12, 18, 18, 33, 41, 20],
        borderColor: datasetColors[1],
        fill: "-1",
        backgroundColor: hexToRGB(datasetColors[1], 0.3),
      },
      {
        label: "D2",
        data: [5, 25, 20, 25, 28, 14],
        borderColor: datasetColors[2],
        fill: 1,
        backgroundColor: hexToRGB(datasetColors[2], 0.3),
      },
      {
        label: "D3",
        data: [12, 45, 15, 35, 38, 24],
        borderColor: datasetColors[3],
        fill: "-1",
        backgroundColor: hexToRGB(datasetColors[3], 0.3),
      },
      {
        label: "D4",
        data: [24, 38, 35, 15, 20, 10],
        borderColor: datasetColors[4],
        fill: 8,
        backgroundColor: hexToRGB(datasetColors[4], 0.3),
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      filler: {
        propagate: false,
      },
    },
    interaction: {
      intersect: false,
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

const drawTimeColors = ["#3e60d5", "#47ad77"];
export const drawTimeConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [10, 20, 15, 35, 38, 24],
        borderColor: drawTimeColors[0],
        backgroundColor: drawTimeColors[0],
        fill: true,
        pointBackgroundColor: "#fff",
        radius: 5,
      },
      {
        label: "Small Radius",
        data: [24, 38, 35, 15, 20, 10],
        backgroundColor: hexToRGB(drawTimeColors[1], 0.3),
        borderColor: drawTimeColors[1],
        borderWidth: 1,
        pointBackgroundColor: "#fff",
        radius: 5,
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
      filler: {
        propagate: false,
      },
    },
    interaction: {
      intersect: false,
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

const stackedColors = ["#3e60d5", "#fa5c7c", "#47ad77", "#ebeff2", "#f56f36"];
export const stackedConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "D0",
        data: [10, 20, 15, 35, 38, 24],
        borderColor: stackedColors[0],
        fill: true,
        backgroundColor: stackedColors[0],
      },
      {
        label: "D1",
        data: [12, 18, 18, 33, 41, 20],
        borderColor: stackedColors[1],
        fill: true,
        backgroundColor: stackedColors[1],
      },
      {
        label: "D2",
        data: [5, 25, 20, 25, 28, 14],
        borderColor: stackedColors[2],
        fill: true,
        backgroundColor: stackedColors[2],
      },
      {
        label: "D3",
        data: [12, 45, 15, 35, 38, 24],
        borderColor: stackedColors[3],
        fill: true,
        backgroundColor: stackedColors[3],
      },
      {
        label: "D4",
        data: [24, 38, 35, 15, 20, 10],
        borderColor: stackedColors[4],
        fill: true,
        backgroundColor: stackedColors[4],
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
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Value",
        },
        grid: {
          display: false,
        },
      },
    },
  },
};

const radarColors = ["#3e60d5", "#fa5c7c", "#47ad77", "#ebeff2", "#f56f36"];
export const radarConfig: ChartConfiguration = {
  type: "radar",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "D0",
        data: [10, 20, 15, 35, 38, 24],
        borderColor: radarColors[0],
        fill: "-1",
        backgroundColor: hexToRGB(radarColors[0], 0.3),
      },
      {
        label: "D1",
        data: [12, 18, 18, 33, 41, 20],
        borderColor: radarColors[1],
        fill: false,
        backgroundColor: hexToRGB(radarColors[1], 0.3),
      },
      {
        label: "D2",
        data: [5, 25, 20, 25, 28, 14],
        borderColor: radarColors[2],
        fill: "-1",
        backgroundColor: hexToRGB(radarColors[2], 0.3),
      },
      {
        label: "D3",
        data: [12, 45, 15, 35, 38, 24],
        borderColor: radarColors[3],
        fill: "-1",
        backgroundColor: hexToRGB(radarColors[3], 0.3),
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
      filler: {
        propagate: false,
      },
    },
  },
};
