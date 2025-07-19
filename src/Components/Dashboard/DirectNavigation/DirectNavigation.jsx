import { Box } from "@mui/material";

export default function DirectNavigation() {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        height: "100%", // Full height to match SupportCard
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src="https://res.cloudinary.com/dmyttqosa/image/upload/v1730748281/user_panel/zqobxzgsa8rtdxjgqnaq.png"
        alt="event"
        width="100%"
        height="100%"
        style={{
          objectFit: "cover",
        }}
      />
    </Box>
  );
}
