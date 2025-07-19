import { Box, Table } from "@mui/material";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import CustomePagination from "../../Common/Table/CustomePagination";
import PropTypes from "prop-types";
import Body from "./View/Body";
import { useRef } from "react";

export default function View({
  zones,
  onDragEnd,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  handleCloseMenu,
  handleOpenMenu,
  open,
  selectedRowId,
  dataToDelete,
  setDataToDelete,
  setIsModalOpen,
  redirectEdit,
}) {
  // ***************** Table Header Columns ************************* //
  const tableRef = useRef(null);

  const columns = [
    { key: "name", label: "Zone" },
    { key: "officeAddress	", label: "Office Address" },
    { key: "time", label: "Created at" },
  ];

  // ***************** Table Header Columns ************************* //
  return (
    <Box
      sx={{
        
        borderRadius: "16px",
       
        mt: 3,
      }}
    >
      <Box
        sx={{
          overflowX: "auto",
          maxWidth: "100%",
          mb: 1,
        }}
        ref={tableRef}
      >
        <Table>
          <CustomeHeader
            columns={columns}
            includeActions={true}
            includeDrag={false}
          />
          <Body
            zones={zones.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            onDragEnd={onDragEnd}
            page={page}
            rowsPerPage={rowsPerPage}
            handleCloseMenu={handleCloseMenu}
            handleOpenMenu={handleOpenMenu}
            open={open}
            selectedRowId={selectedRowId}
            dataToDelete={dataToDelete}
            setDataToDelete={setDataToDelete}
            setIsModalOpen={setIsModalOpen}
            redirectEdit={redirectEdit}
          />
        </Table>
      </Box>
      <CustomePagination
        count={zones.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Box>
  );
}
View.propTypes = {
  zones: PropTypes.array.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  open: PropTypes.any, // could be an element or null
  selectedRowId: PropTypes.any, // id could be string, number, object
  dataToDelete: PropTypes.object, // object or null
  setDataToDelete: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  redirectEdit: PropTypes.func.isRequired,
};
