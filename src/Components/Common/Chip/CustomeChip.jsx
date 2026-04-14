import { Box } from "@mui/material";
import PropTypes from "prop-types";

const COLOR_MAP = {
  info: "#2196F3",
  warning: "#FFC107",
  success: "#4CAF50",
  error: "#FF1F00",
  default: "#919EAB",
};

const CustomChip = ({ label = "", type = "default" }) => {
  const baseColor = COLOR_MAP[type] || COLOR_MAP.default;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: "10px",
        py: "4px",
        fontSize: "13px",
        borderRadius: "4px",
        fontWeight: 500,
        textTransform: "capitalize",
        color: baseColor,
        backgroundColor: `${baseColor}33`,
      }}
    >
      {label}
    </Box>
  );
};

CustomChip.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["info", "warning", "success", "error", "default"]),
};

export default CustomChip;
