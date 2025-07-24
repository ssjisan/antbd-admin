import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Edit, More, Remove } from "../../../assets/IconSet";
import PropTypes from "prop-types";
import CustomePopOver from "../../Common/PopOver/CustomePopOver";

export default function Body({
  connectionRequests,
  packages,
  handleCloseMenu,
  handleOpenMenu,
  open,
  selectedRowId,
  setDataToDelete,
  setIsModalOpen,
  redirectEdit,
}) {
  const formatDateTime = (createdAt) => {
    if (!createdAt) return "";
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };
  const getPackageName = (id) => {
    const found = packages.find((pkg) => pkg._id === id);
    return found ? found.packageName : "N/A";
  };
  return (
    <>
      <TableBody>
        {connectionRequests.map((data) => (
          <TableRow key={data._id}>
            <TableCell
              align="left"
              sx={{
                minWidth: "100%",
                maxWidth: "100%",
                p: "0px 14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.name}
            </TableCell>
            <TableCell
              align="left"
              sx={{
                minWidth: 180,
                maxWidth: 180,
                p: "0px 14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.email}
            </TableCell>

            <TableCell
              align="left"
              sx={{
                minWidth: 140,
                maxWidth: 140,
                p: "0px 14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.mobile}
            </TableCell>
            <TableCell
              align="left"
              sx={{
                minWidth: 100,
                maxWidth: 100,
                p: "0px 14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {getPackageName(data.packageId)}
            </TableCell>
            <TableCell
              align="left"
              sx={{
                minWidth: 190,
                maxWidth: 190,
                p: "0px 14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.zone}
            </TableCell>
            <TableCell
              align="left"
              sx={{
                minWidth: 180,
                maxWidth: 180,
                p: "0px 14px",
                whiteSpace: "normal", // allow wrapping
                overflowWrap: "break-word", // break long words if needed
                wordBreak: "break-word", // ensures break in long words
              }}
            >
              {data.fullAddress}
            </TableCell>
            <TableCell
              align="left"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                p: "0px 14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.status}
            </TableCell>
            <TableCell
              align="left"
              sx={{
                minWidth: 180,
                maxWidth: 180,
                p: "0px 14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {formatDateTime(data.createdAt)}
            </TableCell>
            <TableCell
              align="center"
              sx={{
                minWidth: 64,
                maxWidth: 64,
              }}
            >
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

      {/* Action Menu */}
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
  connectionRequests: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      zone: PropTypes.string.isRequired,
      areaName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      coverPhoto: PropTypes.shape({
        url: PropTypes.string,
      }),
      createdAt: PropTypes.string,
    })
  ).isRequired,
  packages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedRowId: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  redirectEdit: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setDataToDelete: PropTypes.func.isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  handleOpenMapModal: PropTypes.func.isRequired,
};
