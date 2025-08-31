import { Fragment, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import ReactQuill from "react-quill";
import { LuAtSign, LuCalendar, LuMoreHorizontal, LuSendHorizonal, LuTrash2, LuUpload, LuX } from "react-icons/lu";
import { useTask } from "@src/hooks";

//data
import { ListTaskItem } from "./data";

// style
import "react-quill/dist/quill.bubble.css";

const Task = (task: ListTaskItem) => {
  const { completed } = useTask(task);

  const [editorValue, setEditorValue] = useState<string>(`
  <h3>This is a simple editable area.</h3><br/>
  <ul>
      <li> Select a text to reveal the toolbar. </li>
      <li>
          Edit rich document on-the-fly, so elastic!
      </li>
  </ul>
  <p><br></p>
  <p>
      End of simple area
  </p>`);

  return (
    <Card sx={{ p: "24px", borderRadius: { xl: "0px", m: { xl: "0px", m: "24px" } } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
          <FormControlLabel control={<Checkbox defaultChecked={completed} />} label="Mark as completed" />
          <IconButton>
            <LuMoreHorizontal size={14} />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ mt: "12px", mb: "12px" }} />
      <Box sx={{ width: "auto" }}>
        <Typography sx={{ mb: "10px", fontWeight: "500", color: "grey.700" }}>{task.title}</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", rowGap: "12px" }}>
          <Box sx={{ width: { sm: "50%", px: "12px" } }}>
            <Typography component={"p"} sx={{ mt: "12px", mb: "6px", color: "grey.700" }}>
              Assigned To
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                variant="circular"
                src={task.assignee_avatar}
                alt={task.assigned_to}
                sx={{ height: "24px", width: "24px", mr: "12px" }}
              />
              <Typography component={"h5"} color={"text.primary"}>
                {task.assigned_to}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: { sm: "50%", px: "12px" } }}>
            <Typography component={"p"} sx={{ mt: "12px", mb: "6px", color: "grey.700" }}>
              Due Date
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LuCalendar style={{ marginRight: "6px", color: "green" }} />
              <Typography component={"h5"} color={"text.primary"}>
                {task.due_date}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", mt: "24px" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ border: "1px solid #D1D5DB", borderRadius: "4px" }}>
              <ReactQuill theme="bubble" value={editorValue} onChange={setEditorValue} style={{ height: 130 }} />
            </Box>
          </Box>
        </Box>
        <Typography sx={{ mt: "36px", mb: "12px", color: "grey.700", fontWeight: 500 }}>
          Checklists/Sub-tasks
        </Typography>
        {task.checklists.map((checklist, idx) => (
          <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: "8px", m: "0px" }}>
            <Checkbox
              id={`checklist-${checklist.id}`}
              sx={{ borderRadius: "4px", padding: "0px", mt: "6px" }}
              defaultChecked={checklist.completed}
            />
            <Typography
              component={"label"}
              htmlFor={`checklist-${checklist.id}`}
              sx={{ color: "text.primary", fontSize: "13px", mt: "6px" }}>
              {checklist.title}
            </Typography>
          </Box>
        ))}

        <Typography sx={{ mt: "36px", mb: "12px", color: "grey.700", fontWeight: 500 }}>Attachments</Typography>
        {task.attachments.map((file, idx) => {
          const ext = file.filename.substr(file.filename.lastIndexOf(".") + 1);
          return (
            <Card key={idx} sx={{ mb: "12px", border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
              <Box sx={{ p: "6px" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Box width={"auto"}>
                      <Box sx={{ width: "48px", height: "48px" }}>
                        <Typography
                          component={"span"}
                          sx={{
                            height: "100%",
                            width: "100%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "primary.main",
                            color: "#ffff",
                            borderRadius: "4px",
                            fontWeight: 500,
                          }}>
                          {ext.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "grey.600", fontWeight: 600 }}>{file.filename}</Typography>
                      <Typography sx={{ fontSize: "12px", color: "grey.700" }}>{file.size}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: "auto" }}>
                    <IconButton size="small">
                      
                      <LuTrash2 size={16} />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <LuX size={16} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          );
        })}
        <Box sx={{ mt: "24px" }}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: "36px", mb: "12px", fontWeight: 500 }}>Comments</Typography>
            {task.comments.map((comment, idx) => (
              <Fragment key={idx}>
                <Box sx={{ display: "flex", mt: "24px", p: "6px" }}>
                  <Avatar
                    src={comment.author_avatar}
                    variant="circular"
                    sx={{ height: "36px", width: "36px", mr: "12px" }}
                    alt={comment.author}
                  />
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography component={"h5"} sx={{ color: "grey.700", fontWeight: 500 }}>
                          {comment.author}
                        </Typography>
                        <Typography component={"p"} sx={{ mt: "6px", color: "grey.600", fontSize: "12px" }}>
                          {comment.text}
                        </Typography>
                      </Box>
                      <Typography component={"span"} sx={{ fontSize: "12px", color: "grey.700" }}>
                        {comment.posted_on}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography component={"hr"} sx={{ my: "20px", border: "1px solid", borderColor: "divider" }} />
              </Fragment>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", pt: "12px" }}>
          <Box width={"100%"}>
            <Box sx={{ border: "1px solid text.divider", borderRadius: "5px" }}>
              <TextField id="outlined-multiline-static" rows={3} placeholder="Your Comment..." multiline fullWidth />
              <Box
                sx={{
                  p: "8px",
                  bgcolor: "grey.200",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Box>
                  <IconButton sx={{ px: "8px", mr: "12px" }}>
                    <LuUpload size={16} />
                  </IconButton>
                  <IconButton sx={{ px: "8px" }}>
                    <LuAtSign size={16} />
                  </IconButton>
                </Box>
                <Button variant="contained" startIcon={<LuSendHorizonal size={18} />} size="small" color="secondary">
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Task;
