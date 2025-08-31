import { Box, Card, CardContent, LinearProgress, Typography } from "@mui/material";
import Dropdown from "./Dropdown";
import ReactApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const TotalSalesChart = () => {
  const apexOpts: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "14px",
            color: undefined,
            offsetY: 100,
          },
          value: {
            offsetY: 55,
            fontSize: "24px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        track: {
          background: "rgba(170,184,197, 0.2)",
          margin: 0,
        },
      },
    },
    fill: {
      gradient: {
        // enabled: true,
        shade: "dark",
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    colors: ["#02BE6A", "#47ad77", "#fa5c7c", "#16a7e9"],
    series: [67],
    labels: ["Returning Customer"],
    responsive: [
      {
        breakpoint: 380,
        options: {
          chart: {
            height: 180,
          },
        },
      },
    ],
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };
  const apexData = [67];
  return (
    <Card>
      <Box paddingX={"24px"} paddingY={"12px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography component={"h4"} color={"grey.700"} variant="h5">
          Total Sales
        </Typography>
        <Dropdown />
      </Box>
      <Box
        sx={{ border: "1px 0px 1px 0px solid #ffc35a33" }}
        paddingY={"14px"}
        bgcolor={"info.lighter"}
        display={"flex"}
        flexWrap={"wrap"}
        paddingX={"20px"}
        color={"info.darker"}>
        <Typography component={"p"} marginRight={"5px"}>
          
          Something went wrong. Please
        </Typography>
        <Typography fontWeight={700} marginRight={"5px"} sx={{ textDecoration: "underline" }}>
          refresh
        </Typography>
        <Typography component={"p"} marginRight={"5px"}>
          
          to get new data!
        </Typography>
      </Box>
      <CardContent sx={{ padding: "24px", paddingTop: "0px" }}>
        <ReactApexCharts options={apexOpts} series={apexData} type="radialBar" height={318} className="apex-charts" />
        <Box marginBottom={"6px"}>
          <Typography component={"h5"} fontSize={"16px"} marginBottom={"10px"} fontWeight={500}>
            Brooklyn, New York
          </Typography>
          <Box width={"100%"} display={"flex"} alignItems={"center"} gap={1}>
            <LinearProgress
              sx={{ width: "100%", height: "6px", borderRadius: "50rem" }}
              variant="determinate"
              color="primary"
              value={77}></LinearProgress>
            <Typography fontWeight={700} color={"grey.600"}>
              72k
            </Typography>
          </Box>
        </Box>
        <Box marginBottom={"6px"}>
          <Typography component={"h5"} fontSize={"16px"} marginBottom={"10px"} fontWeight={500}>
            The Castro, San Francisco
          </Typography>
          <Box width={"100%"} display={"flex"} alignItems={"center"} gap={1}>
            <LinearProgress
              sx={{ width: "100%", height: "6px", borderRadius: "50rem" }}
              variant="determinate"
              color="primary"
              value={30}></LinearProgress>
            <Typography fontWeight={700} color={"grey.600"}>
              39k
            </Typography>
          </Box>
        </Box>
        <Box marginBottom={"6px"}>
          <Typography component={"h5"} fontSize={"16px"} marginBottom={"10px"} fontWeight={500}>
            Kovan, Singapore
          </Typography>
          <Box width={"100%"} display={"flex"} alignItems={"center"} gap={1}>
            <LinearProgress
              sx={{ width: "100%", height: "6px", borderRadius: "50rem" }}
              variant="determinate"
              color="primary"
              value={60}></LinearProgress>
            <Typography fontWeight={700} color={"grey.600"}>
              61k
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalSalesChart;
