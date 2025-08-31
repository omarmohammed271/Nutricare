import React, { useState } from "react";
import { ListTaskItem } from "@src/pages/apps/tasks/List/data";

export default function useTask(task: ListTaskItem) {
  const [completed, setCompleted] = useState<boolean>(task.stage === "Done");

  /*
   * mark completd on selected task
   */
  const markCompleted = (e: React.ChangeEvent<HTMLInputElement>, callback?: (task: ListTaskItem) => void) => {
    setCompleted(e.target.checked);
    if (callback) callback(task);
  };

  return { completed, markCompleted };
}
