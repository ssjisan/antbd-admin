import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { BurgerMenu } from "../assets/IconSet";
import AccountPopOver from "./Common/AccountPopOver";

const drawerWidth = 280;
// eslint-disable-next-line
export default function Navbar({ handleDrawerToggle }) {
  // eslint-disable-next-line
  const forBelow1100 = useMediaQuery("(min-width:1100px)");

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
          <BurgerMenu color="#031E21" size={24} />
        </IconButton>
        <Stack direction="row" justifyContent="center">
          <AccountPopOver/>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
