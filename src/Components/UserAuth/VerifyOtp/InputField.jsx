import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Icon from "../../Icon";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function InputField() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const expiresAt = location.state?.expiresAt;

  useEffect(() => {
    if (!expiresAt) return;

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAt - Date.now()) / 1000),
      );

      setTimeLeft(remaining);
    };

    // Show immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    if (!email || !expiresAt) {
      toast.error("Your password reset session has expired. Please try again.");
      navigate("/forgot-password", { replace: true });
    }
  }, [email, expiresAt, navigate]);

  // ✅ VERIFY OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await API.post("/verify-otp", {
        email,
        otp,
      });

      if (data.success) {
        toast.success("OTP verified successfully");
        navigate("/reset-password", {
          state: { email, resetToken: data.resetToken },
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const handleResend = async () => {
    setResendLoading(true);

    const toastId = toast.loading("Resending OTP...");

    try {
      const { data } = await API.post("/resend-otp", { email });

      toast.dismiss(toastId);

      if (data.success) {
        toast.success("OTP sent successfully");

        // 🔥 sync backend timer
        setTimeLeft(data.retryAfter || 90);
      } else {
        toast.error(data.message);

        if (data.retryAfter) {
          setTimeLeft(data.retryAfter);
        }
      }
    } catch (error) {
      toast.dismiss(toastId);

      const msg = error.response?.data?.message || "Failed to resend OTP";

      toast.error(msg);

      if (error.response?.data?.retryAfter) {
        setTimeLeft(error.response.data.retryAfter);
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Stack
      sx={{
        px: 4,
        height: "100%",
        minHeight: { xs: "80vh", md: "100vh" },
        boxSizing: "border-box",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack sx={{ width: "100%", maxWidth: "460px" }}>
        <Typography variant="h5">Verify OTP</Typography>

        <Typography variant="body2" color="text.secondary">
          We&lsquo;ve sent a 6-digit verification code to{" "}
          <strong>{email}</strong>. Enter the code below to continue.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            mt: 4,
          }}
        >
          {/* ERROR MESSAGE */}
          {message && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                background: "#FFE9D5",
                p: "8px 16px",
                borderRadius: "12px",
              }}
            >
              <Icon name="alert" color="#FF5630" size="24px" />
              <Typography sx={{ color: "#FF5630", ml: 1 }}>
                {message}
              </Typography>
            </Stack>
          )}

          {/* OTP INPUT */}
          <TextField
            label="OTP"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            required
          />

          {/* VERIFY BUTTON */}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          {/* RESEND SECTION */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Typography>Didn&apos;t receive the code?</Typography>

            {timeLeft > 0 ? (
              <Typography color="text.secondary">{timeLeft}s</Typography>
            ) : (
              <Typography
                onClick={!resendLoading ? handleResend : undefined}
                sx={{
                  fontWeight: 600,
                  cursor: resendLoading ? "not-allowed" : "pointer",
                  color: "primary.main",
                  opacity: resendLoading ? 0.6 : 1,
                }}
              >
                {resendLoading ? "Sending..." : "Resend"}
              </Typography>
            )}
          </Stack>

          {/* BACK BUTTON */}
          <Button
            variant="text"
            startIcon={<Icon name="arrowleft" size="20px" color="#792DF8" />}
            onClick={() => navigate("/login")}
          >
            Back to login
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
