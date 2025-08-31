import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ReactApexCharts from "react-apexcharts";
import { LuPieChart } from "react-icons/lu";
import Dropdown from "./Dropdown";
import { ApexOptions } from "apexcharts";

const RevenueChart = () => {
  const stats = [
    {
      key: "Current Week",
      value: "$1705.54",
    },
    {
      key: "Previous Week",
      value: "$6,523.25",
    },
    {
      key: "Conversation",
      value: "8.27%",
    },
    {
      key: "Customers",
      value: "69k",
    },
  ];

  const apexOpts: ApexOptions = {
    series: [
      {
        name: "Revenue",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Sales",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    chart: {
      height: 374,
      type: "line",
      offsetY: 10,
    },
    stroke: {
      width: [2, 3],
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    colors: ["#02BE6A", "#47ad77"],
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],
    xaxis: {
      type: "datetime",
    },
    legend: {
      offsetY: 7,
    },
    grid: {
      padding: {
        bottom: 20,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.75,
        opacityTo: 0.75,
        stops: [0, 0, 0],
      },
    },
    yaxis: [
      {
        title: {
          text: "Net Revenue",
        },
      },
      {
        opposite: true,
        title: {
          text: "Number of Sales",
        },
      },
    ],
  };

  const series = [
    {
      name: "Revenue",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    },
    {
      name: "Sales",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
  ];
  return (
    <Card>
      <Box
        borderBottom={"1px solid"}
        borderColor={"divider"}
        paddingX={"24px"}
        paddingY={"12px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        <Typography component={"h4"} color={"grey.700"} variant="h5">
          Revenue
        </Typography>
        <Dropdown />
      </Box>
      <Box
        display={"flex"}
        borderBottom={"1px solid"}
        borderColor={"grey.200"}
        bgcolor={"grey.100"}
        flexWrap={"wrap"}
        alignItems={"center"}
        textAlign={"center"}>
        {stats.map((stat, idx) => (
          <Box width="25%" key={idx}>
            <Typography
              component={"p"}
              marginTop={"24px"}
              display={"inline-block"}
              alignItems={"center"}
              marginBottom={"16px"}
              color={"text.secondary"}>
              <LuPieChart size={14} style={{ marginRight: "5px", verticalAlign: "middle" }} /> {stat.key}
            </Typography>
            <Typography
              fontSize={"24px"}
              lineHeight={"32px"}
              component={"h3"}
              color={"text.primary"}
              marginBottom={"24px"}
              fontWeight={400}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>
      <CardContent>
        <Box>
          <ReactApexCharts options={apexOpts} series={series} type="line" height={380} className="apex-charts" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
