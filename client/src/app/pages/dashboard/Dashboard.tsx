import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";
import achievement1 from "../../../assets/images/achievements/blogger.png";
import achievement2 from "../../../assets/images/achievements/chile.png";
import achievement3 from "../../../assets/images/achievements/leadership.png";
import achievement4 from "../../../assets/images/achievements/target.png";
import achievement5 from "../../../assets/images/achievements/trophy.png";

import {
  // MdCalendarToday,
  MdTaskAlt,
  MdLink,
  MdBook,
  MdStorefront,
  // MdCelebration,
  // MdChat,
  // MdNote,
  MdWavingHand,
} from "react-icons/md";
import { PieChart } from "@mui/x-charts/PieChart";
import { useCallback, useEffect, useState } from "react";
// import { useCallback, useEffect, useMemo, useState } from "react";
import Date from "../../../shared/components/date/Date";
import Card from "../../../shared/components/card/Card";
import { useSelector } from "react-redux";
import { IAuthState } from "../../../auth/types/authUser";
import { useAppDispatch } from "../../../shared/hooks/hooks";
import { fetchTasksUserById } from "../../../store/slices/tasksSlice";
import { showAlert } from "../../../store/slices/alertSlice";
import { RootState } from "../../../store/store";
import { ClipLoader } from "react-spinners";
import ActivityTasksStatistic from "../../components/activityTasksStatistic/ActivityTasksStatistic";
import {
  useDisplayedSliceData,
  SLICE_END,
} from "../../hooks/displayedSliceData";
import { fetchIntegrationsUserById } from "../../../store/slices/integrationsSlice";
import {
  FaExclamationTriangle,
  FiCheckSquare,
} from "../../../shared/react-icons/icons";
import CustomTooltip from "../../../shared/components/tooltip/Tooltip";
import IntegrationIcon from "../../../shared/components/IntegrationIcon";

export const Dashboard = () => {
  const userName = "John Doe";
  const { session } = useSelector((state: { auth: IAuthState }) => state.auth);
  const { tasks, error, loading } = useSelector(
    (state: RootState) => state.tasks
  );
  const { integrations } = useSelector(
    (state: RootState) => state.integrations
  );
  const displayedTasks = useDisplayedSliceData(tasks);
  const displayedIntegrations = useDisplayedSliceData(integrations);

  const [pieChartData, setPieChartData] = useState([
    { id: 0, value: 0, label: "Completed" },
    { id: 1, value: 0, label: "In Progress" },
    { id: 2, value: 0, label: "Pending" },
    { id: 3, value: 0, label: "Total" },
  ]);

  const handleDataUpdate = useCallback(
    (data: {
      completed: number;
      inProgress: number;
      pending: number;
      total: number;
    }) => {
      const { completed, inProgress, pending, total } = data;

      setPieChartData([
        { id: 0, value: completed, label: "Completed" },
        { id: 1, value: inProgress, label: "In Progress" },
        { id: 2, value: pending, label: "Pending" },
        { id: 3, value: total, label: "Total" },
      ]);
    },
    []
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user.id) {
      dispatch(fetchTasksUserById({ user_uuid: session.user.id }));
      dispatch(fetchIntegrationsUserById({ user_uuid: session.user.id }));
    }
  }, [dispatch, session]);

  useEffect(() => {
    if (error) {
      dispatch(
        showAlert({
          message: error,
          severity: "error",
        })
      );
    }
  }, [error, dispatch]);

  return (
    <div className={`app-content ${styles.dashboardContent}`}>
      <section className={`${styles.row}`}>
        <Date classNames={`dateCard`} />
      </section>
      <section className={`${styles.row}`}>
        <Card className={`${styles.activityCard}`}>
          <div className={`flex items-start ${styles.cardIcon}`}>
            <MdWavingHand size={32} color="#000000" className="mr-5" />
            <h2>Welcome, {userName}!</h2>
          </div>
          <div className={styles.chartPlaceholder}>
            <PieChart
              series={[{ data: pieChartData }]}
              tooltip={{ trigger: "none" }}
              width={400}
              height={200}
            />
          </div>

          <ActivityTasksStatistic onDataUpdate={handleDataUpdate} />

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
        </Card>
      </section>
      <section className={`${styles.row}`}>
        <Card className={`${styles.tasksRow}`}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdTaskAlt size={48} color="#ff6f61" className="mr-5" />
            <h2>Tasks</h2>
          </div>

          {loading ? (
            <div className="relative w-full h-full">
              <ClipLoader
                className="absolute right-[39%] top-1/2 transform translate-x-[-50%] translate-y-[-50%]"
                color="#FABB18"
                size={50}
              />
            </div>
          ) : (
            <ul>
              {displayedTasks.map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
              {Array.isArray(tasks) && tasks.length === 0 && (
                <span className="text-2xl font-bold">You have not tasks!</span>
              )}
              {tasks && tasks.length > SLICE_END && (
                <li>
                  <Link to="/dashboard/tasks">View All</Link>
                </li>
              )}
            </ul>
          )}
          <Link to="/dashboard/tasks" className={styles.navButton}>
            Go to Tasks
          </Link>
        </Card>
      </section>
      <section className={`${styles.row}`}>
        <Card className={`${styles.integrationsCard}`}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdLink size={48} color="#9b59b6" className="mr-5" />
            <h2>Integrations</h2>
          </div>

          <p>
            Added services: <b>{integrations?.length}</b>
          </p>
          {loading ? (
            <div className="relative w-full h-full">
              <ClipLoader
                className="absolute right-[39%] top-1/2 transform translate-x-[-50%] translate-y-[-50%]"
                color="#FABB18"
                size={50}
              />
            </div>
          ) : (
            <ul className={styles.integrationList}>
              {displayedIntegrations.map((integration) => (
                <li className="flex justify-between" key={integration.id}>
                  <p className="flex items-center m-0">
                    <IntegrationIcon
                      apiIcon={integration.api_icon}
                      className="mr-2"
                      fill="blue"
                      width="35"
                      height="35"
                      viewBox="0 -64 640 640"
                    />
                    <span className="font-bold">
                      {integration.service_name.toLocaleUpperCase() + " API"}
                    </span>
                  </p>
                  <span className="flex">
                    {integration.is_active ? (
                      <CustomTooltip
                        className="!cursor-auto"
                        placement="top"
                        title={"Integration ON"}
                      >
                        <FiCheckSquare className="text-lime-700" size={25} />
                      </CustomTooltip>
                    ) : (
                      <CustomTooltip
                        className="!cursor-auto"
                        placement="top"
                        title={"Integration OFF"}
                      >
                        <FaExclamationTriangle
                          className="text-red-700"
                          size={25}
                        />
                      </CustomTooltip>
                    )}
                  </span>
                </li>
              ))}
              {Array.isArray(integrations) && integrations.length === 0 && (
                <span className="text-2xl font-bold">
                  You have not added any integrations!
                </span>
              )}

              {integrations && integrations.length > SLICE_END && (
                <li>
                  <Link to="/dashboard/integrations">View All</Link>
                </li>
              )}
            </ul>
          )}
          <Link to="/dashboard/integrations" className={styles.navButton}>
            Go to Integrations
          </Link>
        </Card>
      </section>
      <section className={`${styles.row}`}>
        <Card>
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
        </Card>
      </section>
      <section className={`${styles.row}`}>
        <Card>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdStorefront size={48} color="#f4c430" className="mr-5" />
            <h2>Rewards Shop</h2>
          </div>

          <p>Earn points and redeem rewards!</p>
          <Link to="/dashboard/rewards" className={styles.navButton}>
            Visit Shop
          </Link>
        </Card>
      </section>
      {/* <section className={`${styles.row}`}>
        <Card>
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
        </Card>
      </section> */}
    </div>
  );
};

export default Dashboard;
