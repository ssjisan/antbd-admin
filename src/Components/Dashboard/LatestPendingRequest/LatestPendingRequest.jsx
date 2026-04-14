import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Collapse,
  Stack,
} from "@mui/material";

import CustomeHeader from "../../Common/Table/CustomeHeader";
import Icon from "../../Icon";

import axios from "../../../api/axios";
import toast from "react-hot-toast";

export default function LatestPendingRequest() {
  const { recentRequests } = useContext(DataContext);

  const [openRowId, setOpenRowId] = useState(null);
  const [packages, setPackages] = useState([]);

  // =========================
  // LOAD PACKAGES (LOCAL API)
  // =========================
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await axios.get("/all-packages");
        setPackages(res.data.packages || []);
      } catch (err) {
        toast.error("Failed to load packages");
      }
    };

    loadPackages();
  }, []);

  // =========================
  // TABLE COLUMNS
  // =========================
  const columns = [
    { key: "", label: "" },
    { key: "name", label: "Name" },
    { key: "mobile", label: "Mobile" },
    { key: "package", label: "Package" },
    { key: "status", label: "Status" },
    { key: "remarks", label: "Remarks" },
  ];

  // =========================
  // HELPERS
  // =========================
  const toggleRow = (id) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  const getPackageName = (id) => {
    const found = packages.find((pkg) => pkg._id === id);
    return found ? found.packageName : "N/A";
  };

  const getStatusColors = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return { color: "#FF9800", background: "rgba(255, 152, 0, 0.1)" };
      case "connected":
        return { color: "#4CAF50", background: "rgba(76, 175, 80, 0.1)" };
      case "cancelled":
        return { color: "#F44336", background: "rgba(244, 67, 54, 0.1)" };
      default:
        return { color: "#607D8B", background: "rgba(96, 125, 139, 0.1)" };
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);

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
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2),0px 12px 24px -4px rgba(145,158,171,0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Latest Pending Requests
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <CustomeHeader
            columns={columns}
            includeActions={false}
            includeDrag={false}
          />

          <TableBody>
            {!recentRequests?.length ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography align="center" py={3}>
                    No recent pending requests
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              recentRequests.map((data) => {
                const isOpen = openRowId === data._id;
                const { color, background } = getStatusColors(data.status);

                return (
                  <>
                    <TableRow key={data._id} hover>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => toggleRow(data._id)}
                        >
                          <Icon
                            name={isOpen ? "arrowup" : "arrowdown"}
                            size={18}
                          />
                        </IconButton>
                      </TableCell>

                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.mobile}</TableCell>
                      <TableCell>{getPackageName(data.packageId)}</TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            fontSize: "12px",
                            px: 1,
                            py: 0.5,
                            borderRadius: "4px",
                            color,
                            background,
                          }}
                        >
                          {data.status}
                        </Box>
                      </TableCell>

                      <TableCell sx={{ maxWidth: 250 }}>
                        {data.remarks || "No remarks"}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={6} sx={{ p: 0 }}>
                        <Collapse in={isOpen}>
                          <Stack
                            sx={{
                              p: 2,
                              background: "rgba(0,0,0,0.03)",
                              borderLeft: "4px solid #1976d2",
                            }}
                            spacing={1}
                          >
                            <Typography>
                              <strong>Email:</strong> {data.email}
                            </Typography>
                            <Typography>
                              <strong>Zone:</strong> {data.zone}
                            </Typography>
                            <Typography>
                              <strong>Created:</strong>{" "}
                              {formatDateTime(data.createdAt)}
                            </Typography>
                            <Typography>
                              <strong>Address:</strong> {data.fullAddress}
                            </Typography>
                          </Stack>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
