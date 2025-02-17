import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Components
import NotFoundPage from "./shared/pages/NotFoundPage";
import Loading from "./shared/utils/loader/Loading";

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
const ProfilePage = lazy(() => import("./app/pages/profile/Profile"));

//Layouts
const LandingLayout = lazy(() => import("./landing/LandingLayout"));
const AuthLayout = lazy(() => import("./auth/AuthLayout"));
const AppLayout = lazy(() => import("./app/AppLayout"));

function App() {
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
        <Route path={"dashboard"} element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
