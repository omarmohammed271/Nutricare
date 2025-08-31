import { Alert, Box, Button, Collapse, Grid, IconButton } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { useState } from "react";
import { LuX } from "react-icons/lu";

const AlertDismiss = () => {
  const [open, setOpen] = useState(true);

  return (
    <ComponentContainerCard
      title="Alerts"
      description="Dismissible Alerts with different close buttons"
      stackProps={{ direction: "column", gap: 0 }}>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{ maxWidth: "fit-content", mb: "13px" }}>
        Re-open
      </Button>
      <Box sx={{ display: { sm: "flex" }, gap: 2 }}>
        {open && (
          <>
            <Alert onClose={() => setOpen(false)}>This is a success alert — check it out!</Alert>
            <Alert
              action={
                <Button color="inherit" size="small" onClick={() => setOpen(false)}>
                  UNDO
                </Button>
              }>
              This is a success alert — check it out!
            </Alert>
          </>
        )}
      </Box>
    </ComponentContainerCard>
  );
};

const AnimatedDismiss = () => {
  const [open, setOpen] = useState(true);

  return (
    <ComponentContainerCard
      title="Animated"
      description="You can use a transition component such as Collapse to transition the appearance of the alert."
      stackProps={{ direction: "column", gap: 0 }}>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
        sx={{ maxWidth: "fit-content", mb: "13px" }}>
        Re-open
      </Button>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}>
              <LuX fontSize="inherit" />
            </IconButton>
          }>
          Close me!
        </Alert>
      </Collapse>
    </ComponentContainerCard>
  );
};

const Dismissible = () => {
  return (
    <>
      <PageBreadcrumb title="Dismissible" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <AlertDismiss />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AnimatedDismiss />
        </Grid>
      </Grid>
    </>
  );
};

export default Dismissible;
