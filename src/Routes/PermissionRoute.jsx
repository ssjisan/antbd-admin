import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DataContext } from "../DataProcessing/DataProcessing";
import { hasPermission } from "../lib/hasPermission";
import Loading from "./Loading";

export default function PermissionRoute() {
  const { auth } = useContext(DataContext);
  const location = useLocation();

  if (!auth?.user) return null;

  const slug =
    location.pathname === "/" ? "dashboard" : location.pathname.split("/")[1];

  const allowed = hasPermission(auth.permissions, slug, "canView");

  if (!allowed) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (!auth?.user || !auth?.permissions) {
    return <Loading />;
  }
  return <Outlet />;
}
