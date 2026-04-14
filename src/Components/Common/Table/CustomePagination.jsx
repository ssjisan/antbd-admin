import { TablePagination } from "@mui/material";
import Icon from "../../Icon";
import PropTypes from "prop-types";

export default function CustomePagination({
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  const DownArrowIcon = () => (
    <Icon name="downarrow" color="#060415" size={20} />
  );

  return (
    <TablePagination
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
      }}
    />
  );
}
CustomePagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};
