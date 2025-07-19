import { MenuItem, Popover } from "@mui/material";
import PropTypes from "prop-types";

export default function CustomePopOver({
  open,
  anchorEl,
  onClose,
  menuItems = [],
}) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            width: 180,
            p: "4px",
            borderRadius: "8px",
            boxShadow: "-20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
          },
        },
      }}
    >
      {menuItems.map(
        (
          { label, icon: Icon, onClick, color = "#838383", hide = false },
          index
        ) =>
          !hide && (
            <MenuItem
              key={index}
              onClick={onClick}
              sx={{
                display: "flex",
                alignItems:"center",
                gap: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight:"400",
                color:
                  color === "error"
                    ? "error.main"
                    : color === "success"
                    ? "#6cba46"
                    : "#060415",
              }}
            >
              {Icon && (
                <Icon
                  color={
                    color === "error"
                      ? "red"
                      : color === "success"
                      ? "#6cba46"
                      : color
                  }
                  size={16}
                />
              )}
              {label}
            </MenuItem>
          )
      )}
    </Popover>
  );
}
CustomePopOver.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType, // Component like EyeBold, Edit, etc.
      onClick: PropTypes.func.isRequired,
      color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf(["error"]),
      ]),
      hide: PropTypes.bool,
    })
  ),
};
