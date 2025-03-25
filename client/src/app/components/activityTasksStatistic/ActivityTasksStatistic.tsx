import { useSelector } from "react-redux";
import styles from "./ActivityTasksStatistic.module.scss";
import { useEffect, useState } from "react";
import { RootState } from "../../../store/store";
import { IAuthState } from "../../../auth/types/authUser";

interface IActivityTasksStatisticProps {
  onDataUpdate: (data: {
    completed: number;
    pending: number;
    inProgress: number;
    total: number;
  }) => void;
}

const ActivityTasksStatistic = ({
  onDataUpdate,
}: IActivityTasksStatisticProps) => {
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { session } = useSelector((state: { auth: IAuthState }) => state.auth);

  useEffect(() => {
    if (session?.user.id) {
      const completed =
        tasks?.filter(
          (task) =>
            task.assigned_to === session.user.id && task.status === "complete"
        ).length ?? 0;

      const inProgress =
        tasks?.filter(
          (task) =>
            task.assigned_to === session.user.id &&
            task.status === "in_progress"
        ).length ?? 0;
      const pending =
        tasks?.filter(
          (task) =>
            task.assigned_to === session.user.id && task.status === "pending"
        ).length ?? 0;
      const total =
        tasks?.filter((task) => task.assigned_to === session.user.id).length ??
        0;

      setCompleted(completed);
      setInProgress(inProgress);
      setPending(pending);
      setTotal(total);

      onDataUpdate({ completed, inProgress, pending, total });
    }
  }, [tasks, onDataUpdate, session]);

  return (
    <div className={styles.activityStats}>
      <p className="flex items-center justify-center">
        <span className={`${styles.activityTitle} ${styles.completed}`}>
          Completed
        </span>
        <span className="mx-2 font-semibold">|</span>
        <span className="font-semibold">{completed}</span>
      </p>
      <p className="flex items-center justify-center">
        <span className={`${styles.activityTitle} ${styles.pending}`}>
          Pending
        </span>
        <span className="mx-2 font-semibold">|</span>
        <span className="font-semibold">{pending}</span>
      </p>
      <p className="flex items-center justify-center">
        <span className={`${styles.activityTitle} ${styles.inProgress}`}>
          In Progress
        </span>
        <span className="mx-2 font-semibold">|</span>
        <span className="font-semibold">{inProgress}</span>
      </p>
      <p className="flex items-center justify-center">
        <span className={`${styles.activityTitle} ${styles.total}`}>Total</span>
        <span className="mx-2 font-semibold">|</span>
        <span className="font-semibold">{total}</span>
      </p>
    </div>
  );
};

export default ActivityTasksStatistic;
