import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";

import {
  MdTaskAlt,
  MdLink,
  MdBook,
  MdStorefront,
  MdWavingHand,
} from "react-icons/md";
import { PieChart } from "@mui/x-charts/PieChart";
import { useCallback, useEffect, useState } from "react";
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
import SvgIcon from "../../../shared/components/SvgIcon";
import { fetchResourcesUserById } from "../../../store/slices/resourcesSlice";
import { ViewBoxType, viewBoxes } from "../../constants/constants";
import { fetchAchievementsUserById } from "../../../store/slices/achievementsSlice";
import { fetchUserProfile } from "../../../store/slices/profileSlice";

export const Dashboard = () => {
  const { session } = useSelector((state: { auth: IAuthState }) => state.auth);
  const { tasks, error, loading } = useSelector(
    (state: RootState) => state.tasks
  );
  const { integrations } = useSelector(
    (state: RootState) => state.integrations
  );
  const { achievements } = useSelector(
    (state: RootState) => state.achievements
  );
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const { resources } = useSelector((state: RootState) => state.resources);

  const displayedTasks = useDisplayedSliceData(tasks);
  const displayedIntegrations = useDisplayedSliceData(integrations);
  const displayedResources = useDisplayedSliceData(resources);
  const displayedAchievements = useDisplayedSliceData(achievements);

  const [pieChartData, setPieChartData] = useState([
    { id: 0, value: 0, label: "Completed" },
    { id: 1, value: 0, label: "In Progress" },
    { id: 2, value: 0, label: "Pending" },
    { id: 3, value: 0, label: "Total" },
  ]);

  const supportedTypes = ["video", "link", "book"];

  const getViewBox = (type: ViewBoxType) => {
    return viewBoxes[type] || "0 0 24 24";
  };

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
      dispatch(fetchResourcesUserById({ user_uuid: session.user.id }));
      dispatch(fetchAchievementsUserById({ user_uuid: session.user.id }));
      dispatch(fetchUserProfile({ user_uuid: session.user.id }));
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
            <h2>Welcome, {`${userProfile?.name} ${userProfile?.last_name}`}</h2>
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
              {displayedAchievements.map((achievement) => (
                <li key={achievement.id}>
                  <CustomTooltip
                    className="!cursor-auto"
                    placement="top"
                    title={achievement.name}
                  >
                    <img
                      src={achievement.image_url}
                      alt={achievement.description}
                      className={styles.achievementImage}
                    />
                  </CustomTooltip>
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
                    <SvgIcon
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
        <Card className={`${styles.resourceCard}`}>
          <div className={`flex items-center ${styles.cardIcon}`}>
            <MdBook size={48} color="#2ecc71" className="mr-5" />
            <h2>Resources</h2>
          </div>

          <p>
            Added resources: <b>{resources?.length}</b>
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
              {displayedResources.map((resource) => (
                <li className="flex justify-between" key={resource.id}>
                  <p className="flex items-center m-0">
                    {supportedTypes.includes(resource.type) && (
                      <SvgIcon
                        apiIcon={resource.resource_icon}
                        className="mr-2"
                        fill="blue"
                        width="35"
                        height="35"
                        viewBox={getViewBox(resource.type)}
                      />
                    )}
                    <span className="font-bold">{resource.title}</span>
                  </p>
                </li>
              ))}
              {Array.isArray(resources) && resources.length === 0 && (
                <span className="text-2xl font-bold">
                  You have not added any resources!
                </span>
              )}

              {resources && resources.length > SLICE_END && (
                <li>
                  <Link to="/dashboard/resources">View All</Link>
                </li>
              )}
            </ul>
          )}
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
          <div className="w-full my-[10px] h-[250px] min-h-[250px] overflow-hidden">
            <img
              src="https://ayrkflghtzmabklwrpap.supabase.co/storage/v1/object/sign/Rewards%20images/Reward-Blog.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJSZXdhcmRzIGltYWdlcy9SZXdhcmQtQmxvZy5wbmciLCJpYXQiOjE3NDE0MzI0NjEsImV4cCI6MTc3Mjk2ODQ2MX0.wDxKTTjocW_FlivK_0fNgAHHJaSjkA2YOz94TCRZFVY"
              alt="rewards image background"
            />
          </div>
          <Link to="/dashboard/rewards" className={styles.navButton}>
            Visit Shop
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
