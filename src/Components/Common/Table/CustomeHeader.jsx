import { TableCell, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";

export default function CustomeHeader({
  columns = [],
  includeDrag = false,
  includeActions = false,
}) {
  return (
    <TableHead sx={{ borderRadius: "1em 0 0 1em" }}>
      <TableRow>
        {includeDrag && (
          <TableCell align="center" sx={{ width: "64px" }}></TableCell>
        )}
        {columns.map((col) => (
          <TableCell
            key={col.key}
            align={col.align || "left"}
            sx={{ p: includeDrag === false ? "16px" : "16px 8px" }}
          >
            {col.label}
          </TableCell>
        ))}
        {includeActions && (
          <TableCell align="center" sx={{ width: "88px" }}></TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}
CustomeHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "center", "right"]),
    })
  ).isRequired,
  includeActions: PropTypes.bool,
  includeDrag: PropTypes.bool,
};
