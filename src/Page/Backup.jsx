import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import axios from "../api/axios";
import { useState } from "react";

export default function Backup() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/backup/download", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/zip",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `backup-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.zip`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Backup download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        px: 2,
      }}
    >
      <Card
        elevation={3}
        sx={{
          boxShadow:
            "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          borderRadius: "16px",
        }}
      >
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  System Backup
                </Typography>

                <Typography color="text.secondary">
                  Download a complete backup of the database and uploaded files.
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Alert severity="info">
              The backup includes:
              <ul style={{ marginTop: 8, marginBottom: 0 }}>
                <li>MongoDB database</li>
                <li>Uploaded documents</li>
                <li>Images and attachments</li>
              </ul>
            </Alert>

            <Alert severity="warning">
              Depending on the amount of data, creating the backup may take
              several minutes.
            </Alert>

            <Box textAlign="right">
              <Button
                variant="contained"
                size="large"
                startIcon={
                  loading && <CircularProgress color="inherit" size={18} />
                }
                onClick={handleDownload}
                disabled={loading}
              >
                {loading ? "Creating Backup..." : "Download Backup"}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
