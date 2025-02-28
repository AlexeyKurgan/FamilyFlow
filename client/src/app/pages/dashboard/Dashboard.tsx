import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";
import achievement1 from "../../../assets/images/achievements/blogger.png";
import achievement2 from "../../../assets/images/achievements/chile.png";
import achievement3 from "../../../assets/images/achievements/leadership.png";
import achievement4 from "../../../assets/images/achievements/target.png";
import achievement5 from "../../../assets/images/achievements/trophy.png";

import {
  MdCalendarToday,
  MdPerson,
  MdTaskAlt,
  MdLink,
  MdBook,
  MdStorefront,
  MdCelebration,
  MdChat,
  MdNote,
} from "react-icons/md";

export const Dashboard = () => {
  const userName = "John Doe";

  return (
    <div className={`app-content ${styles.dashboardContent}`}>
      <section className={`${styles.row} ${styles.dateRow}`}>
        <article className={styles.card}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdCalendarToday size={48} color="#4a90e2" className="mr-5" />
            <h2>Friday</h2>
          </div>

          <p>Mon Mar 3, 2025 | 10:00 AM</p>
        </article>
      </section>
      <section className={`${styles.row} ${styles.activityRow}`}>
        <article className={styles.card}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdPerson size={48} color="#7f8c8d" className="mr-5" />
            <h2>Welcome, {userName}!</h2>
          </div>
          <div className={styles.chartPlaceholder}>
            Activity Graph (Add Chart Here)
          </div>
          <div className={styles.activityStats}>
            <p>Completed Tasks: 5</p>
            <p>In Progress: 3</p>
            <p>Total Tasks: 8</p>
          </div>
          <div className={styles.achievementsList}>
            <h3>Recent Achievements</h3>
            <ul className={styles.achievementsGrid}>
              {[
                achievement1,
                achievement2,
                achievement3,
                achievement4,
                achievement5,
              ].map((src, index) => (
                <li key={index}>
                  <img
                    src={src}
                    alt={`Achievement ${index + 1}`}
                    className={styles.achievementImage}
                  />
                </li>
              ))}
              <Link to="/dashboard/achievement">View All</Link>
            </ul>
          </div>
        </article>
      </section>
      <section className={`${styles.row} ${styles.tasksRow}`}>
        <article className={styles.card}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdTaskAlt size={48} color="#ff6f61" className="mr-5" />
            <h2>Tasks</h2>
          </div>

          <ul>
            <li>Buy groceries</li>
            <li>Complete project</li>
            <li>Call mom</li>
          </ul>
          <Link to="/dashboard/tasks" className={styles.navButton}>
            Go to Tasks
          </Link>
        </article>
      </section>
      <section className={`${styles.row} ${styles.integrationsRow}`}>
        <article className={styles.card}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdLink size={48} color="#9b59b6" className="mr-5" />
            <h2>Integrations</h2>
          </div>

          <p>Connected services:</p>
          <ul className={styles.integrationList}>
            <li>
              <span className={styles.integrationIcon}>
                <MdCalendarToday size={24} color="#4a90e2" />
              </span>
              Google Calendar
            </li>
            <li>
              <span className={styles.integrationIcon}>
                <MdChat size={24} color="#50c878" />
              </span>
              Slack
            </li>
            <li>
              <span className={styles.integrationIcon}>
                <MdNote size={24} color="#e67e22" />
              </span>
              Notion
            </li>
          </ul>
          <Link to="/dashboard/integrations" className={styles.navButton}>
            Go to Integrations
          </Link>
        </article>
      </section>
      <section className={`${styles.row} ${styles.resourcesRow}`}>
        <article className={styles.card}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdBook size={48} color="#2ecc71" className="mr-5" />
            <h2>Resources</h2>
          </div>

          <p>Helpful Links:</p>
          <ul>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Community Forum</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
          <Link to="/dashboard/resources" className={styles.navButton}>
            Go to Resources
          </Link>
        </article>
      </section>
      <section className={`${styles.row} ${styles.rewardsRow}`}>
        <article className={styles.card}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdStorefront size={48} color="#f4c430" className="mr-5" />
            <h2>Rewards Shop</h2>
          </div>

          <p>Earn points and redeem rewards!</p>
          <Link to="/dashboard/rewards" className={styles.navButton}>
            Visit Shop
          </Link>
        </article>
      </section>
      <section className={`${styles.row} ${styles.achievementsRow}`}>
        <article className={styles.card}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdCelebration size={48} color="#e74c3c" className="mr-5" />
            <h2>Achievements</h2>
          </div>

          <p>Completed Milestones:</p>
          <ul>
            <li>First Task Completed 🎉</li>
            <li>Logged in 7 Days in a Row 🔥</li>
          </ul>
          <Link to="/dashboard/achievements" className={styles.navButton}>
            View Achievements
          </Link>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
