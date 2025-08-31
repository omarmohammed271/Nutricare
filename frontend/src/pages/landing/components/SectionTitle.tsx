import { Stack, Typography } from "@mui/material";
import { useLayoutContext } from "@src/states";
import { LuAccessibility } from "react-icons/lu";

type SectionTitleProps = {
  name?: string;
  title: string;
  description?: string;
};

const SectionTitle = ({ name, title, description }: SectionTitleProps) => {
  const { themeMode } = useLayoutContext();

  return (
    <Stack sx={{ mx: "auto", marginBottom: "3.5rem", alignItems: "center", textAlign: "center" }}>
      {name && (
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "primary.lighter",
            px: 2,
            py: 0.5,
            color: "primary.dark",
            mb: "0.5rem",
            width: "fit-content",
            borderRadius: "9999px",
            borderTop: "2px solid",
            borderTopColor: "primary.light",
            borderBottom: "2px solid",
            borderBottomColor: "primary.light",
          }}>
          {name}
        </Typography>
      )}

      <Typography
        variant="h2"
        sx={{ mb: 2, fontWeight: 600, color: themeMode == "light" ? "primary.darker" : "primary.lighter" }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="h6" sx={{ maxWidth: "420px", color: "text.primary" }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
};

export default SectionTitle;
