import {
  Typography,
  Menu,
  MenuItem,
  Box,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { Link, useNavigate } from "react-router-dom";

export default function AccountPopOver() {
  //Styling Variables
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const MenuSx = {
    mt: "32px",
    "& .MuiPaper-root": {
      overflow: "visible",
      borderRadius: "12px",
      filter: "drop-shadow(0px 0px 2px rgba(145, 158, 171, 0.24))",
      mt: 1.5,
      boxShadow: "-20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
      padding: "8px 16px",
    },
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
  };
  const UserInfoSx = {
    width: "220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    mb: "16px",
  };
  const AvatarSx = {
    width: "32px",
    height: "32px",
    borderRadius: "100%",
    overflow: "hidden",
    transition: "transform 0.3s ease", // Adding transition for smooth scaling
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };
  const linkStyle = {
    textDecoration: "none",
    fontWeight: 600,
    borderRadius: "4px",
  };
  const [accountPopOver, setAccountPopOver] = useState(false);
  const handleOpenPopOver = (event) => {
    setAccountPopOver(event.currentTarget);
  };
  const handleClosePopOver = () => {
    setAccountPopOver(null);
  };

  // Handle Log OUT
  const { auth, setAuth } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <IconButton
        sx={{
          border: "1px solid #dfdfdf",
          width: "40px",
          height: "40px",
          p: "4px !important",
        }}
        onClick={handleOpenPopOver}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Avatar src="https://res.cloudinary.com/dmyttqosa/image/upload/v1745492633/avatar_etniw4.jpg" sx={AvatarSx}></Avatar>
      </IconButton>
      <Box>
        <Menu
          sx={MenuSx}
          id="menu-appbar"
          anchorEl={accountPopOver}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={accountPopOver}
          onClose={handleClosePopOver}
        >
          <Box sx={UserInfoSx}>
            <Typography variant="body2" color="text.primary">
              {auth?.user?.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {auth?.user?.role === 0
                ? "Super Admin"
                : auth?.user?.role === 1
                ? "Admin"
                : "Moderator"}{" "}
            </Typography>
          </Box>
          <Divider variant="middle" sx={{ borderStyle: "dashed" }} />
          <Link to="/change_password" style={linkStyle}>
            <MenuItem
              sx={{
                mt: "8px",
              }}
            >
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              >
                Change Password
              </Typography>
            </MenuItem>
          </Link>
          <MenuItem
            sx={{
              mt: "8px",
            }}
            onClick={handleLogout}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#FF4842",
              }}
            >
              Log Out
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
