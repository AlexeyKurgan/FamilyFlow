import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Components
import NotFoundPage from "./shared/pages/NotFoundPage";
import Loading from "./shared/utils/loader/Loading";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AlertMUI from "./shared/components/alerts/Alert";
import PrivateRoute from "./shared/components/PrivateRoute";
import TasksPage from "./app/pages/tasks/TasksPage";
import ResourcesPage from "./app/pages/resources/ResourcesPage";
import IntegrationsPage from "./app/pages/integrations/IntegrationsPage";
import SettingsPage from "./app/pages/settings/SettingsPage";
import AchievementPage from "./app/pages/achievement/AchievementPage";
import RewardsShopPage from "./app/pages/pointstAssignments/RewardsShopPage";

// Lazy loading
// Landing Pages
const Home = lazy(() => import("./landing/pages/Home"));
const AboutUs = lazy(() => import("./landing/pages/AboutUs"));

// Auth Pages
const Login = lazy(() => import("./auth/pages/LoginPage"));
const Registration = lazy(() => import("./auth/pages/SignUpPage"));
const ForgotPassword = lazy(() => import("./auth/pages/ForgotPasswordPage"));

// Application pages
const DashboardPage = lazy(() => import("./app/pages/dashboard/Dashboard"));
const ProfilePage = lazy(() => import("./app/pages/profile/ProfilePage"));

//Layouts
const LandingLayout = lazy(() => import("./landing/LandingLayout"));
const AuthLayout = lazy(() => import("./auth/AuthLayout"));
const AppLayout = lazy(() => import("./app/AppLayout"));

function App() {
  const { show, message, severity } = useSelector(
    (state: RootState) => state.alert
  );

  return (
    <Suspense
      fallback={
        <Loading stroke="black" rectFill="#ffffff" maskFill="#FABB18" />
      }
    >
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Registration />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route
          path={"dashboard"}
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="rewards_shop" element={<RewardsShopPage />} />
          <Route path="achievement" element={<AchievementPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {show && <AlertMUI message={message} severity={severity} show={show} />}
    </Suspense>
  );
}

export default App;
