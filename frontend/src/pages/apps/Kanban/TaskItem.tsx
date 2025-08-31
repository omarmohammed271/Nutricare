import { Avatar, Box, CardContent, Tooltip, Typography } from "@mui/material";
import { LuBriefcase, LuMessageCircle } from "react-icons/lu";
import { TaskType } from "@src/pages/apps/Kanban/helper";
import { toSentenceCase } from "@src/helpers";

type TaskItemProps = {
  task: TaskType;
  toggleDescriptionModal: () => void;
};

const TaskItem = ({ task, toggleDescriptionModal }: TaskItemProps) => {
  return (
    <CardContent sx={{ p: "24px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="caption">{task.dueDate}</Typography>
        <Typography
          variant="body2"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            px: "4px",
            borderRadius: "6px",
            bgcolor: task.priority == "high" ? "#feeef1" : task.priority == "medium" ? "#fef9ef" : "#ecf6f0",
            color: task.priority == "high" ? "#f2789b" : task.priority == "medium" ? "#fecc5f" : "#57b995",
          }}>
          {toSentenceCase(task.priority)}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ my: "8px" }} onClick={toggleDescriptionModal}>
        {task.title}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, color: "grey.700" }}>
        <Typography sx={{ mb: "8px", display: "inline-flex", alignItems: "center", gap: 0.5 }}>
          <LuBriefcase /> {task.category}
        </Typography>
        <Typography sx={{ mb: "8px", display: "inline-flex", alignItems: "center", gap: 0.5 }}>
          <LuMessageCircle />
          {task.comments} Comments
        </Typography>
      </Box>
      <Box sx={{ mt: "12px", display: "flex", alignItems: "center" }}>
        {task.userAvatar.map((avatar, idx) => (
          <Tooltip title={avatar.title} key={idx}>
            <Avatar
              src={avatar.image}
              alt={avatar.title}
              sx={{
                height: "32px",
                width: "32px",
                marginInlineEnd: "-12px",
                transitionProperty: "all",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "200ms",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </CardContent>
  );
};

export default TaskItem;
