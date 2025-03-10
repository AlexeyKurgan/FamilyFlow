import { FaCircleInfo } from "react-icons/fa6";
import CustomTooltip from "../../../shared/components/tooltip/Tooltip";
import TaskForm from "./components/TaskForm";
import styles from "./Tasks.module.scss";

export const Tasks = () => {
  return (
    <div className={`${styles.tasksContent}`}>
      <div className="flex items-center">
        <h1 className="text-[2.3em]">Tasks</h1>
        <CustomTooltip
          className=""
          placement="top"
          title={"INFO"}
          component={"button"}
        >
          <FaCircleInfo size={25} />
        </CustomTooltip>
      </div>

      <TaskForm />
    </div>
  );
};

export default Tasks;
