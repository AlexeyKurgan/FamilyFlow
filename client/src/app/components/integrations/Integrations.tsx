import styles from "./Integrations.module.scss";
import { Link } from "react-router-dom";
import { MdCalendarToday, MdChat, MdLink, MdNote } from "react-icons/md";

export const Integrations = () => {
  return (
    <div className={`app-content ${styles.integrationsContent}`}>
      <section className={styles.integrationHeader}>
        <article className={styles.card}>
          <div className={styles.cardIcon}>
            <MdLink size={48} color="#9b59b6" />
          </div>
          <h2>Family Integrations</h2>
          <p>Connect services to enhance family productivity</p>
        </article>
      </section>
      <section className={styles.integrationList}>
        <article className={styles.card}>
          <h3>Connected Services</h3>
          <ul className={styles.serviceList}>
            <li>
              <span className={styles.serviceIcon}>
                <MdCalendarToday size={24} color="#4a90e2" />
              </span>
              Google Calendar
            </li>
            <li>
              <span className={styles.serviceIcon}>
                <MdChat size={24} color="#50c878" />
              </span>
              Slack
            </li>
            <li>
              <span className={styles.serviceIcon}>
                <MdNote size={24} color="#e67e22" />
              </span>
              Notion
            </li>
            <li>
              <span className={styles.serviceIcon}></span>
              YouTube EDU
            </li>
          </ul>
          <Link to="/dashboard/integrations/add" className={styles.navButton}>
            Add New Integration
          </Link>
        </article>
      </section>
      <section className={styles.integrationStats}>
        <article className={styles.card}>
          <h3>Integration Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <p>Active: 4</p>
            </div>
            <div className={styles.statItem}>
              <p>Pending: 1</p>
            </div>
            <div className={styles.statItem}>
              <p>Total: 5</p>
            </div>
          </div>
          <Link to="/dashboard" className={styles.navButton}>
            Back to Dashboard
          </Link>
        </article>
      </section>
    </div>
  );
};

export default Integrations;
