import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { useContext } from "react";

export default function WelcomeCard() {
  const forBelow676 = useMediaQuery("(max-width:676px)");
  const { auth } = useContext(DataContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: forBelow676 && "column",
        background: "url(bg.png)",
        borderRadius: "16px",
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: " center center",
      }}
    >
      <Box
        sx={{
          p: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        <Stack gap="8px">
          <Typography variant="h4" sx={{ width: "100%" }} color="text.primary">
            Welcome back <br /> {auth?.user?.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Everything you need is organized here — explore, manage, and stay
            updated.
          </Typography>
        </Stack>
        <a href="https://insighttechglobal.com/" target="_blank">
          <Button variant="contained">Visit website</Button>
        </a>
      </Box>
    </Box>
  );
}
