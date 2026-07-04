import { Box, Grid, Stack, Typography } from "@mui/material";
import InputFields from "../Components/UserAuth/ResetPassword/InputField";
import { Logo } from "../assets/Logo";

export default function ResetPassword() {
  return (
    <Box sx={{ position: "relative" }}>
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
        <Logo width={"48px"} height={"48px"} />
      </Stack>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              background: "#f3f3f3",
              px: "24px",
              py: "72px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              minHeight: "100vh",
              boxSizing: "border-box",
            }}
          >
            <Stack
              sx={{ width: "100%" }}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h3">Hi! Welcome back</Typography>
              <Typography variant="body" color="text.secondary">
                Smarter workflows for better efficiency.
              </Typography>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <img src="image2.png" width="80%" />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={8}>
          <InputFields />
        </Grid>
      </Grid>
    </Box>
  );
}
