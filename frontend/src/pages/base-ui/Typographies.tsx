import { Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

const theme1 = createTheme({
  typography: {
    h6: {
      textDecoration: "line-through",
      letterSpacing: "2px",
      color: "#ff6b3d",
    },
  },
});

const TypographyVariants = () => {
  return (
    <ComponentContainerCard
      title="Component"
      description="The Typography component makes it easy to apply a default set of font weights and sizes in your application."
      stackProps={{ direction: "column" }}>
      <Typography variant="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
        beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
        beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
    </ComponentContainerCard>
  );
};

const ColoredTypography = () => {
  return (
    <ComponentContainerCard title="Colored" description="Colored Typography">
      <Typography variant="h3" color={"primary.main"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"secondary.main"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"success.main"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"error.main"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"warning.main"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"info.main"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
    </ComponentContainerCard>
  );
};

const ColoredOpacityTypography = () => {
  return (
    <ComponentContainerCard title="Colored" description="Colored Opacity">
      <Typography variant="h3" color={"primary.lighter"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"primary.light"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"primary.main"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"primary.dark"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"primary.darker"}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
    </ComponentContainerCard>
  );
};

const TextDecoratedTypography = () => {
  return (
    <ComponentContainerCard title="Text Decorated" description="Text Decorated Typography">
      {/* You can use createTheme from @mui/material styles to create a theme*/}
      <ThemeProvider theme={theme1}>
        <Typography variant="h6">The quick brown fox jumps over the lazy dog.</Typography>
        <Typography variant="h6" sx={{ textDecorationColor: "#26c362" }}>
          The quick brown fox jumps over the lazy dog.
        </Typography>
      </ThemeProvider>

      <Typography variant="h3" color={"primary.main"} sx={{ textDecoration: "underline" }}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"primary.main"} sx={{ textDecoration: "underline dotted" }}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"primary.main"} sx={{ textDecoration: "underline wavy" }}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="h3" color={"primary.main"} sx={{ textDecoration: "underline overline" }}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography
        variant="h3"
        color={"primary.main"}
        sx={{ textDecoration: "underline", textDecorationThickness: "5px" }}>
        The quick brown fox jumps over the lazy dog.
      </Typography>
    </ComponentContainerCard>
  );
};

const Typographies = () => {
  return (
    <>
      <PageBreadcrumb title="Typography" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <TypographyVariants />
        </Grid>

        <Grid item lg={6}>
          <ColoredTypography />
        </Grid>

        <Grid item lg={6}>
          <ColoredOpacityTypography />
        </Grid>

        <Grid item lg={6}>
          <TextDecoratedTypography />
        </Grid>
      </Grid>
    </>
  );
};

export default Typographies;
