import { Box, Grid, Typography } from "@mui/material";
import { icons } from "lucide-react";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import LucideIcon from "./LucideIcon";

const LucideIcons = () => {
  const allLucideIcons = Object.keys(icons) as (keyof typeof icons)[];
  return (
    <>
      <PageBreadcrumb title="Lucide Icons" subName="Icons" />

      <ComponentContainerCard
        title="All Icons"
        description="The below example shows how can lucide-react icons be used in your Admin">
        <Grid container spacing={3} mt={"10px"}>
          {allLucideIcons.map((icon, idx) => {
            return (
              <Grid item lg={3} md={4} xs={12} key={idx}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "12px",
                    "& > svg": {
                      color: "grey.700",
                    },
                  }}>
                  <LucideIcon name={icon} size={24} />
                  <Typography component={"span"} color={"grey.700"}>
                    {icon}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </ComponentContainerCard>
    </>
  );
};

export default LucideIcons;
