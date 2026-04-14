import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "../assets/Logo";
import PasswordChangeFields from "../Components/Login/PasswordChangeFields";

export default function PasswordChange() {
  const forBelow776 = useMediaQuery("(max-width:776px)");

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/1.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: 1,
          opacity: 0.32,
        }}
      />

      {/* Fixed Navbar */}
      <Stack
        sx={{
          p: "16px 24px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <Logo width={"64px"} height={"64px"} />
      </Stack>

      {/* Content Section */}
      <Container
        sx={{
          height: "100vh", // full height minus navbar height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            padding: forBelow776 ? "0px 20px" : "0px 40px",
            maxWidth: "472px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "4px solid #fff",
            borderRadius: "20px",
            background: "#fff",
            width: "100%",
            boxShadow: "0 24px 48px 0 rgba(145, 158, 171, 0.16)", // << add this line
          }}
        >
          <Box sx={{ padding: forBelow776 ? "20px 0px" : "40px 0px" }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Change password
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "center" }}
              color="text.secondary"
            >
              For login to the system please change your password first.
            </Typography>
          </Box>
          <PasswordChangeFields />
        </Box>
      </Container>
    </Box>
  );
}
