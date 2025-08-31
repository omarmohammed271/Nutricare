import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  PaperProps,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Slide,
  Switch,
  TextField,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { blue } from "@mui/material/colors";
import { LuPlus, LuUser2, LuX } from "react-icons/lu";
import { useToggle } from "@src/hooks";
import Draggable from "react-draggable";

const AlertDialog = () => {
  const { isOpen, hide, show } = useToggle();
  return (
    <ComponentContainerCard
      title="Alert"
      description="Dialogs can be used to prompt the user to confirm an action or to display a message to the user. "
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <Button variant="outlined" onClick={show}>
        Open alert dialog
      </Button>
      <Dialog
        open={isOpen}
        onClose={hide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hide} color="secondary">
            Disagree
          </Button>
          <Button onClick={hide} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </ComponentContainerCard>
  );
};

const TransitionedDialog = () => {
  const { isOpen, hide, show } = useToggle();

  return (
    <ComponentContainerCard
      title="Transition"
      description="You can also swap out the transition, the next example uses Slide."
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <Button variant="outlined" onClick={show}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={isOpen}
        TransitionComponent={Slide}
        keepMounted
        onClose={hide}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hide} color="secondary">
            Disagree
          </Button>
          <Button onClick={hide} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </ComponentContainerCard>
  );
};

const FormDialog = () => {
  const { isOpen, hide, show } = useToggle();

  return (
    <ComponentContainerCard
      title="Form"
      description="Form dialogs allow users to fill out form fields within a dialog."
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <Button variant="outlined" onClick={show}>
        Open form dialog
      </Button>
      <Dialog open={isOpen} onClose={hide}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hide} color="secondary">
            Cancel
          </Button>
          <Button onClick={hide} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </ComponentContainerCard>
  );
};

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialog = () => {
  const { isOpen, hide, show } = useToggle();

  return (
    <ComponentContainerCard
      title="Customized"
      description="Customized and also has a close button added to aid usability."
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <Button variant="outlined" onClick={show}>
        Open dialog
      </Button>
      <BootstrapDialog onClose={hide} aria-labelledby="customized-dialog-title" open={isOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={hide}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <LuX />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={hide} autoFocus>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ComponentContainerCard>
  );
};

const FullScreenDialog = () => {
  const { isOpen, hide, show } = useToggle();

  return (
    <ComponentContainerCard
      title="Full Screen"
      description="A Full Screen Dialog example which covers the whole screen"
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <Button variant="outlined" onClick={show}>
        Open full-screen dialog
      </Button>
      <Dialog fullScreen open={isOpen} onClose={hide} TransitionComponent={Slide}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={hide} aria-label="close">
              <LuX />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button color="success" onClick={hide} autoFocus>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
    </ComponentContainerCard>
  );
};

const MaxWidthDialog = () => {
  const { isOpen, hide, show } = useToggle();
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  };

  return (
    <ComponentContainerCard
      title="Max Width"
      description='You can set a dialog maximum width by using the "maxWidth" and "fullWidth" properties'
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <Button variant="outlined" onClick={show}>
        Open max-width dialog
      </Button>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={isOpen} onClose={hide}>
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>You can set my maximum width and whether to adapt or not.</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}>
                <MenuItem value={false as any}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={<Switch checked={fullWidth} onChange={handleFullWidthChange} />}
              label="Full width"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={hide}>Close</Button>
        </DialogActions>
      </Dialog>
    </ComponentContainerCard>
  );
};

const ResponsiveFullScreenDialog = () => {
  const { isOpen, hide, show } = useToggle();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <ComponentContainerCard
      title="Responsive Full Screen"
      description="Responsive Full Screen Dialog example which covers the whole screen in small screens"
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <Button variant="outlined" onClick={show}>
        Open responsive dialog
      </Button>
      <Dialog fullScreen={fullScreen} open={isOpen} onClose={hide} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hide} color="secondary" autoFocus>
            Disagree
          </Button>
          <Button onClick={hide} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </ComponentContainerCard>
  );
};

const DraggableDialog = () => {
  const { isOpen, hide, show } = useToggle();

  const PaperComponent = (props: PaperProps) => {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  };

  return (
    <ComponentContainerCard
      title="Draggable"
      description="You can create a draggable dialog by using react-draggable."
      stackProps={{ justifyContent: "center" }}>
      <Button variant="outlined" onClick={show}>
        Open draggable dialog
      </Button>
      <Dialog open={isOpen} onClose={hide} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={hide}>
            Cancel
          </Button>
          <Button onClick={hide} autoFocus>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </ComponentContainerCard>
  );
};

const BasicDialog = () => {
  const emails = ["username@gmail.com", "user02@gmail.com"];

  const { isOpen, hide, show } = useToggle();

  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    show();
  };

  const handleClose = () => {
    hide();
    setSelectedValue(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    hide();
    setSelectedValue(value);
  };

  return (
    <ComponentContainerCard
      title="Basic"
      description="Simple dialogs can provide additional details or actions about a list item. "
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={() => handleListItemClick(email)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <LuUser2 />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disableGutters>
            <ListItemButton autoFocus onClick={() => handleListItemClick("addAccount")}>
              <ListItemAvatar>
                <Avatar>
                  <LuPlus />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </ComponentContainerCard>
  );
};

const ScrollableDialog = () => {
  const { isOpen, hide, show } = useToggle();

  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    show();
    setScroll(scrollType);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <ComponentContainerCard
      title="Scrollable"
      description="Scrollable dialog can be scrolled with Paper or body"
      stackProps={{ justifyContent: "center" }}>
      <Button onClick={handleClickOpen("paper")}>scroll=paper</Button>
      <Button onClick={handleClickOpen("body")}>scroll=body</Button>
      <Dialog open={isOpen} onClose={hide} scroll={scroll}>
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hide}>Cancel</Button>
          <Button onClick={hide}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </ComponentContainerCard>
  );
};

const ConfirmationDialog = () => {
  const options = [
    "None",
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
    "Oberon",
    "Phobos",
    "Pyxis",
    "Sedna",
    "Titania",
    "Triton",
    "Umbriel",
  ];

  const { isOpen, hide, show } = useToggle();
  const [value, setValue] = useState("Dione");

  const handleClose = (newValue?: string) => {
    hide();

    if (newValue) {
      setValue(newValue);
    }
  };

  type ConfirmationDialogRawProps = {
    id: string;
    keepMounted: boolean;
    value: string;
    open: boolean;
    onClose: (value?: string) => void;
  };

  function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (!open) {
        setValue(valueProp);
      }
    }, [valueProp, open]);

    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };

    const handleCancel = () => {
      onClose();
    };

    const handleOk = () => {
      onClose(value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };

    return (
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other}>
        <DialogTitle>Phone Ringtone</DialogTitle>
        <DialogContent dividers>
          <RadioGroup ref={radioGroupRef} aria-label="ringtone" name="ringtone" value={value} onChange={handleChange}>
            {options.map((option) => (
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <ComponentContainerCard
      title="Confirmation"
      description="Confirmation before closing the dialog"
      stackProps={{ direction: "column", alignItems: "center", gap: 0 }}>
      <List component="div" role="group">
        <ListItem button divider disabled>
          <ListItemText primary="Interruptions" />
        </ListItem>
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={show}>
          <ListItemText primary="Phone ringtone" secondary={value} />
        </ListItem>
        <ListItem button divider disabled>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
        <ConfirmationDialogRaw id="ringtone-menu" keepMounted open={isOpen} onClose={handleClose} value={value} />
      </List>
    </ComponentContainerCard>
  );
};

const Dialogs = () => {
  return (
    <>
      <PageBreadcrumb title="Dialogs" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <AlertDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TransitionedDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <FormDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomizedDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <FullScreenDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <MaxWidthDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ResponsiveFullScreenDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <DraggableDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <BasicDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ScrollableDialog />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ConfirmationDialog />
        </Grid>
      </Grid>
    </>
  );
};

export default Dialogs;
