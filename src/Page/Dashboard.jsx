import { Box, Toolbar, useMediaQuery } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import MatrixCardDeck from "../Components/Dashboard/MatrixCardDeck";
import WelcomeCard from "../Components/Dashboard/WelcomeCard/WelcomeCard";


export default function Dashboard() {
  const drawerWidth = 280;
  const forBelow1200 = useMediaQuery("(min-width:1200px)");

  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: forBelow1200 ? 3 : 2,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Box>
          <WelcomeCard />
          <MatrixCardDeck />
        </Box>
      </Box>
    </Box>
  );
}
