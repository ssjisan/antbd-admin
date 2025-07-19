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

export default function Body({
  areas,
  handleCloseMenu,
  handleOpenMenu,
  open,
  zones,
  selectedRowId,
  setDataToDelete,
  setIsModalOpen,
  redirectEdit,
  handleOpenMapModal,
}) {
  const getZoneNameById = (zoneId) => {
    const found = zones.find((zone) => zone._id === zoneId);
    return found?.name || "Unknown Zone";
  };
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
  return (
    <>
      <TableBody>
        {areas.map((data) => (
          <TableRow key={data._id}>
            <TableCell
              align="left"
              sx={{
                minWidth: 250,
                maxWidth: 250,
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
                    width: "90px",
                    height: "64px",
                    overflow: "hidden",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={data?.coverPhoto?.url || "/no-image.png"}
                    alt="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",

                    fontWeight: 500,
                    maxWidth: "130px",
                  }}
                >
                  {data.areaName}
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
              {getZoneNameById(data.zone)}
            </TableCell>

            <TableCell
              align="left"
              sx={{
                minWidth: 360,
                maxWidth: 360,
                p: "0px 14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.address}
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
              align="left"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                p: "0px 14px",
                textDecoration: "underline",
                color: "primary.main",
                cursor: "pointer",
              }}
              onClick={() => handleOpenMapModal(data.polygons)}
            >
              View in map
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
  areas: PropTypes.arrayOf(
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
  zones: PropTypes.arrayOf(
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
