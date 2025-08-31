import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { LuArrowDown, LuArrowRight, LuArrowUp } from "react-icons/lu";
import ReactApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import emailCampaign from "@src/assets/images/svg/email-campaign.svg";
import { useEffect } from "react";

const Statistics = () => {
  /**
   * Live count generator
   */
  useEffect(() => {
    const countInterval = setInterval(function () {
      const activeUsersCount = Math.floor(Math.random() * 600 + 150);

      const activeUserElement = document.getElementById("active-users-count");
      if (activeUserElement) {
        activeUserElement.innerHTML = activeUsersCount.toString();
      }

      const activeViewsElement = document.getElementById("active-views-count");
      if (activeViewsElement) {
        activeViewsElement.innerHTML = Math.floor(Math.random() * activeUsersCount + 200).toString();
      }
    }, 2000);

    return () => {
      clearInterval(countInterval);
    };
  }, []);

  const userApexOpts: ApexOptions = {
    chart: {
      height: 60,
      type: "bar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
      },
    },
    colors: ["#16a7e9"],
    series: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const viewsApexOpts: ApexOptions = {
    chart: {
      type: "line",
      height: 60,
      sparkline: {
        enabled: true,
      },
    },
    series: [
      {
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      },
    ],
    stroke: {
      width: 2,
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    colors: ["#47ad77"],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={4} xs={12} md={6}>
          <Card>
            <CardContent sx={{ padding: "24px" }}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Typography
                    variant="h4"
                    component={"h3"}
                    color={"text.secondary"}
                    sx={{ mb: 3, fontSize: { md: 20 } }}>
                    Enhance your <strong>Campaign</strong> for better outreach
                  </Typography>
                  <Typography
                    color={"success.main"}
                    variant="body1"
                    sx={{ display: "flex", gap: 1, alignItems: "center", fontWeight: 600, fontSize: { md: 14 } }}>
                    Go Premium <LuArrowRight />
                  </Typography>
                </Box>
                <Avatar sx={{ width: "92px", maxWidth: "100%", height: "0" }} src={emailCampaign} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12} md={6}>
          <Card>
            <CardContent sx={{ padding: "24px" }}>
              <Box display={"flex"} alignItems={"center"}>
                <Box width={"50%"}>
                  <Typography
                    variant="body1"
                    component={"h5"}
                    sx={{ marginTop: 0, fontWeight: 500, color: "grey.700", textTransform: "uppercase" }}>
                    Active Users
                  </Typography>
                  <Typography
                    variant="h2"
                    color={"secondary"}
                    sx={{ fontSize: "28px", color: "grey.700", my: "12px", py: "2px" }}
                    id="active-users-count">
                    825
                  </Typography>
                  <Typography display={"flex"} flex={"wrap"} component={"p"} overflow={"hidden"}>
                    <Typography variant="body2" marginRight={"7px"} color={"success.main"}>
                      <LuArrowUp /> 3.27%
                    </Typography>
                    <Typography variant="body2" color={"text.secondary"}>
                      Since previous week
                    </Typography>
                  </Typography>
                </Box>
                <Box width={"50%"} textAlign={"end"}>
                  <ReactApexCharts
                    className="apex-charts"
                    options={userApexOpts}
                    series={userApexOpts.series}
                    type="bar"
                    height={60}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12} md={12}>
          <Card>
            <CardContent sx={{ padding: "24px" }}>
              <Box display={"flex"} alignItems={"center"}>
                <Box width={"50%"}>
                  <Typography
                    variant="body1"
                    component={"h5"}
                    sx={{ marginTop: 0, fontWeight: 500, color: "grey.700", textTransform: "uppercase" }}>
                    Views Per Minute
                  </Typography>
                  <Typography
                    variant="h2"
                    color={"secondary"}
                    sx={{ fontSize: "28px", color: "grey.700", my: "12px", py: "2px" }}
                    id="active-views-count">
                    589
                  </Typography>
                  <Typography display={"flex"} flex={"wrap"} component={"p"} overflow={"hidden"}>
                    <Typography variant="body2" marginRight={"7px"} color={"error"}>
                      <LuArrowDown /> 2.66%
                    </Typography>
                    <Typography variant="body2" color={"text.secondary"}>
                      Since previous week
                    </Typography>
                  </Typography>
                </Box>
                <Box width={"50%"} textAlign={"end"}>
                  <ReactApexCharts
                    className="apex-charts"
                    options={viewsApexOpts}
                    series={viewsApexOpts.series}
                    type="line"
                    height={60}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
