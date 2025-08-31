import StatisticsWidget from "./StatisticsWidget";
import { statisticsData } from "./data";
import { Grid } from "@mui/material";

const Statistics = () => {
  return (
    <>
      <Grid container spacing={3} columns={120}>
        {(statisticsData || []).map((item, idx) => {
          return (
            <Grid item xl={24} lg={30} md={40} sm={60} xs={120} key={idx}>
              <StatisticsWidget
                cardTitle={item.cardTitle}
                change={item.change}
                chartSeries={item.chartSeries}
                colors={item.colors}
                stats={item.stats}
                variant={item.variant}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Statistics;
