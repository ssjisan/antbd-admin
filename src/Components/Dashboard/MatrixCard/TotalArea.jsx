import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function TotalArea({ count }) {
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
        <img
          src="https://res.cloudinary.com/dr0jcn0ds/image/upload/v1753596811/dashboard/kpi/3d-map_ecwoou.png"
          style={{ width: "100%" }}
        />
      </Box>
      <Stack>
        <Typography variant="h4">{count}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total area covered
        </Typography>
      </Stack>
    </Box>
  );
}
TotalArea.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};