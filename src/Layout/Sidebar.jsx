import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  ListItem,
  ListItemButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Navbar from "./Navbar";
import navConfig from "./Common/NavConfig";
import "./Scrollbar.css";
import { ArrowDown, Bullet } from "../assets/IconSet";
import { Logo } from "../assets/Logo";

const drawerWidth = 260;

function Sidebar(props) {
  const { window } = props;
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAccordionChange = (section) => (event, isExpanded) => {
    setExpanded(isExpanded ? section.title : false);
  };

  const ListItemSx = {
    borderRadius: "8px",
    width: "100%",
    height: "36px",
    mb: "4px",
    display: "flex",
  };

  const ListItemButtonSx = {
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: "8px",
    width: "100%",
    padding: "8px 16px",
    height: "36px",
  };

  const drawer = (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          p: "16px",
        }}
      >
        <Box sx={{ ml: "24px" }}>
          <Logo width={"56px"} height={"56px"} />
        </Box>
        <List>
          {navConfig({ pathname }).map((section) => {
            // ✅ Section active logic includes extraActivePaths
            const isSectionActive =
              section.items.some((item) => pathname === item.link) ||
              (section.extraActivePaths &&
                section.extraActivePaths.some((path) =>
                  pathname.startsWith(path)
                ));

            return section.items.length === 1 ? (
              <ListItemButton
                component={Link}
                to={section.items[0].link}
                key={section.items[0].title}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  borderRadius: "8px",
                  width: "100%",
                  padding: "8px 16px",
                  height: "44px",
                  mb: "8px",
                   
                  background:
                    pathname === section.items[0].link &&
                    "rgba(239, 229, 255, 1)",
                  color:
                    pathname === section.items[0].link ? "#792df8" : "#637381",
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  {section.icon}
                </ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: pathname === section.items[0].link ? 600 : 500,
                    fontSize: "14px",
                  }}
                >
                  {section.items[0].title}
                </Typography>
              </ListItemButton>
            ) : (
              <Accordion
                square={false}
                key={section.title}
                expanded={expanded === section.title || isSectionActive}
                sx={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "none",
                  "&::before": {
                    content: "none",
                  },
                  boxShadow: "none",
                  margin: "8px 0px",
                  "&.Mui-expanded": {
                    margin: "8px 0px",
                  },
                }}
                onChange={handleAccordionChange(section)}
              >
                <AccordionSummary
                  expandIcon={<ArrowDown color={"#637381"} size={"16px"} />}
                  aria-controls={`${section.title}-content`}
                  id={`${section.title}-header`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minHeight: "44px",
                    margin: "0px",
                    backgroundColor: isSectionActive
                      ? "rgba(239, 229, 255, 1)"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "#eff0f2",
                    },
                    "&.Mui-expanded": {
                      minHeight: "44px",
                      height: "44px",
                      borderRadius: "8px",
                    },
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                      display: "flex",
                      width: "100%",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    {section.icon}
                  </ListItemIcon>
                  <Typography
                    variant="overline"
                    color={isSectionActive ? "#792df8" : "#637381"}
                    sx={{
                      fontSize: "14px",
                      textTransform: "none",
                      fontWeight: isSectionActive ? 600 : 500,
                    }}
                  >
                    {section.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: "8px 0px 0px 16px" }}>
                  {section.items.map((item) => (
                    <ListItem
                      disablePadding
                      sx={{
                        ...ListItemSx,
                        background:
                          pathname === item.link && "rgba(6, 4, 21, 0.04)",
                      }}
                      key={item.title}
                    >
                      <ListItemButton
                        component={Link}
                        to={item.link}
                        sx={{
                          ...ListItemButtonSx,
                          color: pathname === item.link ? "#060415" : "#637381",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "24px" }}>
                          <Bullet
                            color={
                              pathname === item.link ? "#060415" : "#637381"
                            }
                            size={pathname === item.link ? 12 : 10}
                          />
                        </ListItemIcon>
                        <Typography
                          sx={{
                            fontWeight: pathname === item.link ? 600 : 500,
                            fontSize: "14px",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        className="sidebar"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F9FAFB",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#F9FAFB",
              borderRightStyle: "dashed",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Sidebar;