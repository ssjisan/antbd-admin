import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import ChangePasswordForm from "../../Components/User/ChangePasswordForm";
export default function ChangePassword() {
  const drawerWidth = 280;

  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <ChangePasswordForm/>
      </Box>
    </Box>
  );
}
