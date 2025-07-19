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
import { EyeOff, EyeOn } from "../../assets/IconSet";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../DataProcessing/DataProcessing";

export default function ChangePasswordForm() {
  const { auth, setAuth } = useContext(DataContext);

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
    setLoading(true);
    try {
      const { data } = await axios.post("/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message || "Password changed successfully!");
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        toast.error(error.response?.data?.error || "Something went wrong.");
      }
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
                    <EyeOff color="#918EAF" size="24px" />
                  ) : (
                    <EyeOn color="#918EAF" size="24px" />
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
                    <EyeOff color="#918EAF" size="24px" />
                  ) : (
                    <EyeOn color="#918EAF" size="24px" />
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
                    <EyeOff color="#918EAF" size="24px" />
                  ) : (
                    <EyeOn color="#918EAF" size="24px" />
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
