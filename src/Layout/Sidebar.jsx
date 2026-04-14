import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../api/axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import { Logo } from "../assets/Logo";
import Icon from "../Components/Icon";
import { DataContext } from "../DataProcessing/DataProcessing";
const drawerWidth = 260;

function Sidebar(props) {
  const { window } = props;
  const { pathname } = useLocation();
  const { auth } = useContext(DataContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [pages, setPages] = useState([]);
  const canView = (slug) => {
    const perm = auth?.permissions?.find((p) => p.page?.slug === slug);
    return perm?.canView;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAccordionChange = (section) => (event, isExpanded) => {
    setExpanded(isExpanded ? section.name : false);
  };

  // ✅ Fetch pages from API
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await api.get("/get-all-pages");

        setPages(res.data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchPages();
  }, []);

  const drawer = (
    <div className="sidebar">
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
          {pages
            .filter((section) => canView(section.slug))
            .map((section) => {
              const isSectionActive =
                section.children?.some((item) =>
                  pathname.startsWith(item.path),
                ) || pathname === section.path;

              // ✅ If no children → simple link
              if (!section.children || section.children.length === 0) {
                const active = pathname === section.path;

                return (
                  <ListItemButton
                    component={Link}
                    to={section.path}
                    key={section._id}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      borderRadius: "8px",
                      width: "100%",
                      padding: "8px 16px",
                      height: "44px",
                      mb: "8px",
                      background: active && "rgba(239, 229, 255, 1)",
                      color: active ? "#792df8" : "#637381",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "36px" }}>
                      <Icon
                        name={section.icon || "dashboard"}
                        size={20}
                        color={active ? "#792df8" : "#637381"}
                      />
                    </ListItemIcon>

                    <Typography
                      sx={{
                        fontWeight: active ? 600 : 500,
                        fontSize: "14px",
                      }}
                    >
                      {section.name}
                    </Typography>
                  </ListItemButton>
                );
              }

              // ✅ Parent with children → Accordion
              return (
                <Accordion
                  key={section._id}
                  square={false}
                  expanded={expanded === section.name || isSectionActive}
                  onChange={handleAccordionChange(section)}
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "none",
                    boxShadow: "none",
                    margin: "8px 0px",
                    "&::before": {
                      content: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Icon name="arrowdown" color={"#637381"} size={"16px"} />
                    }
                    sx={{
                      minHeight: "32px",
                      backgroundColor: isSectionActive
                        ? "rgba(239, 229, 255, 1)"
                        : "transparent",
                      "&.Mui-expanded": {
                        minHeight: "32px",
                        borderRadius: "8px",
                      },
                      "& .MuiAccordionSummary-content": {
                        margin: 0,
                        padding: "12px 0px",
                        borderRadius: "12px",
                      },
                      "& .MuiAccordionSummary-content.Mui-expanded": {
                        margin: 0,
                        padding: "12px 0px",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "36px" }}>
                      <Icon
                        name={section.icon || "dashboard"}
                        size={20}
                        color={isSectionActive ? "#792df8" : "#637381"}
                      />
                    </ListItemIcon>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: isSectionActive ? 600 : 500,
                        color: isSectionActive ? "#792df8" : "#637381",
                      }}
                    >
                      {section.name}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: "8px 0px 0px 16px" }}>
                    {section.children
                      ?.filter((item) => item.isMenu && canView(item.slug))
                      .map((item) => {
                        const active = pathname === item.path;

                        return (
                          <ListItem
                            disablePadding
                            key={item._id}
                            sx={{
                              borderRadius: "8px",
                              background: active && "rgba(6, 4, 21, 0.04)",
                              mb: "4px",
                            }}
                          >
                            <ListItemButton
                              component={Link}
                              to={item.path}
                              sx={{
                                padding: "8px 16px",
                                color: active ? "#060415" : "#637381",
                                borderRadius: "8px",
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: "24px" }}>
                                <Icon
                                  name="bullet"
                                  color={active ? "#060415" : "#637381"}
                                  size={active ? 12 : 10}
                                />
                              </ListItemIcon>

                              <Typography
                                sx={{
                                  fontWeight: active ? 600 : 500,
                                  fontSize: "14px",
                                }}
                              >
                                {item.name}
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
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
    <Box
      component="nav"
      sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
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
        open
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#F9FAFB",
            borderRightStyle: "dashed",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  window: PropTypes.func,
};
