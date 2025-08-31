import { Fragment, useRef } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  Tooltip,
  TooltipProps,
  Typography,
  Zoom,
  styled,
  tooltipClasses,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { useToggle } from "@src/hooks";
import { type Instance } from "@popperjs/core";
import { LuBadgeInfo, LuBellDot, LuMailCheck, LuTrash } from "react-icons/lu";

const BasicTooltip = () => {
  return (
    <ComponentContainerCard
      title="Basic"
      description="Tooltips display informative text when users hover over, focus on, or tap an element."
      stackProps={{ justifyContent: "center" }}>
      <Tooltip title="Read Mails">
        <IconButton>
          <LuMailCheck />
        </IconButton>
      </Tooltip>
      <Tooltip title="More Info">
        <IconButton>
          <LuBadgeInfo />
        </IconButton>
      </Tooltip>
      <Tooltip title="Unread Messages">
        <IconButton>
          <LuBellDot />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton>
          <LuTrash />
        </IconButton>
      </Tooltip>
    </ComponentContainerCard>
  );
};

const CustomizedTooltip = () => {
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <ComponentContainerCard
      title="Customized"
      description="You can customize the look and feel of the tooltip."
      stackProps={{ justifyContent: "center" }}>
      <LightTooltip title="Add">
        <Button>Light</Button>
      </LightTooltip>
      <BootstrapTooltip title="Add">
        <Button>Bootstrap</Button>
      </BootstrapTooltip>
      <HtmlTooltip
        title={
          <Fragment>
            <Typography color="inherit">Tooltip with HTML</Typography>
            <em>{"And here's"}</em> <b>{"some"}</b> <u>{"amazing content"}</u>. {"It's very engaging. Right?"}
          </Fragment>
        }>
        <Button>HTML</Button>
      </HtmlTooltip>
    </ComponentContainerCard>
  );
};

const ArrowTooltip = () => {
  return (
    <ComponentContainerCard
      title="Arrow"
      description="You can use the arrow prop to give your tooltip an arrow indicating which element it refers to."
      stackProps={{ justifyContent: "center" }}>
      <Tooltip title="Add" arrow>
        <Button>Arrow</Button>
      </Tooltip>
    </ComponentContainerCard>
  );
};

const CustomTriggerTooltip = () => {
  const { isOpen, show, hide } = useToggle();

  return (
    <ComponentContainerCard
      title="Triggers"
      description="You can define the types of events that cause a tooltip to show.">
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip disableFocusListener title="Add">
            <Button>Hover or touch</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableHoverListener title="Add">
            <Button>Focus or touch</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip disableFocusListener disableTouchListener title="Add">
            <Button>Hover</Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <ClickAwayListener onClickAway={hide}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={hide}
                open={isOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Add">
                <Button onClick={show}>Click</Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
        </Grid>
      </Grid>
    </ComponentContainerCard>
  );
};

const ControlledTooltip = () => {
  const { isOpen, show, hide } = useToggle();

  return (
    <ComponentContainerCard
      title="Controlled"
      description="You can use the open, onOpen and onClose props to control the behavior of the tooltip."
      stackProps={{ justifyContent: "center" }}>
      <Tooltip open={isOpen} onClose={hide} onOpen={show} title="Add">
        <Button>Controlled</Button>
      </Tooltip>
    </ComponentContainerCard>
  );
};

const CustomWidthTooltip = () => {
  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: "none",
    },
  });

  const longText = `
  Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
  Praesent non nunc mollis, fermentum neque at, semper arcu.
  Nullam eget est sed sem iaculis gravida eget vitae justo.
  `;

  return (
    <ComponentContainerCard
      title="Custom Width"
      description="The Tooltip wraps long text by default to make it readable."
      stackProps={{ justifyContent: "center" }}>
      <Tooltip title={longText}>
        <Button sx={{ m: 1 }}>Default Width [300px]</Button>
      </Tooltip>
      <CustomWidthTooltip title={longText}>
        <Button sx={{ m: 1 }}>Custom Width [500px]</Button>
      </CustomWidthTooltip>
      <NoMaxWidthTooltip title={longText}>
        <Button sx={{ m: 1 }}>No wrapping</Button>
      </NoMaxWidthTooltip>
    </ComponentContainerCard>
  );
};

const TransitionedTooltip = () => {
  return (
    <ComponentContainerCard
      title="Transitioned"
      description="You can use a different transition."
      stackProps={{ justifyContent: "center" }}>
      <Tooltip title="Add">
        <Button>Grow</Button>
      </Tooltip>
      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Add">
        <Button>Fade</Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="Add">
        <Button>Zoom</Button>
      </Tooltip>
    </ComponentContainerCard>
  );
};

const FollowCursor = () => {
  return (
    <ComponentContainerCard
      title="Follow Cursor"
      description='You can enable the tooltip to follow the cursor by setting "followCursor={true}"'
      stackProps={{ justifyContent: "center" }}>
      <Tooltip title="You don't have permission to do this" followCursor>
        <Button variant="outlined">Follow Cursor</Button>
      </Tooltip>
    </ComponentContainerCard>
  );
};

const VirtualElementTooltip = () => {
  const positionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = useRef<Instance>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  return (
    <ComponentContainerCard
      title="Virtual Element"
      description='You can use the "virtualElement" prop to provide a custom element to render the tooltip.'
      stackProps={{ justifyContent: "center" }}>
      <Tooltip
        title="Add"
        placement="top"
        arrow
        PopperProps={{
          popperRef,
          anchorEl: {
            getBoundingClientRect: () => {
              return new DOMRect(positionRef.current.x, areaRef.current!.getBoundingClientRect().y, 0, 0);
            },
          },
        }}>
        <Box
          ref={areaRef}
          onMouseMove={handleMouseMove}
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            py: 1,
            px: 2.5,
            borderRadius: 2,
            cursor: "pointer",
          }}>
          <Typography>Hover</Typography>
        </Box>
      </Tooltip>
    </ComponentContainerCard>
  );
};

const ShowingAndHidingDelayTooltip = () => {
  return (
    <ComponentContainerCard
      title="Showing and Hiding Delay"
      description='You can use the "showingDelay" and "hidingDelay" props to control the delay between showing and hiding the tooltip.'
      stackProps={{ justifyContent: "center" }}>
      <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
        <Button>[500ms, 200ms]</Button>
      </Tooltip>
    </ComponentContainerCard>
  );
};

const PositionedTooltip = () => {
  return (
    <ComponentContainerCard
      title="Positioned"
      description="The Tooltip has 12 placement choices."
      stackProps={{ justifyContent: "center", width: 500 }}>
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip title="Add" placement="top-start">
            <Button>top-start</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top">
            <Button>top</Button>
          </Tooltip>
          <Tooltip title="Add" placement="top-end">
            <Button>top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Tooltip title="Add" placement="left-start">
            <Button>left-start</Button>
          </Tooltip>
          <br />
          <Tooltip title="Add" placement="left">
            <Button>left</Button>
          </Tooltip>
          <br />
          <Tooltip title="Add" placement="left-end">
            <Button>left-end</Button>
          </Tooltip>
        </Grid>
        <Grid item container xs={6} alignItems="flex-end" direction="column">
          <Grid item>
            <Tooltip title="Add" placement="right-start">
              <Button>right-start</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Add" placement="right">
              <Button>right</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Add" placement="right-end">
              <Button>right-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip title="Add" placement="bottom-start">
            <Button>bottom-start</Button>
          </Tooltip>
          <Tooltip title="Add" placement="bottom">
            <Button>bottom</Button>
          </Tooltip>
          <Tooltip title="Add" placement="bottom-end">
            <Button>bottom-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </ComponentContainerCard>
  );
};

const Tooltips = () => {
  return (
    <>
      <PageBreadcrumb title="Tooltips" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <BasicTooltip />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomizedTooltip />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ArrowTooltip />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomTriggerTooltip />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ControlledTooltip />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomWidthTooltip />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TransitionedTooltip />
        </Grid>

        <Grid item xs={12} lg={6}>
          <FollowCursor />
        </Grid>

        <Grid item xs={12} lg={6}>
          <VirtualElementTooltip />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ShowingAndHidingDelayTooltip />
        </Grid>

        <Grid item xs={12} xl={6}>
          <PositionedTooltip />
        </Grid>
      </Grid>
    </>
  );
};

export default Tooltips;
