import React, { useEffect, useState } from "react";
import Loading from "../utils/loader/Loading";
import { Navigate } from "react-router-dom";
import { checkUserSession } from "../../auth/api/utils/userUtils";
import { Session } from "@supabase/supabase-js";

interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      setIsLoading(true);
      const currentSession = await checkUserSession();
      setSession(currentSession);
      setIsLoading(false);
    };

    if (!session) {
      verifySession();
    } else {
      setIsLoading(false);
    }
  }, [isLoading, session]);

  if (isLoading) {
    return <Loading />;
  }
  return session ? children : <Navigate to="/" />;
};

export default PrivateRoute;
