import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Stack,
  Table,
  Drawer,
  Typography,
  Divider,
  MenuItem,
  TextField,
} from "@mui/material";
import CustomeHeader from "../../Components/Common/Table/CustomeHeader";
import CustomePagination from "../../Components/Common/Table/CustomePagination";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Components/Common/RemoveConfirmation/ConfirmationModal";
import Body from "./View/Body";
import dayjs from "dayjs";
import { Filter } from "../../assets/IconSet";

export default function View() {
  const columns = [
    { key: "name", label: "Name" },
    // { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
    { key: "package", label: "Package" },
    // { key: "zone", label: "Zone" },
    // { key: "remarks", label: "Remarks" },
    { key: "fullAddress", label: "Full Address" },
    { key: "status", label: "Status" },
    // { key: "createdAt", label: "Created at" },
  ];

  const [packages, setPackages] = useState([]);
  const [coverageAreas, setCoverageAreas] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState("auto");
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStatusModal, setIsStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  // eslint-disable-next-line
  const [statusRemarks, setStatusRemarks] = useState("");

  // Filter Drawer States
  const [openFilter, setOpenFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    status: "pending", // default pending
    package: "",
    zone: "", // default all
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  const handleOpenStatusModal = (rowId, status) => {
    setSelectedRowId(rowId);
    setSelectedStatus(status);
    setIsStatusModal(true);
    setStatusRemarks("");
  };

  // Load all connection requests with optional filters
  const loadConnectionRequests = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`/connection-requests?${params}`);
      const data = Array.isArray(res.data) ? res.data : [];
      setConnectionRequests(data);
    } catch (err) {
      toast.error("Failed to load connection requests");
    }
  };

  const loadPackages = async () => {
    try {
      const res = await axios.get("/all-packages");
      setPackages(res.data.packages || []);
    } catch (err) {
      toast.error("Failed to load packages");
    }
  };

  const loadCoverageAreas = async () => {
    try {
      const res = await axios.get("/areas"); // API to get all coverage areas
      setCoverageAreas(res.data.map((area) => area.areaName) || []);
    } catch (err) {
      toast.error("Failed to load coverage areas");
    }
  };

  useEffect(() => {
    loadPackages();
    loadCoverageAreas();
    loadConnectionRequests(filterValues);
  }, []);

  useEffect(() => {
    if (tableRef.current) setTableWidth(tableRef.current.scrollWidth);
  }, [packages, coverageAreas, rowsPerPage, page]);

  const paginatedData = Array.isArray(connectionRequests)
    ? connectionRequests.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : [];

  const handleStatusConfirm = async (remarksFromModal) => {
    if (!selectedRowId) return toast.error("No record selected.");
    if (!selectedStatus) return toast.error("No status selected.");

    const savingToast = toast.loading("Updating status...");

    try {
      await axios.put(`/connection-request/${selectedRowId}/status`, {
        status: selectedStatus,
        remarks: remarksFromModal || "", // ✅ USE remarksFromModal
      });

      toast.success(`Status updated to ${selectedStatus}`);
      setIsStatusModal(false);
      await loadConnectionRequests(filterValues);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      toast.dismiss(savingToast);
    }
  };

  const handleApplyFilter = () => {
    loadConnectionRequests(filterValues);
    setOpenFilter(false);
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2),0px 12px 24px -4px rgba(145,158,171,0.12)",
        borderRadius: "16px",
        p: { xs: 0, sm: 2, md: 2, lg: 2 },
        mt: 3,
      }}
    >
      <Stack
        sx={{ py: 2, width: "100%" }}
        flexDirection="row"
        justifyContent="flex-end"
      >
        <Button
          sx={{ color: "#060415", width: "fit-content" }}
          onClick={() => setOpenFilter(true)}
          startIcon={<Filter color="#060415" size={20} />}
        >
          Filter
        </Button>
      </Stack>

      <Box sx={{ overflowX: "auto", maxWidth: "100%", mb: 1 }} ref={tableRef}>
        <Table>
          <CustomeHeader
            columns={columns}
            includeActions={true}
            includeDrag={true}
          />
          <Body
            packages={packages}
            connectionRequests={paginatedData}
            page={page}
            rowsPerPage={rowsPerPage}
            handleOpenMenu={(e, id) => {
              setOpen(e.currentTarget);
              setSelectedRowId(id);
            }}
            handleCloseMenu={() => setOpen(null)}
            open={open}
            setOpen={setOpen}
            selectedRowId={selectedRowId}
            dataToDelete={dataToDelete}
            setDataToDelete={setDataToDelete}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            loading={loading}
            setLoading={setLoading}
            handleOpenStatusModal={handleOpenStatusModal}
            columns={columns}
          />
        </Table>
      </Box>

      <Box sx={{ overflowX: "auto", maxWidth: "100%", width: tableWidth }}>
        <CustomePagination
          count={connectionRequests.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />

        <ConfirmationModal
          open={isStatusModal}
          onClose={() => setIsStatusModal(false)}
          onConfirm={handleStatusConfirm}
          confirmColor="primary"
          confirmLabel="Save"
          title={`Change Status to "${selectedStatus}"`}
          message="Please confirm status change and add remarks (if any)."
          showRemarks={true}
        />
      </Box>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <Box sx={{ width: 320, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Filter Requests
          </Typography>

          {/* Status */}
          <TextField
            select
            fullWidth
            size="small"
            label="Status"
            sx={{ mb: 2 }}
            value={filterValues.status}
            onChange={(e) =>
              setFilterValues({ ...filterValues, status: e.target.value })
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="connected">Connected</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="currently not possible">
              Currently Not Possible
            </MenuItem>
          </TextField>

          {/* Package */}
          <TextField
            select
            fullWidth
            size="small"
            label="Package"
            sx={{ mb: 2 }}
            value={filterValues.package || "all"}
            onChange={(e) =>
              setFilterValues({
                ...filterValues,
                package: e.target.value === "all" ? "" : e.target.value,
              })
            }
          >
            <MenuItem value="all">All</MenuItem>
            {packages.map((pkg) => (
              <MenuItem key={pkg._id} value={pkg._id}>
                {pkg.packageName}
              </MenuItem>
            ))}
          </TextField>

          {/* Coverage Area */}
          <TextField
            select
            fullWidth
            size="small"
            label="Coverage Area"
            sx={{ mb: 2 }}
            value={filterValues.coverageArea || "all"}
            onChange={(e) =>
              setFilterValues({
                ...filterValues,
                coverageArea: e.target.value === "all" ? "" : e.target.value,
              })
            }
          >
            <MenuItem value="all">All</MenuItem>
            {coverageAreas.map((area) => (
              <MenuItem key={area.id} value={area}>
                {area}
              </MenuItem>
            ))}
          </TextField>

          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" mb={1}>
            Date Range
          </Typography>
          <TextField
            type="date"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={filterValues.startDate}
            onChange={(e) =>
              setFilterValues({ ...filterValues, startDate: e.target.value })
            }
          />
          <TextField
            type="date"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={filterValues.endDate}
            onChange={(e) =>
              setFilterValues({ ...filterValues, endDate: e.target.value })
            }
          />

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() =>
                setFilterValues({
                  status: "pending",
                  package: "",
                  coverageArea: "",
                  startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
                  endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
                })
              }
            >
              Reset
            </Button>
            <Button variant="contained" fullWidth onClick={handleApplyFilter}>
              Apply
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
