import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import toast from "react-hot-toast";
import Icon from "../../Icon";

export default function InputFields() {
  const forBelow776 = useMediaQuery("(max-width:776px)");
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } =
    useContext(DataContext);
  const { setAuth } = useContext(DataContext);
  const [lockSeconds, setLockSeconds] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // ---------------------------
  // Lock timer
  // ---------------------------
  useEffect(() => {
    if (lockSeconds <= 0) return;

    const timer = setInterval(() => {
      setLockSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [lockSeconds]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ---------------------------
  // Save Auth (clean helper)
  // ---------------------------
  const saveAuth = (data) => {
    const minimalUser = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    };

    // ✅ store minimal only
    localStorage.setItem(
      "auth",
      JSON.stringify({
        token: data.token,
        user: minimalUser,
        permissions: data.user.permissions,
      }),
    );

    // ✅ full data stays in memory (safe for UI)
    setAuth({
      token: data.token,
      user: minimalUser,
      permissions: data.user.permissions,
    });
  };

  // ---------------------------
  // Login
  // ---------------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const { data } = await axios.post("/login", {
        email,
        password,
      });
      saveAuth(data);

      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      const response = err.response;

      // 🔒 Account lock
      if (response?.status === 423) {
        setLockSeconds(response.data.remainingSeconds);
        setErrorMessage("Account locked. Try again later.");
        return;
      }

      // 🔐 Force password change
      if (response?.status === 403 && response?.data?.forcePasswordChange) {
        saveAuth({
          token: response.data.token,
          user: {
            id: response.data._id,
          },
        });

        toast.error("You must change your password");
        navigate("/password-change");
        return;
      }

      setErrorMessage(
        response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      sx={{
        px: 4,
        height: "100%",
        minHeight: { xs: "80vh", sm: "80vh", md: "100vh" },
        boxSizing: "border-box",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack sx={{ width: "100%", maxWidth: "420px" }}>
        <Typography variant="h5">Sign in to your account</Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
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

            <TextField
              label="Your Email"
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              required
              inputProps={{
                autoComplete: "email",
              }}
            />

            <FormControl variant="outlined" required>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{
                  autoComplete: "current-password",
                }}
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
                label="Password"
              />
            </FormControl>
          </Stack>

          <Stack gap="16px">
            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography
                variant="body2"
                onClick={() => navigate("/forgot-password")}
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Typography>{" "}
            </Stack>
            <Button
              variant="contained"
              type="submit"
              disabled={loading || lockSeconds > 0}
            >
              {lockSeconds > 0
                ? `Locked (${formatTime(lockSeconds)})`
                : loading
                  ? "Logging in..."
                  : "Login"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
