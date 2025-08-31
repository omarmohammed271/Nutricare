import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";
import Dropdown from "./Dropdown";

const ViewsPerMinute = () => {
  function getRandomData(length: number) {
    const dataArray = [];
    for (let idx = 0; idx < length; idx++) {
      dataArray.push(Math.floor(Math.random() * 90) + 10);
    }
    return dataArray;
  }

  const apexOpts: ApexOptions = {
    chart: {
      height: 216,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "22%",
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -24,
      style: {
        fontSize: "12px",
        colors: ["#8a969c"],
      },
    },
    series: [
      {
        name: "Views",
        data: getRandomData(10),
      },
    ],
    legend: {
      show: false,
    },
    colors: ["#16a7e9"],
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: !0,
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: void 0,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
  };
  return (
    <Card>
      <Box paddingX={"24px"} paddingY={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="h5" color={"grey.700"} component={"h4"}>
          Views Per Minute
        </Typography>
        <Dropdown />
      </Box>
      <CardContent>
        <Box pt={0}>
          <ReactApexCharts
            className="apex-charts"
            options={apexOpts}
            series={apexOpts.series}
            type="bar"
            height={245}
          />
        </Box>
        <Box marginTop={"24px"}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Page</TableCell>
                  <TableCell> Views</TableCell>
                  <TableCell> Bounce Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>/adminto/dashboard-analytics</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>87.5%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>/attex/dashboard-crm</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>21.48%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>/attex/dashboard</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>63.59%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ViewsPerMinute;
