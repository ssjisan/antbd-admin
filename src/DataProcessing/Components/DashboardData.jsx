import { useEffect, useState } from "react";
import axios from "../../api/axios";
export default function DashboardData() {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);

  const [kpi, setKpi] = useState(null);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [packagePopularity, setPackagePopularity] = useState([]);
  const [insights, setInsights] = useState([]);

  const fetchDashboard = async () => {
    try {
      setDashboardLoading(true);

      const res = await axios.get("/summary");

      const data = res.data.data;

      setKpi(data.kpi);
      setStatusDistribution(data.statusDistribution);
      setMonthlyTrend(data.monthlyTrend);
      setRecentRequests(data.latestPendingRequests);
      setPackagePopularity(data.topPackagesRaw);
      setInsights(data.insights);

      setDashboardError(null);
    } catch (err) {
      setDashboardError(err.message || "Dashboard load failed");
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    kpi,
    statusDistribution,
    monthlyTrend,
    recentRequests,
    packagePopularity,
    insights,
    dashboardLoading,
    dashboardError,
    refetchDashboard: fetchDashboard,
  };
}
