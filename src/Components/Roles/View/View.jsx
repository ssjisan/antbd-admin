import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import toast from "react-hot-toast";
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
import { hasPermission } from "../../../lib/hasPermission";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import Icon from "../../Icon";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";
import CustomePopOver from "../../Common/PopOver/CustomePopOver";

export default function View() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const { auth } = useContext(DataContext);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  // 🔁 Fetch roles
  const fetchRoles = async () => {
    try {
      const res = await api.get("/roles");
      setRoles(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // 🗑️ Delete role
  const handleDelete = async () => {
    if (!deleteItem?._id) {
      toast.error("Invalid role");
      return;
    }

    try {
      await api.delete(`/role/${deleteItem._id}`);
      toast.success("Role deleted");
      fetchRoles();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setOpenConfirm(false);
      setDeleteItem(null);
    }
  };

  const canUpdate = hasPermission(auth?.permissions, "roles", "canUpdate");
  const canDelete = hasPermission(auth?.permissions, "roles", "canDelete");
  const hasAnyAction = canUpdate || canDelete;

  const columns = [
    { key: "name", label: "Name" },
    { key: "pages", label: "Pages" },
    { key: "createdBy", label: "Created By" },
    { key: "updatedBy", label: "Updated By" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event, page) => {
    setAnchorEl(event.currentTarget);
    setSelectedPage(page);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedPage(null);
  };

  const menuItems = [
    {
      label: "Edit",
      iconName: "Edit",
      onClick: () => {
        navigate(`/role-settings/${selectedPage?._id}`); // ✅ fix route
        handleCloseMenu();
      },
      color: "#838383",
      hide: !canUpdate,
    },
    {
      label: "Delete",
      iconName: "Delete",
      onClick: () => {
        setDeleteItem(selectedPage);
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
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell>{role.name}</TableCell>

                <TableCell>{role.permissions?.length || 0} Pages</TableCell>
                <TableCell>
                  {role?.createdBy?.name ? role?.createdBy?.name : "N/A"}
                </TableCell>
                <TableCell>
                  {role?.updatedBy?.name ? role?.updatedBy?.name : "N/A"}
                </TableCell>
                {hasAnyAction && (
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleOpenMenu(e, role)}>
                      <Icon name="More" size={20} color="#919EAB" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {roles.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No roles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        open={openConfirm}
        title="Delete Role"
        itemName={deleteItem?.name}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
      />
      <CustomePopOver
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        menuItems={menuItems}
      />
    </Box>
  );
}
