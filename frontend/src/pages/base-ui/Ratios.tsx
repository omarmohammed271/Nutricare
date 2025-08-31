import { Grid } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

const Ratios = () => {
  return (
    <>
      <PageBreadcrumb title="Ratio" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ComponentContainerCard title="Aspect Ratio 21:9">
            <iframe
              src="https://www.youtube.com/embed/PrUxWZiQfy4"
              title="Embed Video Ratio"
              style={{ aspectRatio: 21 / 9, height: "100%", width: "100%" }}
            />
          </ComponentContainerCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentContainerCard title="Aspect Ratio 16:9">
            <iframe
              src="https://www.youtube.com/embed/PrUxWZiQfy4"
              title="Embed Video Ratio"
              style={{ aspectRatio: 16 / 9, height: "100%", width: "100%" }}
            />
          </ComponentContainerCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentContainerCard title="Aspect Ratio 1:1 ">
            <iframe
              src="https://www.youtube.com/embed/PrUxWZiQfy4"
              title="Embed Video Ratio"
              style={{ aspectRatio: 1 / 1, height: "100%", width: "100%" }}
            />
          </ComponentContainerCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentContainerCard title="Aspect Ratio 4:3">
            <iframe
              src="https://www.youtube.com/embed/PrUxWZiQfy4"
              title="Embed Video Ratio"
              style={{ aspectRatio: 4 / 3, height: "100%", width: "100%" }}
            />
          </ComponentContainerCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Ratios;
