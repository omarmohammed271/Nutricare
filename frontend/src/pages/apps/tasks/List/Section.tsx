import { Avatar, Box, Card, Checkbox, Collapse, Typography } from "@mui/material";
import { LuCalendar, LuChevronDown, LuListChecks, LuMessageSquare } from "react-icons/lu";
import { useTask } from "@src/hooks";
import { useState } from "react";
import { ListTaskItem } from "./data";

const Task = ({
  task,
  selectTask,
  classname,
}: {
  task: ListTaskItem;
  classname: string;
  selectTask: (task: ListTaskItem) => void;
}) => {
  const { completed, markCompleted } = useTask(task);
  return (
    <>
      <Box sx={{ classname, display: "grid", gridTemplateColumns: { md: "repeat(2, minmax(0, 1fr))", gap: "16px" } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Checkbox
            id={`task-${task.id}`}
            defaultChecked={completed}
            onChange={(event) => markCompleted(event, selectTask)}
          />
          <Typography
            component={"label"}
            onClick={() => selectTask(task)}
            htmlFor={`task-${task.id}`}
            sx={{ fontWeight: 500, color: "grey.700" }}>
            {task.title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Avatar
              variant="circular"
              sx={{ height: "32px", width: "32px" }}
              src={task.assignee_avatar}
              id={`task-avatar-${task.id}`}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <LuCalendar size={16} style={{ marginRight: "6px" }} />
              {task.due_date}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <LuListChecks size={16} style={{ marginRight: "6px" }} />
              {task.checklists.filter((t) => t.completed).length} / {task.checklists.length}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <LuMessageSquare size={16} style={{ marginRight: "6px" }} />
              21
            </Typography>
            <Typography
              sx={{
                borderRadius: "4px",
                fontSize: "10px",
                verticalAlign: "baseline",
                fontWeight: 500,
                p: "4px",
                bgcolor:
                  task.priority == "High"
                    ? "error.lighter"
                    : task.priority == "Medium"
                    ? "warning.lighter"
                    : "success.lighter",
                color:
                  task.priority == "High"
                    ? "error.darker"
                    : task.priority == "Medium"
                    ? "warning.darker"
                    : "success.darker",
              }}
              component={"span"}>
              {task.priority}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
type TaskSectionProps = {
  title: string;
  tasks: Array<ListTaskItem>;
  selectTask: (task: ListTaskItem) => void;
};

const TaskSection = ({ title, tasks, selectTask }: TaskSectionProps) => {
  const [open, setOpen] = useState(true);
  const [taskList] = useState<ListTaskItem[]>(tasks);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Typography onClick={handleClick} component={"h5"} sx={{ mb: "12px", color: "grey.700", cursor: "pointer" }}>
        <LuChevronDown style={{ marginRight: "8px" }} /> {title}
        <Typography component={"span"} color={"grey.700"}>
          
          ({taskList.length})
        </Typography>
      </Typography>
      <Collapse in={open}>
        <Card sx={{ p: "24px", mb: "32px" }}>
          {taskList.map((task, idx) => (
            <Task
              selectTask={selectTask}
              task={task}
              key={idx}
              classname={idx === taskList.length - 1 ? "" : 'mb:"12px"'}
            />
          ))}
        </Card>
      </Collapse>
    </>
  );
};

export default TaskSection;
