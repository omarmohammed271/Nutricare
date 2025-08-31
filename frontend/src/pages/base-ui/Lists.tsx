import {
  Avatar,
  Box,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Switch,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { ElementType, Fragment, ReactElement, cloneElement, useState } from "react";
import {
  LuArchiveRestore,
  LuBackpack,
  LuBluetooth,
  LuChevronDown,
  LuChevronUp,
  LuFolder,
  LuFolderClosed,
  LuFolderOpen,
  LuGlobe2,
  LuHome,
  LuImage,
  LuInbox,
  LuMailOpen,
  LuMessageSquare,
  LuPalmtree,
  LuPlay,
  LuSendHorizonal,
  LuServer,
  LuSettings,
  LuStar,
  LuTrash,
  LuUsers,
  LuWifi,
} from "react-icons/lu";

import avatar1 from "@src/assets/images/avatars/avatar1.png";
import avatar2 from "@src/assets/images/avatars/avatar2.png";
import avatar3 from "@src/assets/images/avatars/avatar3.png";
import avatar4 from "@src/assets/images/avatars/avatar4.png";

import { useListSelectItem } from "@src/hooks";

const BasicList = () => {
  return (
    <ComponentContainerCard title="Basic" description="Lists are a continuous group of text or images.">
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "grey.50" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LuInbox size={20} />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LuMailOpen size={20} />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </ComponentContainerCard>
  );
};

const NestedList = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ComponentContainerCard
      title="Nested List"
      description="Nested lists have their own children, which hides and shows with help of Collapse component">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "grey.50" }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <ListItemButton>
          <ListItemIcon>
            <LuSendHorizonal size={20} />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LuMailOpen size={20} />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <LuArchiveRestore size={20} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <LuChevronUp /> : <LuChevronDown />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LuStar size={20} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </ComponentContainerCard>
  );
};

const FolderList = () => {
  return (
    <ComponentContainerCard title="Folders" description="Folders list">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "grey.50" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LuImage />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LuBackpack />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LuPalmtree />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </ComponentContainerCard>
  );
};

const InteractiveList = () => {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  function generate(element: ReactElement) {
    return [0, 1, 2].map((value) =>
      cloneElement(element, {
        key: value,
      }),
    );
  }

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <ComponentContainerCard title="Interactive" description="Interactive list, for displaying how it can be modified">
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />}
            label="Enable dense"
          />
          <FormControlLabel
            control={<Checkbox checked={secondary} onChange={(event) => setSecondary(event.target.checked)} />}
            label="Enable secondary text"
          />
        </FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Text only
            </Typography>
            <Demo>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemText primary="Single-line item" secondary={secondary ? "Secondary text" : null} />
                  </ListItem>,
                )}
              </List>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Icon with text
            </Typography>
            <Demo>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemIcon>
                      <LuFolderOpen size={22} />
                    </ListItemIcon>
                    <ListItemText primary="Single-line item" secondary={secondary ? "Secondary text" : null} />
                  </ListItem>,
                )}
              </List>
            </Demo>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Avatar with text
            </Typography>
            <Demo>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LuFolderClosed />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" secondary={secondary ? "Secondary text" : null} />
                  </ListItem>,
                )}
              </List>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Avatar with text and icon
            </Typography>
            <Demo>
              <List dense={dense}>
                {generate(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <LuTrash size={22} />
                      </IconButton>
                    }>
                    <ListItemAvatar>
                      <Avatar>
                        <LuFolder />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" secondary={secondary ? "Secondary text" : null} />
                  </ListItem>,
                )}
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </ComponentContainerCard>
  );
};

const SelectedList = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <ComponentContainerCard title="Active Item" description="Active Item selector, which highlights the selected item">
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper#fbfbfb" }}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemIcon>
              <LuInbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon>
              <LuMailOpen />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemText primary="Trash" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
            <ListItemText primary="Spam" />
          </ListItemButton>
        </List>
      </Box>
    </ComponentContainerCard>
  );
};

const AllignedListItems = () => {
  return (
    <ComponentContainerCard
      title="Aligned Avatar"
      description="When displaying three lines or more, the avatar is not aligned at the top. You should set the alignItems=' flex-start' prop to align the avatar at the top, following the Material Design guideline">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "grey.50" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={avatar1} />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src={avatar2} />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src={avatar4} />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </Fragment>
            }
          />
        </ListItem>
      </List>
    </ComponentContainerCard>
  );
};

const CheckboxAsPrimaryList = () => {
  const { checked, handleToggle } = useListSelectItem();

  return (
    <ComponentContainerCard
      title="Primary Action Checkbox"
      description="The checkbox is the primary action for the list item and a separate target.">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end">
                  <LuMessageSquare />
                </IconButton>
              }
              disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </ComponentContainerCard>
  );
};

const CheckboxAsSecondaryList = () => {
  const { checked, handleToggle } = useListSelectItem();

  return (
    <ComponentContainerCard
      title="Secondary Action Checkbox"
      description="The checkbox is the secondary action for the list item and a separate target.">
      <List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {[avatar1, avatar2, avatar3, avatar4].map((value, idx) => {
          const labelId = `checkbox-list-secondary-label-${idx}`;
          return (
            <ListItem
              key={idx}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(idx)}
                  checked={checked.indexOf(idx) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={`Avatar n°${idx + 1}`} src={value} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${idx + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </ComponentContainerCard>
  );
};

const SwitchAsSecondaryList = () => {
  const [checked, setChecked] = useState(["wifi"]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <ComponentContainerCard
      title="Secondary Action Switch"
      description="The Switch is the secondary action for the list item and a separate target.">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <LuWifi />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
          <Switch
            edge="end"
            onChange={handleToggle("wifi")}
            checked={checked.indexOf("wifi") !== -1}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LuBluetooth />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <Switch
            edge="end"
            onChange={handleToggle("bluetooth")}
            checked={checked.indexOf("bluetooth") !== -1}
            inputProps={{
              "aria-labelledby": "switch-list-label-bluetooth",
            }}
          />
        </ListItem>
      </List>
    </ComponentContainerCard>
  );
};

const StickySubheaderList = () => {
  return (
    <ComponentContainerCard
      title="Sticky Subheader"
      description="The subheaders from the header sticks on top of the list as you scroll down">
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}>
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
              {[0, 1, 2].map((item) => (
                <ListItem key={`item-${sectionId}-${item}`}>
                  <ListItemText primary={`Item ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </ComponentContainerCard>
  );
};

const CustomizedList = () => {
  const [open, setOpen] = useState(true);

  const FireNav = styled(List)<{ component?: ElementType }>({
    "& .MuiListItemButton-root": {
      paddingLeft: 24,
      paddingRight: 24,
    },
    "& .MuiListItemIcon-root": {
      minWidth: 0,
      marginRight: 16,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 20,
    },
  });

  const data = [
    { icon: <LuUsers />, label: "Authentication" },
    { icon: <LuServer />, label: "Database" },
    { icon: <LuImage />, label: "Storage" },
    { icon: <LuGlobe2 />, label: "Hosting" },
  ];

  return (
    <ComponentContainerCard title="Customized Example" description="Here's a custom designed List example">
      <Box sx={{ display: "flex" }}>
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: true,
                },
              },
            },
            palette: {
              mode: "dark",
              primary: { main: "rgb(102, 157, 246)" },

              background: { paper: "rgb(5, 30, 52)" },
            },
          })}>
          <Paper elevation={0} sx={{ maxWidth: 256 }}>
            <FireNav component="nav" disablePadding>
              <ListItemButton component="a" href="#customized-list">
                <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                <ListItemText
                  sx={{ my: 0 }}
                  primary="Firebash"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              </ListItemButton>
              <Divider />
              <ListItem component="div" disablePadding>
                <ListItemButton sx={{ height: 56 }}>
                  <ListItemIcon>
                    <LuHome color="#669df6" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project Overview"
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "medium",
                      variant: "body2",
                    }}
                  />
                </ListItemButton>
                <Tooltip title="Project Settings">
                  <IconButton
                    size="medium"
                    sx={{
                      "& svg": {
                        color: "rgba(255,255,255,0.8)",
                        transition: "0.2s",
                        transform: "translateX(0) rotate(0)",
                      },
                      "& svg:last-of-type": {
                        position: "absolute",
                        right: "4px",
                        opacity: 0,
                      },
                      "&:hover, &:focus": {
                        bgcolor: "unset",
                        "& svg:first-of-type": {
                          transform: "translateX(-4px) rotate(-20deg)",
                        },
                        "& svg:last-of-type": {
                          right: 0,
                          opacity: 1,
                        },
                      },
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        height: "80%",
                        display: "block",
                        left: 0,
                        width: "1px",
                        bgcolor: "divider",
                      },
                    }}>
                    <LuSettings size={20} />
                    <LuPlay size={12} />
                  </IconButton>
                </Tooltip>
              </ListItem>
              <Divider />
              <Box
                sx={{
                  bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                  pb: open ? 2 : 0,
                }}>
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    "&:hover, &:focus": {
                      "& svg": {
                        opacity: open ? 1 : 0,
                      },
                    },
                  }}>
                  <ListItemText
                    primary="Build"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                    }}
                    sx={{ my: 0 }}
                  />
                  <LuChevronDown
                    style={{
                      marginRight: -1,
                      transform: open ? "rotate(-180deg)" : "rotate(0)",
                      width: "50px",
                      transition: "0.2s",
                    }}
                  />
                </ListItemButton>
                {open &&
                  data.map((item) => (
                    <ListItemButton key={item.label} sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}>
                      <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
                      />
                    </ListItemButton>
                  ))}
              </Box>
            </FireNav>
          </Paper>
        </ThemeProvider>
      </Box>
    </ComponentContainerCard>
  );
};

const Lists = () => {
  return (
    <>
      <PageBreadcrumb title="Lists" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <BasicList />
        </Grid>

        <Grid item xs={12} lg={6}>
          <NestedList />
        </Grid>

        <Grid item xs={12} lg={6}>
          <FolderList />
        </Grid>

        <Grid item xs={12} lg={6}>
          <SelectedList />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CheckboxAsPrimaryList />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CheckboxAsSecondaryList />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CustomizedList />
        </Grid>

        <Grid item xs={12} lg={6}>
          <AllignedListItems />
        </Grid>

        <Grid item xs={12} lg={6}>
          <InteractiveList />
        </Grid>

        <Grid item container lg={6} spacing={3}>
          <Grid item xs={12} lg={6}>
            <SwitchAsSecondaryList />
          </Grid>

          <Grid item xs={12} lg={6}>
            <StickySubheaderList />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Lists;
