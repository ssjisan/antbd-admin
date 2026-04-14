import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import CustomChip from "../../Common/Chip/CustomeChip";
import Icon from "../../Icon";
import CustomePopOver from "../../Common/PopOver/CustomePopOver";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";

import { hasPermission } from "../../../lib/hasPermission";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../../api/axios";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function View() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(DataContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // 🔁 Fetch sliders
  const fetchSliders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/all-sliders");
      setSliders(res.data || []);
    } catch (error) {
      console.error("Failed to fetch sliders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // 🗑️ Delete
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/slider/${deleteItem._id}`);
      toast.success(data.message || "Deleted successfully");
      fetchSliders();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setOpenConfirm(false);
      setDeleteItem(null);
    }
  };

  // 🔐 Permissions
  const canUpdate = hasPermission(
    auth?.permissions,
    "slider-settings",
    "canUpdate",
  );
  const canDelete = hasPermission(auth?.permissions, "slider", "canDelete");

  const hasAnyAction = canUpdate || canDelete;

  // 📊 Table columns
  const columns = [
    { key: "order", label: "Order", align: "center" },
    { key: "image", label: "Image", align: "center" },
    { key: "title", label: "Title" },
    { key: "status", label: "Status", align: "center" },
  ];

  // 🔘 Menu open
  const handleOpenMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  // 📋 Menu Items
  const menuItems = [
    {
      label: "Edit",
      iconName: "Edit",
      onClick: () => {
        navigate(`/slider-settings/${selectedItem?._id}`);
        handleCloseMenu();
      },
      hide: !canUpdate,
    },
    {
      label: "Delete",
      iconName: "Delete",
      onClick: () => {
        setDeleteItem(selectedItem);
        setOpenConfirm(true);
        handleCloseMenu();
      },
      color: "error",
      hide: !canDelete,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          boxShadow:
            "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          borderRadius: "16px",
          p: 2,
          mt: 3,
        }}
      >
        <TableContainer>
          <Table>
            <CustomeHeader columns={columns} includeActions={hasAnyAction} />

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : sliders.length > 0 ? (
                sliders.map((item) => (
                  <TableRow key={item._id}>
                    {/* Title */}

                    {/* Image */}
                    <TableCell align="center">{item.order}</TableCell>
                    <TableCell align="center">
                      <img
                        src={item.coverPhoto?.url}
                        alt="slider"
                        style={{
                          width: 80,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>

                    {/* Status */}
                    <TableCell align="center">
                      <CustomChip
                        label={item.publishStatus ? "Published" : "Draft"}
                        type={item.publishStatus ? "success" : "warning"}
                      />
                    </TableCell>

                    {/* Order */}

                    {/* Actions */}
                    {hasAnyAction && (
                      <TableCell align="center">
                        <IconButton onClick={(e) => handleOpenMenu(e, item)}>
                          <Icon name="More" size={20} color="#919EAB" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No sliders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Popover */}
      <CustomePopOver
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        menuItems={menuItems}
      />

      {/* Confirm Delete */}
      <ConfirmationModal
        open={openConfirm}
        title="Delete Slider"
        itemName={deleteItem?.title}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
