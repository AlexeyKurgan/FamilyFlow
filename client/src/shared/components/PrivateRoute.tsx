import React, { useEffect, useState } from "react";
import Loading from "../utils/loader/Loading";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IAuthState } from "../../auth/types/authUser";

interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { session } = useSelector((state: { auth: IAuthState }) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading, session]);

  if (isLoading) {
    return <Loading />;
  }
  return session ? children : <Navigate to="/" />;
};

export default PrivateRoute;
