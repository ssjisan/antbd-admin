import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { ArrowRight } from "../../../assets/IconSet";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function PendingConnection() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axios.get("/latest-connection-requests");
        setPendingRequests(res.data?.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load pending requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  return (
    <Box
      sx={{
        p: "12px",
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      <Box sx={{ p: "16px" }}>
        <Typography variant="h6">Pending Connections</Typography>
      </Box>

      <Box sx={{ p: "0 16px 16px 16px" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : pendingRequests.length === 0 ? (
          <Typography variant="body2" textAlign="center" color="text.secondary">
            No pending requests.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Package</TableCell>
                  <TableCell>Package Type</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingRequests.map((req) => (
                  <TableRow key={req._id}>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.phone}</TableCell>
                    <TableCell>{req.packageId?.packageName}</TableCell>
                    <TableCell>{req.packageType}</TableCell>
                    <TableCell>
                      {new Date(req.createdAt).toLocaleDateString()}{" "}
                      {new Date(req.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Box
        sx={{
          borderTop: "1px dashed rgba(145, 158, 171, 0.2)",
          p: "16px 0",
          textAlign: "right",
        }}
      >
        <Link to="/connection-request">
          <Button
            color="inherit"
            endIcon={<ArrowRight size={16} color="#060415" />}
          >
            View All
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
