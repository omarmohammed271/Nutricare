//TODO:----
import { Box, Grid } from "@mui/material";
import Plyr from "plyr-react";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

// styles
import "plyr-react/plyr.css";

const YoutubePlayer = () => {
  return (
    <ComponentContainerCard
      title="Youtube"
      sx={{
        "& .plyr-react.plyr , .plyr.plyr--full-ui": {
          width: "100%",
        },
      }}>
      <Plyr
        source={{
          type: "video",
          sources: [{ src: "PrUxWZiQfy4", provider: "youtube" }],
        }}
      />
    </ComponentContainerCard>
  );
};

const VimeoPlayer = () => {
  return (
    <ComponentContainerCard
      title="Vimeo"
      sx={{
        "& .plyr-react.plyr , .plyr.plyr--full-ui , .plyr--vimeo": {
          width: "100%",
        },
      }}>
      <Plyr
        source={{
          type: "video",
          sources: [{ src: "265284284", provider: "vimeo" }],
        }}
      />
    </ComponentContainerCard>
  );
};

const Players = () => {
  return (
    <>
      <PageBreadcrumb title="Player" subName="Extended UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <YoutubePlayer />
        </Grid>

        <Grid item xs={12} lg={6}>
          <VimeoPlayer />
        </Grid>
      </Grid>
    </>
  );
};

export default Players;
