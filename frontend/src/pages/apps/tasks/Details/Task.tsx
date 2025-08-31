import { Avatar, Box, Card, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { ListTaskItem } from "../List/data";
import { LuBriefcase, LuCalendar } from "react-icons/lu";

type TaskProps = {
  task: ListTaskItem;
};

const Task = ({ task }: TaskProps) => {
  return (
    <Card sx={{ p: "24px" }}>
      <Box mb={"16px"}>
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <FormControlLabel control={<Checkbox />} label="Mark as completed" />
        </Box>
      </Box>
      <Typography component={"h4"} sx={{ fontWeight: "500", color: "grey.600" }}>
        {task.title}
      </Typography>
      <Box sx={{ my: "20px" }}>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <Typography sx={{ color: "grey.600", fontSize: "12px" }}>Assigned To</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px", mt: "4px" }}>
              <Avatar
                variant="circular"
                sx={{ height: "24px", width: "24px" }}
                src={task.assignee_avatar}
                alt={task.assigned_to}
              />
              <Typography component={"h5"} sx={{ fontWeight: 400, color: "grey.700" }}>
                {task.assigned_to}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Typography sx={{ color: "grey.600", fontSize: "12px" }}>Project Name</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px", mt: "4px" }}>
              <LuBriefcase size={18} color="green" />
              <Typography component={"h5"} sx={{ fontWeight: 400, color: "grey.700" }}>
                {task.projectName}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Typography sx={{ color: "grey.600", fontSize: "12px" }}>Project Name</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px", mt: "4px" }}>
              <LuCalendar size={18} color="green" />
              <Typography component={"h5"} sx={{ fontWeight: 400, color: "grey.700" }}>
                {task.due_date}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Typography component={"h5"} sx={{ mb: "4px", color: "grey.700", fontWeight: 500 }}>
        Overview:
      </Typography>
      <Typography component={"p"} sx={{ color: "grey.600", fontSize: "12px" }}>
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a
        little bit longer. Some quick example text to build on the card title and make up the bulk of the card's
        content. Some quick example text to build on the card title and make up.
      </Typography>

      <Box mt={"32px"}>
        <Typography component={"h5"} sx={{ mb: "8px", color: "grey.700", fontWeight: "500" }}>
          Checklists/Sub-tasks
        </Typography>
        {(task.checklists || []).map((checklist, idx) => {
          return (
            <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: "8px", m: "0px" }}>
              <Checkbox
                id={`checklist-${checklist.id}`}
                sx={{ borderRadius: "4px", padding: "0px", mt: "6px" }}
                defaultChecked={checklist.completed}
              />
              <Typography
                component={"label"}
                htmlFor={`checklist-${checklist.id}`}
                sx={{ fontWeight: 400, color: "grey.600", fontSize: "13px", mt: "6px" }}>
                {checklist.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default Task;
