import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexCharts from "react-apexcharts";

//image
import chrome from "@src/assets/images/browsers/chrome.png";
import fireFox from "@src/assets/images/browsers/firefox.png";
import safari from "@src/assets/images/browsers/safari.png";
import web from "@src/assets/images/browsers/web.png";
import { LuMoreVertical } from "react-icons/lu";
import { useDropdownMenu } from "@src/hooks";
import Dropdown from "./Dropdown";

const SessionsByBrowser = () => {
  const apexOpts: ApexOptions = {
    chart: {
      height: 364,
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: "Usage",
        data: [80, 50, 30, 40, 60, 20],
      },
    ],
    labels: ["Chrome", "Firefox", "Safari", "Opera", "Edge", "Explorer"],
    plotOptions: {
      radar: {
        size: 130,
        polygons: {
          strokeColors: "#e9e9e9",
          fill: {
            colors: ["#f8f8f8", "#fff"],
          },
        },
      },
    },
    colors: ["#16a7e9"],
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return val + "%";
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColors: "#16a7e9",
      strokeWidth: 2,
    },
  };
  return (
    <Card>
      <Box px={"24px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} py={2}>
        <Typography component={"h4"} color={"grey.700"} variant="h5">
          Sessions by Browser
        </Typography>
        <Dropdown />
      </Box>
      <CardContent>
        <Box pt={0}>
          <ReactApexCharts
            className="apex-charts"
            options={apexOpts}
            series={apexOpts.series}
            type="radar"
            height={345}
          />
          <Box textAlign={"center"}>
            <List sx={{ paddingBottom: 0, display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
              <ListItem sx={{ display: "flex", alignItems: "center", width: "auto" }}>
                <Avatar sx={{ marginLeft: "12px", paddingRight: "4px", height: "24px", width: "24px" }} src={chrome} />
                <Typography fontSize={12} sx={{ verticalAlign: "middle" }}>
                  45.87%
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center", width: "auto" }}>
                <Avatar sx={{ marginLeft: "12px", paddingRight: "4px", height: "24px", width: "24px" }} src={fireFox} />
                <Typography fontSize={12} sx={{ verticalAlign: "middle" }}>
                  3.25%
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center", width: "auto" }}>
                <Avatar sx={{ marginLeft: "12px", paddingRight: "4px", height: "24px", width: "24px" }} src={safari} />
                <Typography fontSize={12} sx={{ verticalAlign: "middle" }}>
                  9.68%
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center", width: "auto" }}>
                <Avatar sx={{ marginLeft: "12px", paddingRight: "4px", height: "24px", width: "24px" }} src={web} />
                <Typography fontSize={12} sx={{ verticalAlign: "middle" }}>
                  36.87%
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessionsByBrowser;
