import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import * as yup from "yup";
import { FormInput } from "@src/components";
import { LuSendHorizonal, LuX } from "react-icons/lu";

import "react-quill/dist/quill.snow.css";

type ComposeMailProps = {
  isComposeOpen: boolean;
  hideComposeMail: () => void;
};

const ComposeMail = ({ isComposeOpen, hideComposeMail }: ComposeMailProps) => {
  const composeMailSchema = yup.object({
    to: yup.string().email("Please enter valid email address").required("An email is required"),
    subject: yup.string().required("Email Subject is required"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(composeMailSchema),
  });

  const editorDefault = `<h3><span className="ql-size-large">Hello World!</span></h3>
  <br/>
  <h3>This is an simple editable area.</h3>
  <p><br/></p>
  <ul>
    <li>Select a text to reveal the toolbar.</li>
    <li>Edit rich document on-the-fly, so elastic!</li>
  </ul>
  <p><br/></p>
  <p>End of simple area</p>`;

  return (
    <>
      <Dialog open={isComposeOpen} onClose={hideComposeMail}>
        <form
          onSubmit={handleSubmit(() => {
            hideComposeMail();
            reset();
          })}>
          <DialogTitle
            variant="h4"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              padding: 2,
              px: "24px",
              width: 465,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            New Mail
            <IconButton onClick={hideComposeMail}>
              <LuX color="white" />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ px: "24px", pt: "24px !important", pb: 0 }}>
            <FormInput name="to" label={"To"} control={control} />

            <FormInput name="subject" label={"Subject"} control={control} containerSx={{ mt: 1.5 }} />

            <FormLabel sx={{ mt: 1.5, mb: 0.4 }} component={"p"}>
              Message
            </FormLabel>

            <ReactQuill
              theme="snow"
              defaultValue={editorDefault}
              modules={{
                toolbar: {
                  container: [
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                  ],
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideComposeMail} variant="outlined">
              Discard
            </Button>
            <Button type="submit" variant="contained" endIcon={<LuSendHorizonal size={16} />}>
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ComposeMail;
