import { Box, Button, ButtonPropsColorOverrides, List, ListItemText, Typography } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

type ExternalEventType = {
  id: number;
  color: OverridableStringUnion<
    "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    ButtonPropsColorOverrides
  >;
  className: string;
  title: string;
};

const SidePanel = () => {
  // external events
  const externalEvents: ExternalEventType[] = [
    {
      id: 1,
      color: "success",
      className: "bg-success",
      title: "New Theme Release",
    },
    {
      id: 2,
      color: "info",
      className: "bg-info",
      title: "My Event",
    },
    {
      id: 3,
      color: "warning",
      className: "bg-warning",
      title: "Meet manager",
    },
    {
      id: 4,
      color: "error",
      className: "bg-error",
      title: "Create New theme",
    },
  ];

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={1} id="external-events">
        <Typography my={2} sx={{ fontSize: "14px", lineHeight: "20px" }}>
          Drag and drop your event or click in the calendar
        </Typography>

        {externalEvents.map((event, idx) => (
          <Button
            key={idx}
            variant="contained"
            className="external-event"
            title={event.title}
            size="large"
            color={event.color}
            data-class={event.className}
            sx={{ mb: "2px" }}>
            {event.title}
          </Button>
        ))}
      </Box>
      <Box mt={5}>
        <Typography mb={2} color={"text.secondary"} textAlign={"center"} fontWeight={"bold"} component={"h5"}>
          How It Works ?
        </Typography>
        <List sx={{ ps: "3" }}>
          <ListItemText sx={{ marginBottom: "12px" }}>
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged.
          </ListItemText>
          <ListItemText sx={{ marginBottom: "12px" }}>
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage.
          </ListItemText>
          <ListItemText sx={{ marginBottom: "12px" }}>
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage.
          </ListItemText>
        </List>
      </Box>
    </>
  );
};

export default SidePanel;
