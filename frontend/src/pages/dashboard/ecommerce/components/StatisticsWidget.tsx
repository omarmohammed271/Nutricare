import { Box, Card, Grid, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { LuArrowUp } from "react-icons/lu";
import ReactApexCharts from "react-apexcharts";

type StatisticsWidgetProps = {
  variant: string;
  cardTitle: string;
  change: string;
  stats: string;
  chartSeries: number[];
  colors: string[];
};
const StatisticsWidget = ({ variant, cardTitle, stats, change, chartSeries, colors }: StatisticsWidgetProps) => {
  const apexOpts: ApexOptions = {
    chart: {
      height: 72,
      width: 72,
      type: "donut",
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
        },
      },
    },
    stroke: {
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    colors: colors,
  };
  return (
    <Card>
      <Box padding={"24px"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box flexGrow={1} overflow={"hidden"}>
            <Typography marginTop={0} fontSize={"16px"} color={"text.secondary"} lineHeight={"12px"} component={"h5"}>
              {cardTitle}
            </Typography>
            <Typography component={"h3"} variant="h3" color={"text.primary"} marginY={"24px"}>
              {stats}
            </Typography>
          </Box>
          <Box flexShrink={1}>
            <ReactApexCharts
              className={"apex-charts"}
              options={apexOpts}
              series={chartSeries}
              type="donut"
              width={95}
              height={95}
            />
          </Box>
        </Box>
        <Box display={"flex"} flex={"wrap"} overflow={"hidden"} gap={1} alignItems={"center"}>
          <Box
            sx={{ display: "flex", alignItems: "center", px: "8px", py: "2px", borderRadius: 1, gap: "2px" }}
            bgcolor={`${variant}.lighter`}
            color={`${variant}.darker`}>
            <LuArrowUp size={14} />
            <Typography variant={"caption"}>{change}</Typography>
          </Box>
          <Typography variant="body2" color={"text.disabled"}>
            Since previous week
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default StatisticsWidget;
