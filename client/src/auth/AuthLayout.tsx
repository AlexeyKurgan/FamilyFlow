import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();

  if (location.pathname === "/auth") {
    return <Navigate to={location.pathname + "/login"} />;
  }

  return (
    <>
      <div className="h-[calc(100vh-0px)] max-sm:h-[calc(100vh-100px)]">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
