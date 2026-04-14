import { Box, Grid } from "@mui/material";
import WelcomeCard from "../Components/Dashboard/WelcomeCard/WelcomeCard";
import Matrix from "../Components/Dashboard/Matrix/Matrix";
import MonthlyData from "../Components/Dashboard/MonthlyData/MonthlyData";
import StatusDistribution from "../Components/Dashboard/StatusDistribution/StatusDistribution";
import LatestPendingRequest from "../Components/Dashboard/LatestPendingRequest/LatestPendingRequest";

export default function Dashboard() {
  return (
    <Box>
      <WelcomeCard />
      <Matrix />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <StatusDistribution />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <MonthlyData />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <LatestPendingRequest />
        </Grid>
        {/* <Grid item xs={12} sm={4} md={4} lg={4}>
          <FamousePackages />
        </Grid> */}
      </Grid>
    </Box>
  );
}
