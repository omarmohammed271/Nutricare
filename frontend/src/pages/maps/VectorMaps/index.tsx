import { Box, Grid } from "@mui/material";

// components
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// maps
import WorldMap from "./maps/WorldMap";
import UsaVectorMap from "./maps/UsaVectorMap";
import RussiaVectorMap from "./maps/RussiaVectorMap";
import ItalyVectorMap from "./maps/ItalyVectorMap";
import IraqVectorMap from "./maps/IraqVectorMap";
import SpainVectorMap from "./maps/SpainVectorMap";
import CanadaVectorMap from "./maps/CanadaVectorMap";

// data
import {
  worldMapOpts,
  usaMapOpts,
  spainMapOpts,
  canadaMapOpts,
  russiaMapOpts,
  italyMapOpts,
  iraqMapOpts,
} from "./data";

const VectorMaps = () => {
  return (
    <>
      <PageBreadcrumb title="Vector Maps" subName="Maps" />

      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="World Vector Map">
            <Box mb={"12px"} width="100%">
              <WorldMap height="360px" options={worldMapOpts} />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="USA Vector Map">
            <Box mb={"12px"} width="100%">
              <UsaVectorMap height="360px" options={usaMapOpts} />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Russia Vector Map">
            <Box mb={"12px"} width="100%">
              <RussiaVectorMap height="360px" options={russiaMapOpts} />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Canada Vector Map">
            <Box mb={"12px"} width="100%">
              <CanadaVectorMap height="360px" options={canadaMapOpts} />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Italy Vector Map">
            <Box mb={"12px"} width="100%">
              <ItalyVectorMap height="360px" options={italyMapOpts} />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Iraq Vector Map">
            <Box mb={"12px"} width="100%">
              <IraqVectorMap height="360px" options={iraqMapOpts} />
            </Box>
          </ComponentContainerCard>
        </Grid>
        <Grid item xl={6} xs={12}>
          <ComponentContainerCard title="Spain Vector Map">
            <Box mb={"12px"} width="100%">
              <SpainVectorMap height="360px" options={spainMapOpts} />
            </Box>
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default VectorMaps;
