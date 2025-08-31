import { Box, Link, Typography } from "@mui/material";
import { useLayoutContext } from "@src/states";

export type DemoCardProps = {
  link: string; image: string; name: string;
}

const DemoCard = ({ link, image, name }: DemoCardProps) => {
  const { themeMode } = useLayoutContext();
  return (<Link href={link} target="_blank" sx={{ textDecoration: "none" }}>
    <Box sx={{
      position: "relative",
      borderRadius: 1,
      textAlign: "center",
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "500ms",
      padding: "20px",
      border: 1,
      borderColor: "divider",
      "&:hover": {
        "& > .preview-button": {
          opacity: 100
        }, "& > img": {
          transform: "scale(1.03)"
        }, backgroundColor: "grey.50"
      }
    }}>

      <img alt="demo-img" style={{
        width: "100%",
        borderRadius: "8px",
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "500ms",
        filter: themeMode == 'dark' ? "invert(1) hue-rotate(190deg) contrast(0.8)" : "none"
      }} src={image} />
      <Typography variant="h4" sx={{
        marginTop: "20px", textAlign: "center", color: "text.primary", fontWeight: 600, textDecoration: "none"
      }}>
        {name}
      </Typography>
    </Box>
  </Link>);
};

export default DemoCard;
