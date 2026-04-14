import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import CustomChip from "../../Common/Chip/CustomeChip";
import { formatDateTime } from "../../../lib/FormatDateTime";
import Icon from "../../Icon";
import CustomePopOver from "../../Common/PopOver/CustomePopOver";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { hasPermission } from "../../../lib/hasPermission";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

export default function View() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(DataContext);
  const canUpdate = hasPermission(auth?.permissions, "users", "canUpdate");
  const canDelete = hasPermission(auth?.permissions, "users", "canDelete");
  const hasAnyAction = canUpdate || canDelete;
  const navigate = useNavigate();
  // ---------------------------
  // Fetch Users
  // ---------------------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------------------
  // Delete User
  // ---------------------------
  const handleDelete = async () => {
    try {
      const res = await api.delete(`/user/${deleteItem?._id}`);
      toast.success(res.data.message || "Deleted successfully");

      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    } finally {
      setOpenConfirm(false);
      setDeleteItem(null);
    }
  };
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", align: "center" },
    { key: "status", label: "Status", align: "center" },
    { key: "lastLogin", label: "Last login" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event, page) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(page);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const menuItems = [
    {
      label: "Edit",
      iconName: "Edit",
      onClick: () => {
        navigate(`/user-settings/${selectedUser?._id}`);
        handleCloseMenu();
      },
      color: "#838383",
      hide: !canUpdate,
    },
    {
      label: "Delete",
      iconName: "Delete",
      onClick: () => {
        setDeleteItem(selectedUser);
        setOpenConfirm(true);
        handleCloseMenu();
      },
      color: "error",
      hide: !canDelete,
    },
  ];

  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
        mb: 3,
      }}
    >
      <TableContainer>
        <Table>
          <CustomeHeader columns={columns} includeActions={hasAnyAction} />

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  {/* Role */}
                  <TableCell align="center">
                    <Chip
                      label={user.role?.name || "N/A"}
                      color="primary"
                      size="small"
                    />
                  </TableCell>

                  {/* Status */}
                  <TableCell align="center">
                    <CustomChip
                      label={user.isActive ? "Active" : "Inactive"}
                      type={user.isActive ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell>{formatDateTime(user?.lastLogin)}</TableCell>

                  {/* Actions */}
                  {hasAnyAction && (
                    <TableCell align="center">
                      <IconButton onClick={(e) => handleOpenMenu(e, user)}>
                        <Icon name="More" size={20} color="#919EAB" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomePopOver
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        menuItems={menuItems}
      />
      <ConfirmationModal
        open={openConfirm}
        title="Delete Page"
        itemName={deleteItem?.name}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
