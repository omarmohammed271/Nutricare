import { ListTaskItem, otherTasks, todayTasks, upcomingTasks } from "@src/pages/apps/tasks/List/data";
import { useState } from "react";

export default function useTaskList() {
  const [todayTask] = useState<ListTaskItem[]>([...todayTasks]);
  const [upcomingTask] = useState<ListTaskItem[]>([...upcomingTasks]);
  const [otherTask] = useState<ListTaskItem[]>([...otherTasks]);
  const [selectedTask, setSelectedTask] = useState<ListTaskItem>(todayTasks[0]);

  /**
   * Selects the task
   * @param {*} taks
   */
  const selectTask = (task: ListTaskItem) => {
    setSelectedTask(task);
  };

  return {
    todayTask,
    upcomingTask,
    otherTask,
    selectedTask,
    selectTask,
  };
}
