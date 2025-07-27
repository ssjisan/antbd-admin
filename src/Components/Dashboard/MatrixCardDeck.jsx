import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import HighestRequest from "./MatrixCard/HighestRequest";
import TotalArea from "./MatrixCard/TotalArea";
import TotalPackage from "./MatrixCard/TotalPackage";
import ConnectionRequest from "./MatrixCard/ConnectionRequest";

export default function MatrixCardDeck() {
  const [summary, setSummary] = useState({
    totalRequests: 0,
    totalAreas: 0,
    totalPackages: 0,
    topZone: { zone: "", count: 0 },
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/summary");
        setSummary(res.data);
        toast.success("Dashboard data loaded successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchSummary();
  }, []);

  return (
    <Box sx={{ mt: "40px", mb: "40px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <ConnectionRequest count={summary.totalRequests} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <TotalPackage count={summary.totalPackages} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <TotalArea count={summary.totalAreas} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <HighestRequest zone={summary.topZone.zone} count={summary.topZone.count} />
        </Grid>
      </Grid>
    </Box>
  );
}
