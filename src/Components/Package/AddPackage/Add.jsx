import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";

import Form from "./Form";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { hasPermission } from "../../../lib/hasPermission";

export default function Add() {
  const { id } = useParams();
  const { auth } = useContext(DataContext);
  const navigate = useNavigate();
  const canCreate = hasPermission(auth?.permissions, "roles", "canCreate");

  const [connectionType, setConnectionType] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [maxDownloadSpeed, setMaxDownloadSpeed] = useState("");
  const [maxUploadSpeed, setMaxUploadSpeed] = useState("");
  const [price, setPrice] = useState("");
  const [setupCharge, setSetupCharge] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [specialPackages, setSpecialPackages] = useState(false);

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
        setPopUp(data.popUp || "");
        setSpecialPackages(data.specialPackages || false);
      } catch (error) {
        toast.error("Failed to load area for editing.");
      }
    };

    fetchAreaData();
  }, [id]);

  const handleSubmit = async () => {
    const loadingToast = toast.loading(
      id ? "Updating package..." : "Creating package...",
    );

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
        specialPackages: Boolean(specialPackages),
      };

      const { data } = await axios.post("/create-package", payload);
      toast.success(data.message || "Package created successfully", {
        id: loadingToast,
      });

      // Reset or navigate
      navigate("/package-list"); // update the path as needed
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create package!",
        { id: loadingToast },
      );
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
          specialPackages={specialPackages} // ✅ ADD
          setSpecialPackages={setSpecialPackages} // ✅ ADD
          onSubmit={handleSubmit}
          loading={loading}
          canCreate={canCreate}
        />
      </Stack>
    </Box>
  );
}
