import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { LuSearch } from "react-icons/lu";
import useTaskList from "@src/hooks/useTaskList";
import Task from "./Task";
import TaskSection from "./Section";

const TaskList = () => {
  const { todayTask, upcomingTask, otherTask, selectedTask, selectTask } = useTaskList();
  return (
    <>
      <Box sx={{ mx: "-24px", mb: "-24px" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xl: "repeat(3, minmax(0, 1fr))" } }}>
          <Box sx={{ gridColumn: { xl: "span 2 / span 2" }, px: "24px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: "24px" }}>
              <Typography variant="h5" color={"text.primary"}>
                Task List
              </Typography>

              <Box sx={{ display: { xs: "hidden", md: "flex" }, alignItems: "center", gap: "10px", fontWeight: 600 }}>
                <Box sx={{ position: "static", overflowY: "hidden" }}>
                  <TextField
                    id="input-with-icon-textfield"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LuSearch size={20} />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    placeholder="Search Files..."
                  />
                </Box>
              </Box>
            </Box>

            <TaskSection title="Today" tasks={todayTask} selectTask={selectTask}></TaskSection>
            <TaskSection title="Upcoming" tasks={upcomingTask} selectTask={selectTask}></TaskSection>
            <TaskSection title="Other" tasks={otherTask} selectTask={selectTask}></TaskSection>
          </Box>

          <Box sx={{ gridColumn: "span 1 / span 1" }}>
            <Box sx={{ p: { xs: "24px", xl: "0px" } }}>
              <Task {...selectedTask} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TaskList;
