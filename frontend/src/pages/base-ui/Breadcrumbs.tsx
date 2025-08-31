import { Grid, Typography, Breadcrumbs as Breadcrumb, Link } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";
import { LuChevronRight, LuFlame, LuGrip, LuHome } from "react-icons/lu";

const SimpleBreadcrumb = () => {
  return (
    <ComponentContainerCard
      title="Simple Breadcrumb"
      description="A breadcrumbs is a list of links that help visualize a page's location within a site's hierarchical structure, it allows navigation up to any of the ancestors.">
      <Breadcrumb aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Attex
        </Link>
        <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
          Base UI
        </Link>
        <Typography color="HighlightText">Breadcrumbs</Typography>
      </Breadcrumb>
    </ComponentContainerCard>
  );
};

const CustomSeparator = () => {
  const items = [
    <Link underline="hover" key="1" color="inherit" href="">
      Attex
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="">
      Base UI
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumbs
    </Typography>,
  ];

  return (
    <ComponentContainerCard
      title="Custom Separator"
      description="In the following examples, we are using two string separators and an SVG icon."
      stackProps={{ direction: "column" }}>
      <Breadcrumb separator="›" aria-label="breadcrumb">
        {items}
      </Breadcrumb>
      <Breadcrumb separator="-" aria-label="breadcrumb">
        {items}
      </Breadcrumb>
      <Breadcrumb separator={<LuChevronRight />} aria-label="breadcrumb">
        {items}
      </Breadcrumb>
    </ComponentContainerCard>
  );
};

const BreadcrumbWithIcons = () => {
  return (
    <ComponentContainerCard title="Breadcrumb with Icon" description="Breadcrumb with Icons and Labels">
      <Breadcrumb aria-label="breadcrumb">
        <Link underline="hover" sx={{ display: "flex", alignItems: "center", gap: 1 }} color="inherit" href="">
          <LuHome />
          MUI
        </Link>
        <Link underline="hover" sx={{ display: "flex", alignItems: "center", gap: 1 }} color="inherit" href="">
          <LuFlame />
          Core
        </Link>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }} color="text.primary">
          <LuGrip />
          Breadcrumb
        </Typography>
      </Breadcrumb>
    </ComponentContainerCard>
  );
};

const CollapsedBreadcrumb = () => {
  return (
    <ComponentContainerCard
      title="Collapsed Breadcrumb"
      description="Collapseible Breadcrumb, which collapse once it reaches it's max items limit">
      <Breadcrumb itemsBeforeCollapse={1} itemsAfterCollapse={2} maxItems={3} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="">
          Attex
        </Link>
        <Link underline="hover" color="inherit" href="">
          UI
        </Link>
        <Link underline="hover" color="inherit" href="">
          Base UI
        </Link>
        <Link underline="hover" color="inherit" href="">
          Breadcrumbs
        </Link>
        <Typography color="HighlightText">Breadcrumb Items</Typography>
      </Breadcrumb>
    </ComponentContainerCard>
  );
};

const Breadcrumbs = () => {
  return (
    <>
      <PageBreadcrumb title="Breadcrumbs" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <SimpleBreadcrumb />
        </Grid>

        <Grid item md={6} xs={12}>
          <CustomSeparator />
        </Grid>

        <Grid item md={6} xs={12}>
          <BreadcrumbWithIcons />
        </Grid>

        <Grid item md={6} xs={12}>
          <CollapsedBreadcrumb />
        </Grid>
      </Grid>
    </>
  );
};

export default Breadcrumbs;
