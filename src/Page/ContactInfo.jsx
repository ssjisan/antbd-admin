import { Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import ContactInfoForm from "../Components/ContactInfoForm/ContactInfoForm";

export default function ContactInfo() {
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
          <Typography variant="h5">Contact Info&apos;s</Typography>
          <ContactInfoForm />
        </Box>
      </Box>
    </Box>
  );
}
