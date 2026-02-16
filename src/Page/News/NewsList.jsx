import { Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AllNewsList from "../../Components/News/AllNews/AllNewsList";

export default function NewsList() {
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
          <Typography variant="h5" sx={{ mb: "48px" }}>
            All News
          </Typography>
          <AllNewsList />
        </Box>
      </Box>
    </Box>
  );
}
