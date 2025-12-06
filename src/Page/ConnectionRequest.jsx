import { Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import View from "../Components/ConnectionRequest/View";

export default function ConnectionRequest() {
  const drawerWidth = 260;
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
          <Typography variant="h5">All connection requests</Typography>
          <View />
        </Box>
      </Box>
    </Box>
  );
}
