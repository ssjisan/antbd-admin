import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../DataProcessing/DataProcessing";
import Icon from "../Icon";

export default function ChangePasswordForm() {
  const { setAuth } = useContext(DataContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  // State for password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      const storedAuth = JSON.parse(sessionStorage.getItem("auth"));
      const token = storedAuth?.token;

      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      await axios.post(
        "/change-password",
        {
          currentPassword: oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Password changed successfully");

      // Clear session properly
      sessionStorage.removeItem("auth");

      setAuth({ user: null, token: "" });

      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box sx={{ p: "24px 24px 0px 0px" }}>
        <Typography variant="h4">Change your password</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "100%",
          width: "420px",
          mt: "40px",
          mb: "160px",
        }}
      >
        <FormControl variant="outlined">
          <InputLabel>Old Password</InputLabel>
          <OutlinedInput
            id="old-password"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? (
                    <Icon name="eyeoff" color="#918EAF" size="24px" />
                  ) : (
                    <Icon name="eyeon" color="#918EAF" size="24px" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Old Password"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel>New Password</InputLabel>
          <OutlinedInput
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? (
                    <Icon name="eyeoff" color="#918EAF" size="24px" />
                  ) : (
                    <Icon name="eyeon" color="#918EAF" size="24px" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <Icon name="eyeoff" color="#918EAF" size="24px" />
                  ) : (
                    <Icon name="eyeon" color="#918EAF" size="24px" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
        {message && (
          <Typography
            color={message.includes("successfully") ? "green" : "red"}
          >
            {message}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleChangePassword}
          disabled={loading}
          endIcon={loading ? <img src="/spinner.gif" width="24px" /> : null}
        >
          Change
        </Button>
      </Box>
    </>
  );
}
