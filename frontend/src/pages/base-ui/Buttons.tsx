/*
 * Copyright (c) 2023.
 * File Name: Buttons.tsx
 * Author: Coderthemes
 */

import { Box, Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  LuTrash2,
  LuBoxes,
  LuCastle,
  LuHeart,
  LuKeyboard,
  LuMusic2,
  LuShieldCheck,
  LuThumbsUp,
  LuSave,
  LuSendHorizonal,
} from "react-icons/lu";
import { MdRestore } from "react-icons/md";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

const ContainedButtons = () => {
  return (
    <ComponentContainerCard title="Contained" description="Default Contained Buttons">
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
      <Button variant="contained" color="warning">
        Warning
      </Button>
      <Button variant="contained" color="info">
        Info
      </Button>
      <Button variant="contained" color="inherit">
        Inherit
      </Button>
    </ComponentContainerCard>
  );
};

const OutlineButtons = () => {
  return (
    <ComponentContainerCard title="Outlined" description="Buttons with Outline">
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>
      <Button variant="outlined" color="warning">
        Warning
      </Button>
      <Button variant="outlined" color="info">
        Info
      </Button>
      <Button variant="outlined" color="inherit">
        Inherit
      </Button>
    </ComponentContainerCard>
  );
};

const TextButtons = () => {
  return (
    <ComponentContainerCard title="Text" description="Text Button which is commonly used as links">
      <Button variant="text" color="primary">
        Primary
      </Button>
      <Button variant="text" color="secondary">
        Secondary
      </Button>
      <Button variant="text" color="success">
        Success
      </Button>
      <Button variant="text" color="error">
        Error
      </Button>
      <Button variant="text" color="warning">
        Warning
      </Button>
      <Button variant="text" color="info">
        Info
      </Button>
      <Button variant="text" color="inherit">
        Inherit
      </Button>
    </ComponentContainerCard>
  );
};

const ElevationDisabledButtons = () => {
  return (
    <ComponentContainerCard title="Elevation Disabled" description="Buttons without elevation (shadow)">
      <Button variant="contained" color="primary" disableElevation>
        Primary
      </Button>
      <Button variant="contained" color="secondary" disableElevation>
        Secondary
      </Button>
      <Button variant="contained" color="success" disableElevation>
        Success
      </Button>
      <Button variant="contained" color="error" disableElevation>
        Error
      </Button>
      <Button variant="contained" color="warning" disableElevation>
        Warning
      </Button>
      <Button variant="contained" color="info" disableElevation>
        Info
      </Button>
      <Button variant="contained" color="inherit" disableElevation>
        Inherit
      </Button>
    </ComponentContainerCard>
  );
};

const SizeVariants = () => {
  return (
    <ComponentContainerCard title="Size Variants" description="Buttons with different sizes">
      <Box sx={{ "& button": { mr: 1 } }}>
        <Button variant="contained" color="primary" size="small">
          Small
        </Button>
        <Button variant="contained" color="secondary" size="medium">
          Medium
        </Button>
        <Button variant="contained" color="success" size="large">
          Large
        </Button>
      </Box>
    </ComponentContainerCard>
  );
};

const IconsNLabels = () => {
  return (
    <ComponentContainerCard title="Buttons with icons and label" description="Buttons with different sizes">
      <Button variant="text" color="success" startIcon={<MdRestore />}>
        Restore
      </Button>
      <Button variant="outlined" color="error" startIcon={<LuTrash2 />}>
        Delete
      </Button>
      <Button variant="contained" color="primary" endIcon={<LuSendHorizonal />}>
        Send
      </Button>
    </ComponentContainerCard>
  );
};

const IconButtons = () => {
  return (
    <ComponentContainerCard title="Icon" description="Buttons with Icons only">
      <IconButton color="primary">
        <LuHeart />
      </IconButton>
      <IconButton color="primary">
        <LuBoxes />
      </IconButton>
      <IconButton color="primary">
        <LuMusic2 />
      </IconButton>
      <IconButton color="primary">
        <LuShieldCheck />
      </IconButton>
      <IconButton color="primary">
        <LuThumbsUp />
      </IconButton>
      <IconButton color="primary">
        <LuKeyboard />
      </IconButton>
      <IconButton color="primary">
        <LuCastle />
      </IconButton>
    </ComponentContainerCard>
  );
};

const IconColorVariants = () => {
  return (
    <ComponentContainerCard title="Colored Icon" description="Icon button With Theme variants">
      <IconButton color="primary">
        <LuHeart />
      </IconButton>
      <IconButton color="secondary">
        <LuBoxes />
      </IconButton>
      <IconButton color="success">
        <LuMusic2 />
      </IconButton>
      <IconButton color="error">
        <LuShieldCheck />
      </IconButton>
      <IconButton color="warning">
        <LuThumbsUp />
      </IconButton>
      <IconButton color="info">
        <LuKeyboard />
      </IconButton>
      <IconButton color="inherit">
        <LuCastle />
      </IconButton>
    </ComponentContainerCard>
  );
};

const GroupedButtonVariants = () => {
  return (
    <ComponentContainerCard
      title="Grouped Button Variants"
      description="All the standard button variants are supported.">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          "& > *": {
            m: 1,
          },
        }}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" aria-label="outlined button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Box>
    </ComponentContainerCard>
  );
};

const GroupedSizesNColors = () => {
  return (
    <ComponentContainerCard
      title="Grouped Buttons with Sizes and colors"
      description="The size and color props can be used to control the appearance of the button group.">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          "& > *": {
            m: 1,
          },
        }}>
        <ButtonGroup size="small" aria-label="small button group">
          <Button key="one">One</Button>
          <Button key="two">Two</Button>
          <Button key="three">Three</Button>
        </ButtonGroup>
        <ButtonGroup color="secondary" aria-label="medium secondary button group">
          <Button key="one">One</Button>
          <Button key="two">Two</Button>
          <Button key="three">Three</Button>
        </ButtonGroup>
        <ButtonGroup size="large" aria-label="large button group">
          <Button key="one">One</Button>
          <Button key="two">Two</Button>
          <Button key="three">Three</Button>
        </ButtonGroup>
      </Box>
    </ComponentContainerCard>
  );
};

const VerticalGroupedButtons = () => {
  return (
    <ComponentContainerCard title="Vertical Grouped" description="Vertical Grouped Buttons with variants ">
      <Box
        sx={{
          display: "flex",
          mx: "auto",
          "& > *": {
            m: 1,
          },
        }}>
        <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
          <Button key="one">One</Button>
          <Button key="two">Two</Button>
          <Button key="three">Three</Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="contained">
          <Button key="one">One</Button>
          <Button key="two">Two</Button>
          <Button key="three">Three</Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="text">
          <Button key="one">One</Button>
          <Button key="two">Two</Button>
          <Button key="three">Three</Button>
        </ButtonGroup>
      </Box>
    </ComponentContainerCard>
  );
};

const BlockSizeButtons = () => {
  return (
    <ComponentContainerCard title="Block Size" description="Full Width Buttons" stackProps={{ spacing: 1 }}>
      <Button variant="contained" color="primary" size="small" fullWidth>
        Small
      </Button>
      <Button variant="contained" color="secondary" size="medium" fullWidth>
        Medium
      </Button>
      <Button variant="contained" color="success" size="large" fullWidth>
        Large
      </Button>
    </ComponentContainerCard>
  );
};

const LoadingButtons = () => {
  return (
    <ComponentContainerCard title="Loading State" description="Loading state buttons with Circular Progress">
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
        Fetch data
      </LoadingButton>
      <LoadingButton loading loadingPosition="start" startIcon={<LuSave />} variant="outlined">
        Sending...
      </LoadingButton>
    </ComponentContainerCard>
  );
};

const Buttons = () => {
  return (
    <>
      <PageBreadcrumb title="Buttons" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item md={6}>
          <ContainedButtons />
        </Grid>

        <Grid item md={6}>
          <OutlineButtons />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextButtons />
        </Grid>

        <Grid item md={6}>
          <ElevationDisabledButtons />
        </Grid>

        <Grid item md={6} xs={12}>
          <SizeVariants />
        </Grid>

        <Grid item md={6} xs={12}>
          <IconsNLabels />
        </Grid>

        <Grid item md={6} xs={12}>
          <IconButtons />
        </Grid>

        <Grid item md={6} xs={12}>
          <IconColorVariants />
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <GroupedButtonVariants />
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <GroupedSizesNColors />
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <VerticalGroupedButtons />
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <BlockSizeButtons />
        </Grid>

        <Grid item md={6} xs={12}>
          <LoadingButtons />
        </Grid>
      </Grid>
    </>
  );
};

export default Buttons;
