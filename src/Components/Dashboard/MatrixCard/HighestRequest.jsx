import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function HighestRequest({ zone, count }) {
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
          src="https://res.cloudinary.com/dr0jcn0ds/image/upload/v1753598262/dashboard/kpi/highest_daiwn6.png"
          style={{ width: "100%" }}
        />
      </Box>
      <Stack>
        <Typography variant="h4">{zone}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Highest request ({count})
        </Typography>
      </Stack>
    </Box>
  );
}
HighestRequest.propTypes = {
  zone: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};