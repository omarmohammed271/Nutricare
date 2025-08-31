import { Box, Button, Card, CardContent, List, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { LuPieChart } from "react-icons/lu";

const SessionOverview = () => {
  const stats = [
    {
      key: "Direct",
      value: "170K",
    },
    {
      key: "Organic Search",
      value: "12M",
    },
    {
      key: "Referral",
      value: "8.27%",
    },
    {
      key: "Social",
      value: "69k",
    },
  ];

  function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const days = [];
    let idx = 0;
    while (date.getMonth() === month && idx < 15) {
      const d = new Date(date);
      days.push(d.getDate() + " " + d.toLocaleString("en-us", { month: "short" }));
      date.setDate(date.getDate() + 1);
      idx += 1;
    }
    return days;
  }

  const labels = getDaysInMonth(new Date().getMonth() + 1, new Date().getFullYear());

  const apexOpts: ApexOptions = {
    chart: {
      height: 240,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    series: [
      {
        name: "Sessions",
        data: [10, 20, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40, 30, 50, 35],
      },
    ],
    legend: {
      show: false,
    },
    colors: ["#47ad77"],
    xaxis: {
      // type: 'string',
      categories: labels,
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {},
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return val + "k";
        },
        offsetX: -15,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
  };
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
          Sessions Overview
        </Typography>
        <List sx={{ paddingY: "0px" }}>
          <Button variant="text" size="small" color="inherit">
            Today
          </Button>
          <Button variant="text" size="small" color="inherit">
            7d
          </Button>
          <Button variant="text" size="small" color="primary">
            15d
          </Button>
          <Button variant="text" size="small" color="inherit">
            1m
          </Button>
          <Button variant="text" size="small" color="inherit">
            1y
          </Button>
        </List>
      </Box>
      <CardContent>
        <Box padding="24px">
          <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} textAlign={"center"}>
            {stats.map((stat, idx) => (
              <Box width="25%" key={idx}>
                <Typography
                  component={"p"}
                  marginTop={"24px"}
                  display={"inline-block"}
                  alignItems={"center"}
                  color={"text.disabled"}
                  marginBottom={"16px"}>
                  <Box display={"flex"} alignItems={"center"}>
                    <LuPieChart size={15} style={{ marginRight: "8px", verticalAlign: "middle" }} /> {stat.key}
                  </Box>
                </Typography>
                <Typography
                  fontSize={"24px"}
                  lineHeight={"32px"}
                  component={"h3"}
                  marginBottom={"24px"}
                  fontWeight={400}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box>
          <ReactApexChart
            className="apex-charts"
            options={apexOpts}
            height={240}
            series={apexOpts.series}
            type="area"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessionOverview;
