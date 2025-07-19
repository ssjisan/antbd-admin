import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function AlbumCount() {
    const [albums, setAlbums] = useState([]);
  
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
      <Box sx={{width:"64px", height:"64px"}}>
        <img src="https://res.cloudinary.com/dmyttqosa/image/upload/v1745491939/album_rebzru.png" style={{width:"100%"}}/>
      </Box>
      <Stack>
        <Typography variant="h4">{albums.length}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Album
        </Typography>
      </Stack>
    </Box>
  );
}
