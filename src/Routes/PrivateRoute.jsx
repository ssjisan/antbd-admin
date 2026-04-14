import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataProcessing/DataProcessing";
import { Outlet, Navigate } from "react-router-dom";
import axios from "../api/axios";
import Loading from "./Loading";

export default function PrivateRoute() {
  const { auth } = useContext(DataContext);

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get("/auth-check");
        setIsAuthenticated(!!data?.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [auth?.token]);

  if (loading) return <Loading />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
