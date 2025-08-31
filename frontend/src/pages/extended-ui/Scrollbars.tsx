import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import SimpleBar from "simplebar-react";

const SimplbarContent = () => (
  <Box>
    <Typography>
      SimpleBar does only one thing: replace the browser's default scrollbar with a custom CSS-styled one without losing
      performances. Unlike some popular plugins, SimpleBar doesn't mimic scroll with Javascript, causing janks and
      strange scrolling behaviours... You keep the awesomeness of native scrolling...with a custom scrollbar!
    </Typography>
    <Typography sx={{ marginBottom: "15px" }}>
      SimpleBar <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the <strong>native</strong>
      &nbsp;
      <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar visual appearance.
    </Typography>
    <Typography variant="h5" sx={{ marginBottom: "15px" }}>
      Design it as you want
    </Typography>
    <Typography sx={{ marginBottom: "15px" }}>
      SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple
      style on the same page...or just keep the default style ("Mac OS" scrollbar style).
    </Typography>
    <Typography variant="h5" sx={{ marginBottom: "15px" }}>
      Lightweight and performant
    </Typography>
    <Typography sx={{ marginBottom: "15px" }}>
      Only 6kb minified. SimpleBar doesn't use Javascript to handle scrolling. You keep the performances/behaviours of
      the native scroll.
    </Typography>
    <Typography variant="h5" sx={{ marginBottom: "15px" }}>
      Supported everywhere
    </Typography>
    <Typography>SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.</Typography>
  </Box>
);

const SimpleScrollbar = () => {
  return (
    <ComponentContainerCard title="Default">
      <SimpleBar style={{ height: 224, paddingLeft: 24, paddingRight: 24, width: "100%" }}>
        <SimplbarContent />
      </SimpleBar>
    </ComponentContainerCard>
  );
};

const RTLScrollbar = () => {
  return (
    <ComponentContainerCard title="RTL">
      <SimpleBar
        style={{ height: 224, paddingLeft: 24, paddingRight: 24, width: "100%" }}
        data-simplebar-direction="rtl">
        <SimplbarContent />
      </SimpleBar>
    </ComponentContainerCard>
  );
};

const LargeScrollbar = () => {
  return (
    <ComponentContainerCard title="Large">
      <SimpleBar style={{ height: 224, paddingLeft: 24, paddingRight: 24, width: "100%" }} data-simplebar-lg>
        <SimplbarContent />
      </SimpleBar>
    </ComponentContainerCard>
  );
};

const Scrollbars = () => {
  return (
    <>
      <PageBreadcrumb title="Scrollbar" subName="Extended UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SimpleScrollbar />
        </Grid>

        <Grid item xs={12} md={6}>
          <RTLScrollbar />
        </Grid>

        <Grid item xs={12} md={6}>
          <LargeScrollbar />
        </Grid>
      </Grid>
    </>
  );
};

export default Scrollbars;
