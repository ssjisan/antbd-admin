import {
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import CustomePopOver from "../../../Common/PopOver/CustomePopOver";
import Icon from "../../../Icon";
import PropTypes from "prop-types";

export default function Body({
  packages,
  handleCloseMenu,
  handleOpenMenu,
  open,
  selectedRowId,
  setDataToDelete,
  setIsModalOpen,
  redirectEdit,
  permissions,
  hasActions,
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

  const menuItems = [
    permissions?.canUpdate && {
      label: "Edit",
      iconName: "Edit",
      onClick: () => {
        redirectEdit(selectedRowId);
        handleCloseMenu();
      },
    },

    permissions?.canDelete && {
      label: "Delete",
      iconName: "Remove",
      color: "error",
      onClick: () => {
        setDataToDelete(selectedRowId);
        setIsModalOpen(true);
        handleCloseMenu();
      },
    },
  ].filter(Boolean);

  return (
    <>
      <TableBody>
        {packages.map((data) => (
          <TableRow key={data._id}>
            <TableCell
              align="left"
              sx={{
                minWidth: 160,
                maxWidth: 160,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  overflow: "hidden",
                  padding: "0px 14px",
                }}
              >
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",

                    fontWeight: 500,
                    maxWidth: "130px",
                  }}
                >
                  {data.packageName}
                </Box>
              </Box>
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
              ৳{data.price}
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
              {data.maxDownloadSpeed} Mbps - {data.maxUploadSpeed} Mbps
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
              {data.setupCharge === 0 ? "Free" : `৳${data.setupCharge}`}
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
            {hasActions && (
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
                    <Icon name="more" color="#919EAB" size={24} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>

      {/* Action Menu */}
      <CustomePopOver
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        menuItems={menuItems}
      />
    </>
  );
}

Body.propTypes = {
  packages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      zone: PropTypes.string.isRequired,
      areaName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      coverPhoto: PropTypes.shape({
        url: PropTypes.string,
      }),
      createdAt: PropTypes.string,
    }),
  ).isRequired,
  zones: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedRowId: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  redirectEdit: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setDataToDelete: PropTypes.func.isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  handleOpenMapModal: PropTypes.func.isRequired,
  permissions: PropTypes.shape({
    canUpdate: PropTypes.bool,
    canDelete: PropTypes.bool,
  }),
  hasActions: PropTypes.bool,
};
