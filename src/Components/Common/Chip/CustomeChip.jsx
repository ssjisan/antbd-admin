import { Box } from "@mui/material";
import PropTypes from "prop-types";

// Base color definitions
const COLOR_MAP = {
  info: "#2196F3",
  warning: "#FFC107",
  success: "#4CAF50",
  error: "#FF1F00",
  default: "#919EAB",
};

// Status-to-color-type mapping
const STATUS_COLOR_TYPE = {
  enrolled: "info",
  waitlist: "warning",
  confirmed: "success",
  expired: "error",
  no: "default",
  pending: "warning",
  approved: "success",
  rejected: "error",
};

const CustomChip = ({ label = "" }) => {
  const statusKey = label?.toLowerCase();
  const colorType = STATUS_COLOR_TYPE[statusKey] || "default";
  const baseColor = COLOR_MAP[colorType];

  return (
    <Box
      sx={{
        display: "inline-block",
        px: "10px",
        py: "4px",
        fontSize: "14px",
        lineHeight: "12px",
        borderRadius: "20px",
        fontWeight: 500,
        textTransform: "capitalize",
        color: baseColor,
        backgroundColor: `${baseColor}1F`, // 1F = 12% opacity in hex
      }}
    >
      {label}
    </Box>
  );
};

CustomChip.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CustomChip;
