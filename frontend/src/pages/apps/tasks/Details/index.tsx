import { Card, Grid } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import Task from "./Task";
import { useState } from "react";
import { ListTaskItem } from "../List/data";
import { Tasks } from "./data";
import Comments from "./Comments";
import Attachments from "./Attachments";

const TaskDetails = () => {
  const [selectedTask] = useState<ListTaskItem>(Tasks[0]);
  return (
    <>
      <PageBreadcrumb title="Project Detail" subName="Project" />
      <Grid container spacing={3}>
        <Grid item container spacing={3} xs={12} xl={8}>
          <Grid item xs={12}>
            <Task task={selectedTask} />
          </Grid>

          <Grid item xs={12}>
            <Comments />
          </Grid>
        </Grid>
        <Grid item container spacing={3} xs={12} xl={4}>
          <Grid item xs={12}>
            <Attachments />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskDetails;
