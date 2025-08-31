import {
  Avatar,
  Box,
  Collapse,
  Fade,
  FormControlLabel,
  Grid,
  Grow,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Slide,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { useState } from "react";

import avatar1 from "@src/assets/images/avatars/avatar1.png";
import { LuChevronDown, LuChevronUp, LuInbox, LuMailOpen, LuSend, LuSendHorizonal, LuStar } from "react-icons/lu";

const ReadMoreCollapse = () => {
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ComponentContainerCard title="Read More" description="Collapse Example in read more previews">
      <Typography component={"span"}>
        Lorem ipsum dolor sit amet consectfetur adipisicing elit. Aut, est quisquam. Fuga dolorum maiores, expedita
        exercitationem culpa fugiat amet optio asperiores, laboriosam inventore qui.
        <Collapse in={open}>
          <Typography component={"span"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia esse sequi aliquam ducimus porro ullam
            tempora dicta enim vitae, quam, laboriosam eligendi optio exercitationem quasi temporibus! Iste officia
            accusamus dolore?
          </Typography>
        </Collapse>
        <Link underline="hover" href="#" onClick={handleChange}>
          {open ? "read less" : "read more"}
        </Link>
      </Typography>
    </ComponentContainerCard>
  );
};

const CollapsibleList = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ComponentContainerCard title="List Items" description="Collapsible menu items">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", mb: "5px" }}
        component="nav"
        aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <LuInbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <LuChevronUp /> : <LuChevronDown />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LuStar />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LuSendHorizonal />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LuMailOpen />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </ComponentContainerCard>
  );
};

const SimpleCollapse = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ComponentContainerCard title="Simple" description="Simple Collapse with Horizontal and Vertical orientation">
      <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show" />
      <Box sx={{ flexDirection: "row", display: "flex", gap: 2 }}>
        <Collapse orientation="horizontal" in={checked}>
          <Avatar src={avatar1} variant="square" sx={{ height: 100, width: 100 }} />
        </Collapse>
        <Collapse in={checked}>
          <Avatar src={avatar1} variant="square" sx={{ height: 100, width: 100 }} />
        </Collapse>
      </Box>
    </ComponentContainerCard>
  );
};

const FadeCollapse = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ComponentContainerCard title="Fade Animation" description="Fade in from transparent to opaque.">
      <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show" />
      <Box sx={{ display: "flex" }}>
        <Fade in={checked}>
          <Avatar src={avatar1} variant="square" sx={{ height: 100, width: 100 }} />
        </Fade>
      </Box>
    </ComponentContainerCard>
  );
};

const GrowCollapse = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ComponentContainerCard title="Grow Animation" description="Grow in from 0% to 100%.">
      <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show" />
      <Box sx={{ display: "flex", gap: 3 }}>
        <Grow in={checked}>
          <Avatar src={avatar1} variant="square" sx={{ height: 100, width: 100 }} />
        </Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow in={checked} style={{ transformOrigin: "0 0 0" }} {...(checked ? { timeout: 1000 } : {})}>
          <Avatar src={avatar1} variant="square" sx={{ height: 100, width: 100 }} />
        </Grow>
      </Box>
    </ComponentContainerCard>
  );
};

const SlideCollapse = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ComponentContainerCard
      title="Slide Animation"
      description="The direction prop controls which edge of the screen the transition starts from.">
      <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show" />
      <Box sx={{ flexDirection: "row", display: "flex", gap: 2 }}>
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Avatar src={avatar1} variant="square" sx={{ height: 100, width: 100 }} />
        </Slide>
        <Slide direction="down" in={checked} mountOnEnter>
          <Avatar src={avatar1} variant="square" sx={{ height: 100, width: 100 }} />
        </Slide>
      </Box>
    </ComponentContainerCard>
  );
};

const Collapses = () => {
  return (
    <>
      <PageBreadcrumb title="Collapses" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ReadMoreCollapse />
        </Grid>

        <Grid item xs={12} md={6}>
          <CollapsibleList />
        </Grid>

        <Grid item xs={12} md={6}>
          <SimpleCollapse />
        </Grid>

        <Grid item xs={12} md={6}>
          <FadeCollapse />
        </Grid>

        <Grid item xs={12} md={6}>
          <GrowCollapse />
        </Grid>

        <Grid item xs={12} md={6}>
          <SlideCollapse />
        </Grid>
      </Grid>
    </>
  );
};

export default Collapses;
