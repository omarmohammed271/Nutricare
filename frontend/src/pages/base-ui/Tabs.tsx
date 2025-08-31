import { AppBar, Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { useTabsChange } from "@src/hooks";
import { ReactNode, SyntheticEvent, useState } from "react";
import { LuContact2, LuHeart, LuPhone, LuPhoneMissed } from "react-icons/lu";

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const BasicTabs = () => {
  const { value, handleChange } = useTabsChange();

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <ComponentContainerCard
      title="Basic"
      description="A basic example with tab panels."
      stackProps={{ direction: "column", alignItems: "center" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </ComponentContainerCard>
  );
};

const WrappedLabels = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Wrapped Labels"
      description="Long labels will automatically wrap on tabs. "
      stackProps={{ direction: "column", alignItems: "center" }}>
      <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
        <Tab
          value={1}
          label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
          wrapped
        />
        <Tab value={2} label="Item Two" />
        <Tab value={3} label="Item Three" />
      </Tabs>
      <CustomTabPanel value={value} index={1}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
    </ComponentContainerCard>
  );
};

const ColoredTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Colored"
      description="You can pass textColor or indicatorColor for colored tab"
      stackProps={{ direction: "column" }}>
      <Box sx={{ display: "flex" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary tabs example">
          <Tab value={1} label="Item One" />
          <Tab value={2} label="Item Two" />
          <Tab value={3} label="Item Three" />
        </Tabs>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example">
          <Tab value={1} label="Item One" />
          <Tab value={2} label="Item Two" />
          <Tab value={3} label="Item Three" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={1}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
    </ComponentContainerCard>
  );
};

const DisabledTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Disabled"
      description="A tab can be disabled by setting the disabled prop."
      stackProps={{ direction: "column" }}>
      <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
        <Tab value={1} label="Active" />
        <Tab value={2} label="Disabled" disabled />
        <Tab value={3} label="Active" />
      </Tabs>
      <CustomTabPanel value={value} index={1}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
    </ComponentContainerCard>
  );
};

const CenteredTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Centered"
      description="Tabs can be centered by setting the centered prop."
      stackProps={{ direction: "column" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value={1} label="Item One" />
        <Tab value={2} label="Item Two" />
        <Tab value={3} label="Item Three" />
      </Tabs>
    </ComponentContainerCard>
  );
};

const ScrollableTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Scrollable and Automatic scroll buttons"
      description="By default, left and right scroll buttons are automatically presented on desktop and hidden on mobile. "
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </Box>
    </ComponentContainerCard>
  );
};

const ForcedScrollButtonsTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Forced scroll buttons"
      description='Forced Scroll Buttons can be triggered with "scrollButtons={true}" "allowScrollButtonsMobile"'
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </Box>
    </ComponentContainerCard>
  );
};

const PreventScrollButtonsTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Prevent scroll buttons"
      description='Left and right scroll buttons are never be presented with "scrollButtons={false}"'
      stackProps={{ justifyContent: "center", display: "flex" }}>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </Box>
    </ComponentContainerCard>
  );
};

const IconTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Icon"
      description="Icon tabs can be used to display icons instead of text."
      stackProps={{ justifyContent: "center" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<LuPhone size={20} />} aria-label="phone" />
        <Tab icon={<LuHeart size={20} />} aria-label="favorite" />
        <Tab icon={<LuContact2 size={20} />} aria-label="person" />
      </Tabs>
    </ComponentContainerCard>
  );
};

const IconLabelTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Icon with Labels"
      description="Icon with Labels can be used instead of just text"
      stackProps={{ justifyContent: "center" }}>
      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
        <Tab icon={<LuPhone size={20} />} label="RECENTS" />
        <Tab icon={<LuHeart size={20} />} label="FAVORITES" />
        <Tab icon={<LuContact2 size={20} />} label="NEARBY" />
      </Tabs>
    </ComponentContainerCard>
  );
};

const IconPositionWithLabelTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Icon position"
      description="By default, the icon is positioned at the top of a tab. Other supported positions are start, end, bottom"
      stackProps={{ justifyContent: "center" }}>
      <Tabs value={value} onChange={handleChange} aria-label="icon position tabs example">
        <Tab icon={<LuPhone size={20} />} label="Top" />
        <Tab icon={<LuPhoneMissed size={20} />} iconPosition="start" label="Start" />
        <Tab icon={<LuHeart size={20} />} iconPosition="end" label="End" />
        <Tab icon={<LuContact2 size={20} />} iconPosition="bottom" label="Bottom" />
      </Tabs>
    </ComponentContainerCard>
  );
};

const FullWidthSwipableTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <ComponentContainerCard title="Full Width" description="Full Width and Touch Screen Swipable">
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </ComponentContainerCard>
  );
};

const VerticalTabs = () => {
  const { value, handleChange } = useTabsChange();

  return (
    <ComponentContainerCard
      title="Vertical Alignment"
      description="To make vertical tabs instead of default horizontal ones, there is &quot;orientation='vertical&quot;'">
      <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 224 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Item Four
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Item Five
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          Item Six
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          Item Seven
        </CustomTabPanel>
      </Box>
    </ComponentContainerCard>
  );
};

const TabsPage = () => {
  return (
    <>
      <PageBreadcrumb title="Tabs" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <BasicTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <WrappedLabels />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ColoredTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <DisabledTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CenteredTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ScrollableTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ForcedScrollButtonsTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <PreventScrollButtonsTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <IconTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <IconLabelTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <IconPositionWithLabelTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <FullWidthSwipableTabs />
        </Grid>

        <Grid item xs={12} lg={6}>
          <VerticalTabs />
        </Grid>
      </Grid>
    </>
  );
};

export default TabsPage;
