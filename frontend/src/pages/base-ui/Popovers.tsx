import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  Paper,
  Popover,
  PopoverProps,
  PopoverReference,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import useDropdownMenu from "@src/hooks/useDropdownMenu";
import { MouseEvent, useRef, useState } from "react";
import { green } from "@mui/material/colors";

const BasicPopover = () => {
  const { open, anchorEl, handleClick, handleClose } = useDropdownMenu();
  const id = open ? "simple-popover" : undefined;
  return (
    <ComponentContainerCard
      title="Basic"
      description="A Popover can be used to display some content on top of another."
      stackProps={{ justifyContent: "center" }}>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </ComponentContainerCard>
  );
};

const AnchorPlaygroundPopover = () => {
  const inlineStyles = {
    anchorVertical: {
      top: {
        top: -5,
      },
      center: {
        top: "calc(50% - 5px)",
      },
      bottom: {
        bottom: -5,
      },
    },
    anchorHorizontal: {
      left: {
        left: -5,
      },
      center: {
        left: "calc(50% - 5px)",
      },
      right: {
        right: -5,
      },
    },
  };

  type OriginVertical = "top" | "center" | "bottom";
  type OriginHorizontal = "left" | "center" | "right";

  type StateType = {
    open: boolean;
    anchorOriginVertical: OriginVertical;
    anchorOriginHorizontal: OriginHorizontal;
    transformOriginVertical: OriginVertical;
    transformOriginHorizontal: OriginHorizontal;
    positionTop: number;
    positionLeft: number;
    anchorReference: PopoverReference;
  };

  const anchorRef = useRef(null);

  const [state, setState] = useState<StateType>({
    open: false,
    anchorOriginVertical: "top",
    anchorOriginHorizontal: "left",
    transformOriginVertical: "top",
    transformOriginHorizontal: "left",
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: "anchorEl",
  });

  const {
    open,
    anchorOriginVertical,
    anchorOriginHorizontal,
    transformOriginVertical,
    transformOriginHorizontal,
    positionTop,
    positionLeft,
    anchorReference,
  } = state;

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleNumberInputChange = (key: any) => (event: any) => {
    setState({
      ...state,
      [key]: parseInt(event.target.value, 10),
    });
  };

  const handleClickButton = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  let mode = "";

  if (anchorReference === "anchorPosition") {
    mode = `
  anchorReference="${anchorReference}"
  anchorPosition={{ top: ${positionTop}, left: ${positionLeft} }}`;
  }

  const radioAnchorClasses = {
    color: green[600],
    "&.Mui-checked": {
      color: green[500],
    },
  };

  return (
    <ComponentContainerCard
      title="Anchor"
      description="Use the radio buttons to adjust the anchorOrigin and transformOrigin positions">
      <Grid container justifyContent="center">
        <Grid item sx={{ position: "relative", mb: 4 }}>
          <Button ref={anchorRef} variant="contained" onClick={handleClickButton}>
            Open Popover
          </Button>
          {anchorReference === "anchorEl" && (
            <Box
              sx={{
                bgcolor: green[500],
                width: 10,
                height: 10,
                borderRadius: "50%",
                position: "absolute",
              }}
              style={{
                ...inlineStyles.anchorVertical[anchorOriginVertical],
                ...inlineStyles.anchorHorizontal[anchorOriginHorizontal],
              }}
            />
          )}
        </Grid>
      </Grid>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorReference={anchorReference}
        anchorPosition={{
          top: positionTop,
          left: positionLeft,
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}>
        <Typography sx={{ m: 2 }}>The content of the Popover.</Typography>
      </Popover>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">anchorReference</FormLabel>
            <RadioGroup
              row
              aria-label="anchor reference"
              name="anchorReference"
              value={anchorReference}
              onChange={handleChange}>
              <FormControlLabel value="anchorEl" control={<Radio />} label="anchorEl" />
              <FormControlLabel value="anchorPosition" control={<Radio />} label="anchorPosition" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard">
            <InputLabel htmlFor="position-top">anchorPosition.top</InputLabel>
            <Input
              id="position-top"
              type="number"
              value={positionTop}
              onChange={handleNumberInputChange("positionTop")}
            />
          </FormControl>
          &nbsp;
          <FormControl variant="standard">
            <InputLabel htmlFor="position-left">anchorPosition.left</InputLabel>
            <Input
              id="position-left"
              type="number"
              value={positionLeft}
              onChange={handleNumberInputChange("positionLeft")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">anchorOrigin.vertical</FormLabel>
            <RadioGroup
              aria-label="anchor origin vertical"
              name="anchorOriginVertical"
              value={anchorOriginVertical}
              onChange={handleChange}>
              <FormControlLabel value="top" control={<Radio sx={radioAnchorClasses} />} label="Top" />
              <FormControlLabel value="center" control={<Radio sx={radioAnchorClasses} />} label="Center" />
              <FormControlLabel value="bottom" control={<Radio sx={radioAnchorClasses} />} label="Bottom" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">transformOrigin.vertical</FormLabel>
            <RadioGroup
              aria-label="transform origin vertical"
              name="transformOriginVertical"
              value={transformOriginVertical}
              onChange={handleChange}>
              <FormControlLabel value="top" control={<Radio />} label="Top" />
              <FormControlLabel value="center" control={<Radio color="primary" />} label="Center" />
              <FormControlLabel value="bottom" control={<Radio color="primary" />} label="Bottom" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">anchorOrigin.horizontal</FormLabel>
            <RadioGroup
              row
              aria-label="anchor origin horizontal"
              name="anchorOriginHorizontal"
              value={anchorOriginHorizontal}
              onChange={handleChange}>
              <FormControlLabel value="left" control={<Radio sx={radioAnchorClasses} />} label="Left" />
              <FormControlLabel value="center" control={<Radio sx={radioAnchorClasses} />} label="Center" />
              <FormControlLabel value="right" control={<Radio sx={radioAnchorClasses} />} label="Right" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">transformOrigin.horizontal</FormLabel>
            <RadioGroup
              row
              aria-label="transform origin horizontal"
              name="transformOriginHorizontal"
              value={transformOriginHorizontal}
              onChange={handleChange}>
              <FormControlLabel value="left" control={<Radio color="primary" />} label="Left" />
              <FormControlLabel value="center" control={<Radio color="primary" />} label="Center" />
              <FormControlLabel value="right" control={<Radio color="primary" />} label="Right" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </ComponentContainerCard>
  );
};

const HoverPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ComponentContainerCard
      title="Hoverable"
      description="Trigger on Hover Popover"
      stackProps={{ justifyContent: "center" }}>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
        Hover with a Popover.
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Typography sx={{ p: 1 }}>I use Popover.</Typography>
      </Popover>
    </ComponentContainerCard>
  );
};

const VertialElementPopover = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<PopoverProps["anchorEl"]>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();

    // Skip if selection has a length of 0
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      return;
    }

    const getBoundingClientRect = () => {
      return selection.getRangeAt(0).getBoundingClientRect();
    };

    setOpen(true);

    setAnchorEl({ getBoundingClientRect, nodeType: 1 });
  };

  const id = open ? "virtual-element-popover" : undefined;

  return (
    <ComponentContainerCard
      title="Virtual element"
      description="The value of the anchorEl prop can be a reference to a fake DOM element. ">
      <Typography aria-describedby={id} onMouseUp={handleMouseUp}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit amet vulputate eget,
        porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed dolor
        porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis vehicula ante, eu finibus est. Proin
        ullamcorper fermentum orci, quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex,
        sit amet facilisis neque enim sed neque. Quisque accumsan metus vel maximus
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleClose}>
        <Paper>
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Paper>
      </Popover>
    </ComponentContainerCard>
  );
};

const Popovers = () => {
  return (
    <>
      <PageBreadcrumb title="Popover" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item container lg={6} spacing={3}>
          <Grid item xs={12}>
            <BasicPopover />
          </Grid>

          <Grid item xs={12}>
            <HoverPopover />
          </Grid>

          <Grid item xs={12}>
            <VertialElementPopover />
          </Grid>
        </Grid>

        <Grid item xs={12} lg={6}>
          <AnchorPlaygroundPopover />
        </Grid>
      </Grid>
    </>
  );
};

export default Popovers;
