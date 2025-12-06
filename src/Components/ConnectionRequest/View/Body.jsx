import {
  Box,
  Collapse,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowDown, ArrowUp, Bullet, More } from "../../../assets/IconSet";
import PropTypes from "prop-types";
import CustomePopOver from "../../Common/PopOver/CustomePopOver";
import NoData from "../../../assets/NoData";
import React, { useState } from "react";

export default function Body({
  connectionRequests,
  packages,
  handleCloseMenu,
  handleOpenMenu,
  open,
  selectedRowId,
  handleOpenStatusModal,
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

  const [openRowId, setOpenRowId] = useState(null);

  const handleToggleRow = (id) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  const getStatusColors = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { color: "#FF9800", background: "rgba(255, 152, 0, 0.1)" }; // Orange
      case "connected":
        return { color: "#4CAF50", background: "rgba(76, 175, 80, 0.1)" }; // Green
      case "cancelled":
        return { color: "#F44336", background: "rgba(244, 67, 54, 0.1)" }; // Red
      case "currently not possible":
        return { color: "#607D8B", background: "rgba(96, 125, 139, 0.1)" }; // Blue-Gray
      default:
        return { color: "#000", background: "rgba(0,0,0,0.2)" }; // Default
    }
  };

  if (!connectionRequests.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={9}>
            <Stack
              sx={{ width: "100%", mt: "32px", mb: "32px" }}
              gap="8px"
              alignItems="center"
            >
              <NoData />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: "500 !important" }}
              >
                No data here!
              </Typography>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <>
      <TableBody>
        {connectionRequests.map((data) => {
          const { color, background } = getStatusColors(data.status);
          const isOpen = openRowId === data._id;

          return (
            <React.Fragment key={data._id}>
              {/* MAIN ROW */}
              <TableRow hover>
                {/* Expand / Collapse Arrow */}
                <TableCell sx={{ width: 50 }}>
                  <IconButton
                    onClick={() => handleToggleRow(data._id)}
                    size="small"
                  >
                    {isOpen ? (
                      <ArrowUp size={20} color="black" />
                    ) : (
                      <ArrowDown size={20} color="black" />
                    )}
                  </IconButton>
                </TableCell>

                <TableCell sx={{ fontSize: "14px", padding: "10px 16px" }}>
                  {data.name}
                </TableCell>

                {/* <TableCell sx={{ fontSize: "14px", padding: "10px 16px" }}>
                  <Tooltip title={data.email}>
                    <span>{data.email}</span>
                  </Tooltip>
                </TableCell> */}

                <TableCell sx={{ fontSize: "14px", padding: "10px 16px" }}>
                  {data.mobile}
                </TableCell>

                <TableCell sx={{ fontSize: "14px", padding: "10px 16px" }}>
                  {getPackageName(data.packageId)}
                </TableCell>

                {/* <TableCell sx={{ fontSize: "14px", padding: "10px 16px" }}>
                  {data.zone}
                </TableCell> */}

                <TableCell sx={{ fontSize: "14px", padding: "10px 16px" }}>
                  <Tooltip title={data.fullAddress}>
                    <span>{data.fullAddress}</span>
                  </Tooltip>
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "14px",
                    padding: "10px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      color,
                      background,
                      width: "fit-content",
                    }}
                  >
                    {data.status}
                  </Box>
                </TableCell>

                {/* <TableCell sx={{ fontSize: "14px", padding: "10px 16px" }}>
                  {formatDateTime(data.createdAt)}
                </TableCell> */}

                <TableCell
                  sx={{
                    minWidth: 48,
                    maxWidth: 48,
                    // position: "sticky",
                    // right: 0,
                    // zIndex: 2,
                    // background: "#f9fafb",
                  }}
                >
                  <Tooltip title="Actions">
                    <IconButton
                      sx={{ width: "40px", height: "40px" }}
                      onClick={(event) => handleOpenMenu(event, data._id)}
                    >
                      <More color="#919EAB" size={24} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>

              {/* COLLAPSED REMARKS ROW */}
              <TableRow>
                <TableCell
                  colSpan={12}
                  sx={{ paddingBottom: 0, paddingTop: 0 }}
                >
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Stack
                      flexDirection="column"
                      gap="8px"
                      sx={{
                        background: "rgba(0,0,0,0.03)",
                        padding: "16px 24px",
                        borderLeft: "4px solid #1976d2",
                      }}
                    >
                      <Typography>
                        <strong>Email:</strong> {data.email}
                      </Typography>
                      <Typography>
                        <strong>Zone:</strong> {data.zone}
                      </Typography>
                      <Typography>
                        <strong>Created At:</strong>{" "}
                        {formatDateTime(data.createdAt)}
                      </Typography>
                      <Typography sx={{ gridColumn: "1/-1" }}>
                        <strong>Remarks:</strong>{" "}
                        {data.remarks || "No remarks provided"}
                      </Typography>
                    </Stack>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        })}
      </TableBody>

      {/* Action Menu */}
      <CustomePopOver
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        menuItems={[
          {
            label: "Connected",
            icon: Bullet,
            onClick: () => {
              handleOpenStatusModal(selectedRowId, "connected");
              handleCloseMenu();
            },
          },
          {
            label: "Cancelled",
            icon: Bullet,
            onClick: () => {
              handleOpenStatusModal(selectedRowId, "cancelled");
              handleCloseMenu();
            },
          },
          {
            label: "Currently Not Possible",
            icon: Bullet,
            onClick: () => {
              handleOpenStatusModal(selectedRowId, "currently not possible");
              handleCloseMenu();
            },
          },
          {
            label: "Pending",
            icon: Bullet,
            onClick: () => {
              handleOpenStatusModal(selectedRowId, "pending");
              handleCloseMenu();
            },
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
  handleOpenStatusModal: PropTypes.func.isRequired,
};
