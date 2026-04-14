import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
import Icon from "../Icon";

import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import toast from "react-hot-toast";

export default function PasswordChangeFields() {
  const forBelow776 = useMediaQuery("(max-width:776px)");
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } =
    useContext(DataContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

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
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Password changed successfully");

      // Clear session and force re-login
      sessionStorage.removeItem("auth");

      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleChangePassword}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        width: "100%",
        mt: "40px",
        mb: forBelow776 ? "20px" : "40px",
      }}
    >
      <Stack gap="24px">
        {errorMessage && (
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{
              background: "#FFE9D5",
              p: "8px 16px",
              borderRadius: "12px",
              minHeight: "48px",
            }}
          >
            <Icon name="alert" color="#FF5630" size="24px" />
            <Typography variant="body2" sx={{ color: "#FF5630", ml: 1 }}>
              {errorMessage}
            </Typography>
          </Stack>
        )}

        {/* Current Password */}
        <FormControl variant="outlined" required>
          <InputLabel>Current Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Icon name="eyeon" color="#918EAF" size="24px" />
                  ) : (
                    <Icon name="eyeoff" color="#918EAF" size="24px" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Current Password"
          />
        </FormControl>

        {/* New Password */}
        <FormControl variant="outlined" required>
          <InputLabel>New Password</InputLabel>
          <OutlinedInput
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? (
                    <Icon name="eyeon" color="#918EAF" size="24px" />
                  ) : (
                    <Icon name="eyeoff" color="#918EAF" size="24px" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {/* Confirm Password */}
        <FormControl variant="outlined" required>
          <InputLabel>Confirm New Password</InputLabel>
          <OutlinedInput
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm New Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <Icon name="eyeon" color="#918EAF" size="24px" />
                  ) : (
                    <Icon name="eyeoff" color="#918EAF" size="24px" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>

      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? "Changing..." : "Change Password"}
      </Button>
    </Box>
  );
}
