import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import Dropdown from "./Dropdown";

const SessionsByOS = () => {
  const apexOpts: ApexOptions = {
    chart: {
      height: 315,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "OS",
            formatter: function () {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return "8541";
            },
          },
        },
      },
    },
    colors: ["#16a7e9", "#47ad77", "#ffc35a", "#f15776"],
    series: [44, 55, 67, 83],
    labels: ["Windows", "Macintosh", "Linux", "Android"],
  };
  return (
    <Card>
      <Box px={"24px"} py={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="h5" color={"grey.700"} component={"h4"}>
          Sessions by Operating System
        </Typography>
        <Dropdown />
      </Box>
      <CardContent>
        <Box pt={0}>
          <ReactApexCharts
            className="apex-charts"
            options={apexOpts}
            series={apexOpts.series}
            type="radialBar"
            height={364}
          />
        </Box>
        <Box display={"flex"} textAlign={"center"} mt={2}>
          <Box width={"50%"}>
            <Typography component={"h4"} mb={"10px"} variant="body1">
              8,285
            </Typography>
            <Typography mb={0} color={"gray.500"}>
              Online System
            </Typography>
          </Box>
          <Box width={"50%"}>
            <Typography component={"h4"} mb={"10px"} variant="body1">
              3,534
            </Typography>
            <Typography mb={0} color={"gray.500"}>
              Offline System
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessionsByOS;
