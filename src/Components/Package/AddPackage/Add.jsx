import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Form from "./Form";

export default function Add() {
  const { id } = useParams(); // Undefined for "add", valid for "edit"
  const navigate = useNavigate();

  const [connectionType, setConnectionType] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [maxDownloadSpeed, setMaxDownloadSpeed] = useState("");
  const [maxUploadSpeed, setMaxUploadSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [setupCharge, setSetupCharge] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAreaData = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`/package/${id}`);
        const data = res.data;

        setPackageName(data.packageName || "");
        setMaxDownloadSpeed(data.maxDownloadSpeed || "");
        setMaxUploadSpeed(data.maxUploadSpeed || "");
        setPrice(data.price || "");
        setSetupCharge(data.setupCharge || "");
        setConnectionType(data.connectionType || []);
        setPopUp(data.popUp || ""); // Don't prefill file input
      } catch (error) {
        toast.error("Failed to load area for editing.");
      }
    };

    fetchAreaData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        id,
        packageName,
        maxDownloadSpeed: Number(maxDownloadSpeed),
        maxUploadSpeed: Number(maxUploadSpeed),
        price: Number(price),
        setupCharge: Number(setupCharge),
        connectionType: connectionType.map(Number),
        popUp: Boolean(popUp),
      };

      const { data } = await axios.post("/create-package", payload);
      toast.success(data.message || "Package created successfully");

      // Reset or navigate
      navigate("/package-list"); // update the path as needed
    } catch (err) {
      const errorMsg = err?.response?.data?.error || "Failed to create package";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        {id ? "Edit Package" : "Add Package"}
      </Typography>

      <Stack
        spacing={2}
        sx={{
          width: { xs: "100%", sm: "100%", md: "48%", lg: "48%" },
        }}
      >
        <Form
          packageName={packageName}
          setPackageName={setPackageName}
          maxDownloadSpeed={maxDownloadSpeed}
          setMaxDownloadSpeed={setMaxDownloadSpeed}
          maxUploadSpeed={maxUploadSpeed}
          setMaxUploadSpeed={setMaxUploadSpeed}
          price={price}
          setPrice={setPrice}
          setupCharge={setupCharge}
          setSetupCharge={setSetupCharge}
          connectionType={connectionType}
          setConnectionType={setConnectionType}
          popUp={popUp}
          setPopUp={setPopUp}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Box>
  );
}
