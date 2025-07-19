import { TablePagination, Box } from "@mui/material";
import { DownArrow } from "../../../assets/IconSet";
import PropTypes from "prop-types";

export default function CustomePagination({
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  const DownArrowIcon = () => <DownArrow color="#060415" size={20} />;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
        slotProps={{
          select: {
            IconComponent: DownArrowIcon,
          },
        }}
        sx={{
          borderBottom: "none",
          borderTop: "1px solid rgba(145, 158, 171, 0.24)",
          width: "100%",
        }}
      />
    </Box>
  );
}

CustomePagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};
