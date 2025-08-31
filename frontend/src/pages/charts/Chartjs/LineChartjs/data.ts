import { hexToRGB } from "@src/utils";
import { type ChartConfiguration } from "chart.js/auto";

const colors = ["#3e60d5", "#47ad77"];
const datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];

function skipped(ctx: any, value: any) {
  return ctx.p0.skip || ctx.p1.skip ? value : undefined;
}

function down(ctx: any, value: any) {
  return ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
}

export const interpolationConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Fully Rounded",
        data: datapoints,
        borderColor: colors[0],
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
      {
        label: "Small Radius",
        data: datapoints,
        borderColor: colors[1],
        fill: false,
        tension: 0.4,
      },
      {
        label: "Small Radius",
        data: datapoints,
        borderColor: colors[2],
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
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
        suggestedMin: -10,
        suggestedMax: 200,
      },
    },
  },
};
export const lineConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [32, 42, 42, 62, 52, 75, 62],
        borderColor: colors[0],
        fill: true,
        backgroundColor: hexToRGB(colors[0], 0.3),
        tension: 0.3,
      },
      {
        label: "Small Radius",
        data: [42, 58, 66, 93, 82, 105, 92],
        fill: true,
        backgroundColor: "transparent",
        borderColor: colors[1],
        borderDash: [5, 5],
        tension: 0.3,
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
export const multiAxesConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Fully Rounded",
        data: [12, -19, 14, -15, 18, -14, -7],
        borderColor: colors[0],
        backgroundColor: hexToRGB(colors[0], 0.3),
        borderWidth: 1.5,
        yAxisID: "y",
        tension: 0.2,
      },
      {
        label: "Small Radius",
        data: [-10, 19, -15, -8, -17, 12, 8],
        backgroundColor: hexToRGB(colors[1], 0.3),
        borderColor: colors[1],
        borderWidth: 1.5,
        yAxisID: "y1",
        tension: 0.2,
      },
    ],
  },
  options: {
    interaction: {
      mode: "index",
      intersect: false,
    },
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
        type: "linear",
        display: true,
        position: "left",
        grid: {
          display: false,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  },
};
export const pointStylingConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, -19, 14, -15, 14, -8],
        borderColor: colors[0],
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
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
export const lineSegmentConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, NaN, 48, 56, 57, 40],
        borderColor: colors[0],
        spanGaps: true,
        segment: {
          borderColor: function (ctx) {
            return skipped(ctx, "rgb(0,0,0,0.2)") || down(ctx, "rgb(192,75,75)");
          },
          borderDash: function (ctx) {
            return skipped(ctx, [6, 6]);
          },
        },
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
export const steppedConfig: ChartConfiguration = {
  type: "line",
  data: {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, -19, 14, -15, 14, -8],
        borderColor: colors[0],
        fill: false,
        stepped: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      axis: "x",
    },
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
