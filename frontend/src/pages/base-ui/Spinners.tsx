import { Box, Button, CircularProgress, Fab, Fade, Grid, Typography } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { useProgressValue } from "@src/hooks";
import { green } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { LuCheck, LuSave } from "react-icons/lu";

const DefaultSpinner = () => {
  return (
    <ComponentContainerCard
      title="Default Circular"
      description="Linear indeterminate spinner, impossible to tract actual progress"
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <CircularProgress />
    </ComponentContainerCard>
  );
};

const ColoredSpinner = () => {
  return (
    <ComponentContainerCard
      title="Colored Circular"
      description="Circular indeterminate spinner, impossible to tract actual progress"
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <CircularProgress color="primary" />
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="info" />
      <CircularProgress color="warning" />
      <CircularProgress color="error" />
    </ComponentContainerCard>
  );
};

const CircularDeterminateSpinner = () => {
  const { progress } = useProgressValue();

  return (
    <ComponentContainerCard
      title="Circular Determinate"
      description="Determinate progress spinner, whose actuall progress can be determined"
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <CircularProgress variant="determinate" value={25} />
      <CircularProgress variant="determinate" value={50} />
      <CircularProgress variant="determinate" value={75} />
      <CircularProgress variant="determinate" value={100} />
      <CircularProgress variant="determinate" value={progress} />
    </ComponentContainerCard>
  );
};

const CircularWithLabelSpinner = () => {
  const { progress } = useProgressValue();

  return (
    <ComponentContainerCard
      title="Circular With Label"
      description="Determinate progress spinner, whose actuall progress can be determined"
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={progress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </ComponentContainerCard>
  );
};

const DelayedAppearanceSpinner = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("idle");
  const timerRef = useRef<number>();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== "idle") {
      setQuery("idle");
      return;
    }

    setQuery("progress");
    timerRef.current = window.setTimeout(() => {
      setQuery("success");
    }, 2000);
  };
  return (
    <ComponentContainerCard
      title="Delayed Appearance"
      description="Determinate progress spinner, whose actuall progress can be determined"
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexDirection: "column", display: "flex", alignItems: "center" }}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? "800ms" : "0ms",
            }}
            unmountOnExit>
            <CircularProgress />
          </Fade>
          <Button onClick={handleClickLoading}>{loading ? "Stop loading" : "Loading"}</Button>
        </Box>
        <Box sx={{ flexDirection: "column", display: "flex", alignItems: "center" }}>
          {query === "success" ? (
            <Typography>Success!</Typography>
          ) : (
            <Fade
              in={query === "progress"}
              style={{
                transitionDelay: query === "progress" ? "800ms" : "0ms",
              }}
              unmountOnExit>
              <CircularProgress />
            </Fade>
          )}
          <Button onClick={handleClickQuery}>{query !== "idle" ? "Reset" : "Simulate a load"}</Button>
        </Box>
      </Box>
    </ComponentContainerCard>
  );
};

const InteractiveIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <ComponentContainerCard
      title="Interactive Integration"
      description="Interactive spinner with progress value"
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Fab aria-label="save" color="primary" sx={buttonSx} onClick={handleButtonClick}>
            {success ? <LuCheck size={24} /> : <LuSave size={24} />}
          </Fab>
          {loading && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button variant="contained" sx={buttonSx} disabled={loading} onClick={handleButtonClick}>
            Accept terms
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Box>
    </ComponentContainerCard>
  );
};

const Spinners = () => {
  return (
    <>
      <PageBreadcrumb title="Spinners" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <DefaultSpinner />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ColoredSpinner />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CircularDeterminateSpinner />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CircularWithLabelSpinner />
        </Grid>

        <Grid item xs={12} lg={6}>
          <DelayedAppearanceSpinner />
        </Grid>

        <Grid item xs={12} lg={6}>
          <InteractiveIntegration />
        </Grid>
      </Grid>
    </>
  );
};

export default Spinners;
