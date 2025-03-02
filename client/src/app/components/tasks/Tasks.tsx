import styles from "./Tasks.module.scss";
import { MdTaskAlt } from "react-icons/md";

export const Tasks = () => {
  return (
    <div className={`${styles.tasksContent}`}>
      <section className={styles.taskHeader}>
        <article className={styles.card}>
          <div className={`flex items-start ${styles.cardIcon}`}>
            <h2 className="mr-5">Family Tasks</h2>
            <MdTaskAlt size={48} color="#ff6f61" />
          </div>

          <p>Manage and track tasks for your family</p>
        </article>
      </section>
      <section className="task-row">
        <article>1</article>
        <article>2</article>
        <article>3</article>
        <article>4</article>
        <article>5</article>
        <article>6</article>
      </section>
    </div>
  );
};

export default Tasks;
