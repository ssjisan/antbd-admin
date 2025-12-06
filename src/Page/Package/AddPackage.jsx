import { Box, Toolbar, useMediaQuery } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import Add from "../../Components/Package/AddPackage/Add";

export default function AddPackage() {
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
        <Add/>
      </Box>
    </Box>
  );
}
