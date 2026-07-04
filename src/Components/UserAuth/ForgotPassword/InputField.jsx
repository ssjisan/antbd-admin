import { useState } from "react";
import API from "../../../api/axios";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Icon from "../../Icon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function InputField() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const toastId = toast.loading("Sending OTP...");

    try {
      const { data } = await API.post("/forgot-password-otp", {
        email,
      });

      toast.dismiss(toastId);

      if (data.success) {
        toast.success("OTP sent successfully to your email");
        navigate("/verify-otp", {
          state: { email, expiresAt: data.expiresAt },
        });
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.dismiss(toastId);

      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const forBelow776 = useMediaQuery("(max-width:776px)");

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
      <Stack sx={{ width: "100%", maxWidth: "460px" }}>
        <Typography variant="h5">Forgot your password?</Typography>

        <Typography variant="body2" color="text.secondary">
          Please enter the email address associated with your account and
          we&apos;ll email you an <strong>OTP</strong> to reset your password.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
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
            {message && (
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
                  {message}
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
          </Stack>

          <Stack gap="16px">
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
