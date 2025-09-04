import { GoogleMap, LoadScript } from "@react-google-maps/api";

// components
import { BasicGoogleMap, DarkStyledMap, LightStyledMap, MapWithMarkers, PolyLineMap, StreetViewMap } from "./data";
import { PageBreadcrumb } from "@src/components";
import { Grid, Typography } from "@mui/material";

const GoogleMaps = () => {
  return (
    <>
      <PageBreadcrumb title="Google Maps" subName="Maps" />
      <LoadScript googleMapsApiKey="AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <BasicGoogleMap />
          </Grid>
          <Grid item xs={12} lg={6}>
         
          </Grid>
          <Grid item xs={12} lg={6}>
            <StreetViewMap />
          </Grid>
          <Grid item xs={12} lg={6}>
            <PolyLineMap />
          </Grid>
          <Grid item xs={12} lg={6}>
            <LightStyledMap />
          </Grid>
          <Grid item xs={12} lg={6}>
     
          </Grid>
        </Grid>
      </LoadScript>
    </>
  );
};

export default GoogleMaps;
