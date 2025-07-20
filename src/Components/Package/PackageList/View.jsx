import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Table } from "@mui/material";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import CustomePagination from "../../Common/Table/CustomePagination";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";
import Body from "./View/Body";
import { useNavigate } from "react-router-dom";

export default function View() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "downloadSpeed", label: "Download Speed" },
    { key: "uploadSpeed", label: "Upload Speed" },
    { key: "connectionType", label: "Connection Type" },
    { key: "setupCharge", label: "Setup Charge" },
    { key: "createdAt", label: "Created at" },
  ];

  const [packages, setPackages] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState("auto");
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = (event, areaId) => {
    setOpen(event.currentTarget);
    setSelectedRowId(areaId);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const loadPackages = async () => {
    try {
      const res = await axios.get("/all-packages"); // endpoint to fetch all packages
      setPackages(res.data.packages || []);
    } catch (err) {
      toast.error("Failed to load packages");
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.scrollWidth);
    }
  }, [packages, rowsPerPage, page]);

  const handleRemove = async () => {
    if (!dataToDelete?._id) {
      toast.error("No area selected to delete.");
      return;
    }
    setIsModalOpen(false);
    const removingToast = toast.loading("Removing...");
    try {
      const response = await axios.delete(`/package/${dataToDelete._id}`);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Package deleted successfully");
        await loadPackages();
      }
    } catch (error) {
      console.error("Error deleting area:", error);
      toast.error(error.response?.data?.error || "Failed to delete package.");
    } finally {
      toast.dismiss(removingToast);
      setDataToDelete(null);
    }
  };

  const redirectEdit = (selectedRow) => {
    // Assuming you want to use the row ID in the URL
    const id = typeof selectedRow === "string" ? selectedRow : selectedRow?._id;
    if (id) {
      navigate(`/edit-package/${id}`);
    } else {
      toast.error("Invalid ID for redirection.");
    }
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: {
          xs: 0,
          sm: 2,
          md: 2,
          lg: 2,
        },
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
            packages={packages}
            page={page}
            rowsPerPage={rowsPerPage}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            open={open}
            setOpen={setOpen}
            selectedRowId={selectedRowId}
            dataToDelete={dataToDelete}
            setDataToDelete={setDataToDelete}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            loading={loading}
            setLoading={setLoading}
            redirectEdit={redirectEdit}
          />
        </Table>
      </Box>

      {/* Scrollable Pagination */}
      <Box
        sx={{
          overflowX: "auto",
          maxWidth: "100%",
          width: tableWidth,
        }}
      >
        <CustomePagination
          count={packages.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        <ConfirmationModal
          open={isModalOpen}
          title="Delete Area"
          itemName={dataToDelete?.packageName || ""}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleRemove}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
