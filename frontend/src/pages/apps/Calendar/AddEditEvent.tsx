import { useState } from "react";
import { useForm } from "react-hook-form";
import { EventInput } from "@fullcalendar/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuX } from "react-icons/lu";
import { Box, Button, DialogContent, DialogTitle, IconButton, MenuItem } from "@mui/material";
import { BootstrapDialog } from "@src/pages/base-ui/Dialogs";
import { FormInput, SelectInput } from "@src/components";

type FormValues = {
  title: string;
  className: string;
};

type AddEditEventProps = {
  isOpen: boolean;
  onClose: () => void;
  isEditable?: boolean;
  eventData: EventInput;
  onRemoveEvent?: () => void;
  onUpdateEvent: (value: any) => void;
  onAddEvent: (value: any) => void;
};
const AddEditEvent = ({
  isOpen,
  onClose,
  isEditable,
  eventData,
  onRemoveEvent,
  onUpdateEvent,
  onAddEvent,
}: AddEditEventProps) => {
  // event state
  const [event] = useState<EventInput>(eventData);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup.string().required("Please enter event name"),
      className: yup.string().required("Please select category"),
    }),
  );

  /*
   * form methods
   */
  const methods = useForm<FormValues>({
    defaultValues: {
      title: event.title,
      className: event.className ? String(event.className) : "error",
    },
    resolver: schemaResolver,
  });
  const { handleSubmit, reset, control } = methods;

  /*
   * handle form submission
   */
  const onSubmitEvent = (data: { title: string; className: string }) => {
    isEditable ? onUpdateEvent(data) : onAddEvent(data);
    reset();
  };

  return (
    <BootstrapDialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{isEditable ? "Edit Event" : "Add New Event"}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}>
        <LuX />
      </IconButton>
      <DialogContent sx={{ width: 500 }}>
        <form onSubmit={handleSubmit(onSubmitEvent)}>
          <Box sx={{ pb: "24px" }}>
            <FormInput
              type="text"
              label="Event Name"
              name="title"
              placeholder="Insert Event Name"
              key="title"
              control={control}
            />
            <SelectInput type="select" label="Category" name="className" containerSx={{ mt: 1 }} control={control}>
              <MenuItem value="bg-primary">Primary</MenuItem>
              <MenuItem value="bg-warning">Warning</MenuItem>
              <MenuItem value="bg-success">Success</MenuItem>
              <MenuItem value="bg-danger">Error</MenuItem>
              <MenuItem value="bg-info">Info</MenuItem>
            </SelectInput>
          </Box>

          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
            {isEditable && (
              <Button color="error" variant="contained" onClick={onRemoveEvent}>
                Delete
              </Button>
            )}
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Button variant="contained" onClick={onClose}>
                Close
              </Button>
              <Button color="success" type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default AddEditEvent;
