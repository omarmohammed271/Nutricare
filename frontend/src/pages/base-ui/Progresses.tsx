import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { useProgressValue } from "@src/hooks";

const DefaultLinear = () => {
  return (
    <ComponentContainerCard
      title="Default Linear"
      description="Linear indeterminate progress, impossible to tract actual progress">
      <Box width={"100%"}>
        <LinearProgress />
      </Box>
    </ComponentContainerCard>
  );
};

const ColorVariantLinear = () => {
  return (
    <ComponentContainerCard
      title="Color Variant Linear"
      description="Linear indeterminate progress, impossible to tract actual progress">
      <Box sx={{ width: "100%", flexDirection: "column", gap: 2, display: "flex" }}>
        <LinearProgress color="primary" />
        <LinearProgress color="secondary" />
        <LinearProgress color="success" />
        <LinearProgress color="info" />
        <LinearProgress color="warning" />
        <LinearProgress color="error" />
      </Box>
    </ComponentContainerCard>
  );
};

const LinearDeterminateProgress = () => {
  const { progress } = useProgressValue();

  return (
    <ComponentContainerCard
      title="Linear Determinate"
      description="Linear determinate progress, whose actuall progress can be determined">
      <Box width={"100%"}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </ComponentContainerCard>
  );
};

const LinearBufferProgress = () => {
  const { progress, buffer } = useProgressValue();

  return (
    <ComponentContainerCard
      title="Linear Buffer"
      description="Linear buffer progress, which also shows the buffer progress with actuall progress">
      <Box width={"100%"}>
        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
      </Box>
    </ComponentContainerCard>
  );
};

const LinearDeterminateLabelProgress = () => {
  const { progress } = useProgressValue();

  return (
    <ComponentContainerCard
      title="Linear Determinate"
      description="Linear determinate progress, whose actuall progress can be determined">
      <Box sx={{ display: "flex", width: "100%", alignItems: "center", gap: 2 }}>
        <Box width={"100%"}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
      </Box>
    </ComponentContainerCard>
  );
};

const Progresses = () => {
  return (
    <>
      <PageBreadcrumb title="Progress" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <DefaultLinear />
        </Grid>

        <Grid item lg={6}>
          <LinearDeterminateProgress />
        </Grid>

        <Grid item lg={6}>
          <LinearBufferProgress />
        </Grid>

        <Grid item lg={6}>
          <LinearDeterminateLabelProgress />
        </Grid>

        <Grid item lg={6}>
          <ColorVariantLinear />
        </Grid>
      </Grid>
    </>
  );
};

export default Progresses;
