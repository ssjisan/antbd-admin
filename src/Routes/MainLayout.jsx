import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Navbar from "../Layout/Navbar";

export default function MainLayout() {
  const forBelow1200 = useMediaQuery("(min-width:1200px)");

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Navbar />
        <Toolbar />
        <Box p={forBelow1200 ? 3 : 2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
