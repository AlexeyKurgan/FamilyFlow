import { useEffect } from "react";
import Tasks from "../../components/tasks/Tasks";

const TasksPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="task-wrapper">
      <Tasks />
    </div>
  );
};

export default TasksPage;
