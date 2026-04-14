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
import { hasPermission } from "../../../lib/hasPermission";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../../api/axios";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";

export default function View() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(DataContext);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  // 🔥 Flatten tree into table format
  const flattenPages = (data, level = 0, parentOrder = "") => {
    let result = [];

    data.forEach((item, index) => {
      const orderPrefix = parentOrder
        ? `${parentOrder}.${index + 1}`
        : `${index + 1}`;

      result.push({
        ...item,
        level,
        displayOrder: orderPrefix,
      });

      if (item.children?.length) {
        result = result.concat(
          flattenPages(item.children, level + 1, orderPrefix),
        );
      }
    });

    return result;
  };

  // 🔁 Fetch pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/get-all-pages");

      const flat = flattenPages(res.data || []);
      setPages(flat);
    } catch (error) {
      console.error("Failed to fetch pages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/delete-page/${deleteItem._id}`);
      toast.success(data.message || "Deleted successfully");
      fetchPages();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setOpenConfirm(false);
      setDeleteItem(null);
    }
  };

  const canUpdate = hasPermission(auth?.permissions, "pages", "canUpdate");
  const canDelete = hasPermission(auth?.permissions, "pages", "canDelete");
  const hasAnyAction = canUpdate || canDelete;

  const columns = [
    { key: "order", label: "Order" },
    { key: "name", label: "Name" },
    { key: "slug", label: "Slug" },
    { key: "path", label: "Path" },
    { key: "menu", label: "Menu", align: "center" },
    { key: "status", label: "Status", align: "center" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const navigate = useNavigate();

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
        navigate(`/page-settings/${selectedPage?._id}`);
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
    <Box>
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
                  <TableCell colSpan={7} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : pages.length > 0 ? (
                pages.map((page) => (
                  <TableRow key={page._id}>
                    {/* Hierarchical Order */}
                    <TableCell>{page.displayOrder}</TableCell>

                    {/* Name with indentation */}
                    <TableCell>
                      <Box sx={{ pl: page.level * 3 }}>
                        {page.level > 0 && "└── "}
                        {page.name}
                      </Box>
                    </TableCell>

                    <TableCell>{page.slug}</TableCell>
                    <TableCell>{page.path}</TableCell>

                    <TableCell align="center">
                      <CustomChip
                        label={page.isMenu ? "Yes" : "No"}
                        type={page.isMenu ? "info" : "warning"}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <CustomChip
                        label={page.isActive ? "Active" : "Inactive"}
                        type={page.isActive ? "success" : "error"}
                      />
                    </TableCell>

                    {/* Actions */}
                    {hasAnyAction && (
                      <TableCell align="center">
                        <IconButton onClick={(e) => handleOpenMenu(e, page)}>
                          <Icon name="More" size={20} color="#919EAB" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No pages found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
