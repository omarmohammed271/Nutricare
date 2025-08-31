/*
 * Copyright (c) 2023.
 * File Name: Alerts.tsx
 * Author: Coderthemes
 */

import { ComponentType, Fragment, ReactElement, SyntheticEvent, forwardRef, useState } from "react";
import {
  Alert,
  AlertColor,
  AlertProps,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Fade,
  Grid,
  Grow,
  GrowProps,
  IconButton,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { LuAlertOctagon, LuAlertTriangle, LuBadgeInfo, LuCheckCircle, LuX } from "react-icons/lu";
import { TransitionProps } from "@mui/material/transitions";

const BasicAlerts = () => {
  return (
    <ComponentContainerCard
      title="Basic"
      description="The alert offers four severity levels that set a distinctive icon and color."
      stackProps={{ direction: "column" }}>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Alert severity="error">This is a success alert — check it out!</Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert severity="warning">This is a success alert — check it out!</Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert severity="info">This is a success alert — check it out!</Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert severity="success">This is an info alert — check it out!</Alert>
        </Grid>
      </Grid>
    </ComponentContainerCard>
  );
};

const CustomIconAlerts = () => {
  return (
    <ComponentContainerCard title="Custom Icons" description="Alerts with Custom Icons of your choice">
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Alert icon={<LuAlertOctagon fontSize="inherit" />} severity="error">
            This is a error alert — check it out!
          </Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert icon={<LuAlertTriangle fontSize="inherit" />} severity="warning">
            This is a warning alert — check it out!
          </Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert icon={<LuBadgeInfo fontSize="inherit" />} severity="info">
            This is a info alert — check it out!
          </Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert icon={<LuCheckCircle fontSize="inherit" />} severity="success">
            This is a success alert — check it out!
          </Alert>
        </Grid>
      </Grid>
    </ComponentContainerCard>
  );
};

const DescriptiveAlerts = () => {
  return (
    <ComponentContainerCard
      title="Descriptive"
      description="You can use the AlertTitle component to display a formatted title above the content.">
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
          </Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            This is a warning alert — <strong>check it out!</strong>
          </Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            This is an info alert — <strong>check it out!</strong>
          </Alert>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>check it out!</strong>
          </Alert>
        </Grid>
      </Grid>
    </ComponentContainerCard>
  );
};

const VariantSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>();

  const MuiAlert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <Alert elevation={6} ref={ref} variant="filled" {...props} />
  ));

  const handleShowSnackbar = (severity: AlertColor) => {
    setAlertSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const variants: AlertColor[] = ["error", "warning", "info", "success"];

  return (
    <>
      <ComponentContainerCard
        title="Variants Snackbar"
        description="Snackbar Variants which you can use depending on the severity"
        stackProps={{ spacing: 1 }}>
        {variants.map((variant, idx) => (
          <Button
            key={idx}
            variant={"outlined"}
            color={variant}
            onClick={() => {
              handleShowSnackbar(variant);
            }}
            sx={{ width: "100%" }}>
            Open {variant} snackbar
          </Button>
        ))}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert onClose={handleClose} severity={alertSeverity} sx={{ width: "100%" }}>
            This is a success message!
          </MuiAlert>
        </Snackbar>
      </ComponentContainerCard>
    </>
  );
};

const ActionsOnAlert = () => {
  return (
    <ComponentContainerCard
      title="Actions on Alerts"
      description="An alert can have an action, such as a close or undo button. It is rendered after the message, at the end of the alert.">
      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
      <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }>
        This is a success alert — check it out!
      </Alert>
    </ComponentContainerCard>
  );
};

const SimpleSnackbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <LuX fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <>
      <ComponentContainerCard title="Simple Snackbar" description="Simple Snackbar on Bottom left corner">
        <Button onClick={handleClick} sx={{ width: "fit-content", mb: "13px" }}>
          Open simple snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="Note archived" action={action} />
      </ComponentContainerCard>
    </>
  );
};

const OutlinedAlerts = () => {
  return (
    <ComponentContainerCard title="Outlined Variant" description="Outlined Variant of Alert">
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Alert variant="outlined" severity="error">
            This is an error alert — check it out!
          </Alert>
        </Grid>
        <Grid item md={6} xs={12}>
          <Alert variant="outlined" severity="warning">
            This is a warning alert — check it out!
          </Alert>
        </Grid>
        <Grid item md={6} xs={12}>
          <Alert variant="outlined" severity="info">
            This is an info alert — check it out!
          </Alert>
        </Grid>
        <Grid item md={6} xs={12}>
          <Alert variant="outlined" severity="success">
            This is a success alert — check it out!
          </Alert>
        </Grid>
      </Grid>
    </ComponentContainerCard>
  );
};

const FilledAlerts = () => {
  return (
    <ComponentContainerCard title="Filled Variant" description="Filled Variant of Alert">
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Alert variant="filled" severity="error">
            This is an error alert — check it out!
          </Alert>
        </Grid>
        <Grid item md={6} xs={12}>
          <Alert variant="filled" severity="warning">
            This is a warning alert — check it out!
          </Alert>
        </Grid>
        <Grid item md={6} xs={12}>
          <Alert variant="filled" severity="info">
            This is an info alert — check it out!
          </Alert>
        </Grid>
        <Grid item md={6} xs={12}>
          <Alert variant="filled" severity="success">
            This is a success alert — check it out!
          </Alert>
        </Grid>
      </Grid>
    </ComponentContainerCard>
  );
};

const PositionedSnackbar = () => {
  type State = SnackbarOrigin & {
    open: boolean;
  };

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <Fragment>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleClick({ vertical: "top", horizontal: "center" })}>Top-Center</Button>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Button onClick={handleClick({ vertical: "top", horizontal: "left" })}>Top-Left</Button>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button onClick={handleClick({ vertical: "top", horizontal: "right" })}>Top-Right</Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleClick({ vertical: "bottom", horizontal: "left" })}>Bottom-Left</Button>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button onClick={handleClick({ vertical: "bottom", horizontal: "right" })}>Bottom-Right</Button>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleClick({ vertical: "bottom", horizontal: "center" })}>Bottom-Center</Button>
      </Box>
    </Fragment>
  );

  return (
    <ComponentContainerCard
      title="Controlled Positioning"
      description="You can control the position of the snackbar by specifying the anchorOrigin prop.">
      <Box sx={{ width: "100%" }}>
        {buttons}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        />
      </Box>
    </ComponentContainerCard>
  );
};

const ControlledSlideDirection = () => {
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<ComponentType<TransitionProps> | undefined>(undefined);

  type TransitionProps = Omit<SlideProps, "direction">;

  function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
  }

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
  }

  function TransitionRight(props: TransitionProps) {
    return <Slide {...props} direction="right" />;
  }

  function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
  }

  const handleClick = (Transition: ComponentType<TransitionProps>) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ComponentContainerCard
      title="Controlled Slide Direction"
      description="You can control the direction of the slide transition by specifying the direction prop.">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick(TransitionUp)}>Up</Button>
        </Box>
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <Button onClick={handleClick(TransitionRight)}>Left</Button>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button onClick={handleClick(TransitionLeft)}>Right</Button>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick(TransitionDown)}>Down</Button>
        </Box>
        <Snackbar
          open={open}
          onClose={handleClose}
          TransitionComponent={transition}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          message="I love snacks"
          key={transition ? transition.name : ""}
        />
      </Box>
    </ComponentContainerCard>
  );
};

const TransitionAlert = () => {
  const [open, setOpen] = useState(true);
  return (
    <ComponentContainerCard
      title="Transitioned"
      description="You can use a transition component such as Collapse to transition the appearance of the alert."
      stackProps={{ direction: "column" }}>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
        sx={{ maxWidth: "fit-content" }}>
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

const TransitionVariant = () => {
  const [state, setState] = useState<{
    open: boolean;
    Transition: ComponentType<
      TransitionProps & {
        children: ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

  function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
  }

  const handleClick = (Transition: ComponentType<TransitionProps & { children: ReactElement<any, any> }>) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <ComponentContainerCard
      title="Transition Variant"
      description="Grow is the default transition but you can use a different one.">
      <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
      <Button onClick={handleClick(Fade)}>Fade Transition</Button>
      <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        color="success"
        TransitionComponent={state.Transition}
        message="I love snacks"
        key={state.Transition.name}
      />
    </ComponentContainerCard>
  );
};

const Alerts = () => {
  return (
    <>
      <PageBreadcrumb title="Alerts" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <BasicAlerts />
        </Grid>

        <Grid item lg={6}>
          <CustomIconAlerts />
        </Grid>

        <Grid item lg={6}>
          <DescriptiveAlerts />
        </Grid>

        <Grid item lg={6} xs={12}>
          <VariantSnackbar />
        </Grid>

        <Grid item lg={6} xs={12}>
          <ActionsOnAlert />
        </Grid>

        <Grid item lg={6} xs={12}>
          <SimpleSnackbar />
        </Grid>

        <Grid item lg={6}>
          <OutlinedAlerts />
        </Grid>

        <Grid item lg={6}>
          <FilledAlerts />
        </Grid>

        <Grid item lg={6} xs={12}>
          <PositionedSnackbar />
        </Grid>

        <Grid item lg={6} xs={12}>
          <ControlledSlideDirection />
        </Grid>

        <Grid item lg={6} xs={12}>
          <TransitionAlert />
        </Grid>

        <Grid item lg={6} xs={12}>
          <TransitionVariant />
        </Grid>
      </Grid>
    </>
  );
};

export default Alerts;
