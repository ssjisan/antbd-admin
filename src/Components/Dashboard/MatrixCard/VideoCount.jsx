import { Box, Stack, Typography } from "@mui/material";
// import { MatrixIconVideos } from "../../../assets/Icons/MatrixIconVideos";
import {  useState } from "react";
export default function VideoCount() {
  const [videos, setVideos] = useState([]);

  
  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "40px 24px",
        display: "flex",
        gap: "24px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "64px", height: "64px" }}>
        <img src="https://res.cloudinary.com/dmyttqosa/image/upload/v1745491938/video_ce5xtk.png" style={{ width: "100%" }} />
      </Box>
      <Stack>
        <Typography variant="h4">{videos.length}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Videos
        </Typography>
      </Stack>
    </Box>
  );
}
