import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import AccountPopOver from "./AccountPopOver";
import Icon from "../Components/Icon";

const drawerWidth = 260;
// eslint-disable-next-line
export default function Navbar({ handleDrawerToggle }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { lg: `calc(100% - ${drawerWidth}px)` },
        ml: { lg: `${drawerWidth}px` },
      }}
      style={{
        backgroundColor: "rgba(249, 250, 251, 0.8)",
        boxShadow: "none",
        backdropFilter: "blur(6px)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: {
            xs: "space-between",
            sm: "space-between",
            md: "space-between",
            lg: "flex-end",
          },
        }}
      >
        <IconButton
          color="default"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { lg: "none" } }}
        >
          <Icon name="burgermenu" color="#031E21" size={24} />
        </IconButton>
        <Stack direction="row" justifyContent="center">
          <AccountPopOver />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
