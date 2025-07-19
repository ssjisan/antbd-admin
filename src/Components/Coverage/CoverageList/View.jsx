import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Table } from "@mui/material";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import CustomePagination from "../../Common/Table/CustomePagination";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";
import CoverageMap from "./CoverageMap";
import Body from "./View/Body";
import { useNavigate } from "react-router-dom";

export default function View() {
  const [areas, setAreas] = useState([]);
  const [zones, setZones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [polygonData, setPolygonData] = useState([]);
  const navigate = useNavigate();

  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState("auto");

  const handleOpenMapModal = (polygons) => {
    setIsMapModalOpen(true);
    setPolygonData(polygons);
  };
  const handleOpenMenu = (event, areaId) => {
    setOpen(event.currentTarget);
    setSelectedRowId(areaId);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const loadAreas = async () => {
    try {
      const res = await axios.get("/areas");
      setAreas(res.data);
    } catch (err) {
      toast.error("Failed to load areas");
    }
  };

  const loadZones = async () => {
    try {
      const res = await axios.get("/zones");
      setZones(res.data);
    } catch (err) {
      toast.error("Failed to load zones");
    }
  };

  useEffect(() => {
    loadAreas();
    loadZones();
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.scrollWidth);
    }
  }, [areas, rowsPerPage, page]);

  const columns = [
    { key: "area", label: "Area" },
    { key: "name", label: "Zone" },
    { key: "address", label: "Office address" },
    { key: "createdAt", label: "Created at" },
    { key: "coverageMap", label: "Coverage map" },
  ];

  const paginatedAreas = areas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleRemove = async () => {
    if (!dataToDelete?._id) {
      toast.error("No area selected to delete.");
      return;
    }
    setIsModalOpen(false);
    const removingToast = toast.loading("Removing...");
    try {
      const response = await axios.delete(`/area/${dataToDelete._id}`);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Area deleted successfully");
        await loadAreas();
      }
    } catch (error) {
      console.error("Error deleting area:", error);
      toast.error(error.response?.data?.error || "Failed to delete area.");
    } finally {
      toast.dismiss(removingToast);
      setDataToDelete(null);
    }
  };

  const redirectEdit = (selectedRow) => {
    // Assuming you want to use the row ID in the URL
    const id = typeof selectedRow === "string" ? selectedRow : selectedRow?._id;
    if (id) {
      navigate(`/edit-coverage/${id}`);
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
            areas={paginatedAreas}
            zones={zones}
            page={page}
            rowsPerPage={rowsPerPage}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            open={open}
            setIsModalOpen={setIsModalOpen}
            setDataToDelete={setDataToDelete}
            selectedRowId={selectedRowId}
            setLoading={setLoading}
            handleOpenMapModal={handleOpenMapModal}
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
          count={areas.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={isModalOpen}
        title="Delete Area"
        itemName={dataToDelete?.areaName || ""}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRemove}
        loading={loading}
      />

      {/* Coverage Map Modal */}
      <CoverageMap
        isMapModalOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        polygonData={polygonData}
      />
    </Box>
  );
}
