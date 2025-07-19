import {
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import CustomePopOver from "../../../Common/PopOver/CustomePopOver";
import { Edit, More, Remove } from "../../../../assets/IconSet";
import PropTypes from "prop-types";

// Utility to format timestamp
const formatDateTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};

export default function Body({
  zones,
  handleCloseMenu,
  handleOpenMenu,
  open,
  selectedRowId,
  setDataToDelete,
  setIsModalOpen,
  redirectEdit,
}) {
  return (
    <>
      <TableBody>
        {zones.map((data) => (
          <TableRow key={data._id}>
            <TableCell align="left">
              <Tooltip title={data.name}>
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    p: "0px 14px",
                  }}
                >
                  {data.name}
                </Box>
              </Tooltip>
            </TableCell>

            <TableCell align="left" sx={{ p: "0px 14px" }}>
              {data.officeLocation}
            </TableCell>

            <TableCell align="left" sx={{ p: "0px 14px", width:"280px" }}>
              {formatDateTime(data.timestamp)}
            </TableCell>

            <TableCell align="center">
              <Tooltip title="Actions">
                <IconButton
                  sx={{ width: "40px", height: "40px" }}
                  onClick={(event) => handleOpenMenu(event, data)}
                >
                  <More color="#919EAB" size={24} />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <CustomePopOver
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        menuItems={[
          {
            label: "Edit",
            icon: Edit,
            onClick: () => {
              redirectEdit(selectedRowId);
              handleCloseMenu();
            },
          },
          {
            label: "Delete",
            icon: Remove,
            onClick: () => {
              setDataToDelete(selectedRowId);
              setIsModalOpen(true);
              handleCloseMenu();
            },
            color: "error",
          },
        ]}
      />
    </>
  );
}

Body.propTypes = {
  zones: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      officeLocation: PropTypes.string.isRequired,
      timestamp: PropTypes.string, // make optional if not always present
    })
  ).isRequired,
  selectedRowId: PropTypes.object,
  redirectEdit: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  setDataToDelete: PropTypes.func.isRequired,
};
