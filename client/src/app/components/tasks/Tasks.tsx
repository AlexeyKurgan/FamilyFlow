import styles from "./Tasks.module.scss";
import { Link } from "react-router-dom";
import { MdTaskAlt } from "react-icons/md";

export const Tasks = () => {
  return (
    <div className={`${styles.tasksContent}`}>
      <section className={styles.taskHeader}>
        <article className={styles.card}>
          <div className={styles.cardIcon}>
            <MdTaskAlt size={48} color="#ff6f61" />
          </div>
          <h2>Family Tasks</h2>
          <p>Manage and track tasks for your family</p>
        </article>
      </section>
      <section className={styles.taskList}>
        <article className={styles.card}>
          <h3>Active Tasks</h3>
          <ul>
            <li className={`${styles.taskItem} ${styles.inProgress}`}>
              <span>Buy groceries</span>
              <span className={styles.taskStatus}>In Progress</span>
            </li>
            <li className={styles.completed}>
              <span>Complete project</span>
              <span className={styles.taskStatus}>Completed</span>
            </li>
            <li className={styles.pending}>
              <span>Call mom</span>
              <span className={styles.taskStatus}>Pending</span>
            </li>
          </ul>
          <Link to="/dashboard" className={styles.navButton}>
            Back to Dashboard
          </Link>
        </article>
      </section>
      <section className={styles.taskStats}>
        <article className={styles.card}>
          <h3>Task Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <p>Completed: 5</p>
            </div>
            <div className={styles.statItem}>
              <p>In Progress: 3</p>
            </div>
            <div className={styles.statItem}>
              <p>Pending: 2</p>
            </div>
            <div className={styles.statItem}>
              <p>Total: 10</p>
            </div>
          </div>
          <Link to="/dashboard/tasks/add" className={styles.navButton}>
            Add New Task
          </Link>
        </article>
      </section>
    </div>
  );
};

export default Tasks;
