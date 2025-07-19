import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Form from "./Form";
import Map from "./Map";

export default function Area() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [areaName, setAreaName] = useState("");
  const [zone, setZone] = useState(""); // Will store zone _id
  const [zoneOptions, setZoneOptions] = useState([]);
  const [address, setAddress] = useState("");
  const [polygons, setPolygons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { id } = useParams(); // Undefined for "add", valid for "edit"
  const navigate = useNavigate();

  // Fetch zones from DB
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await axios.get("/zones");
        setZoneOptions(res.data || []);
      } catch {
        toast.error("Failed to load zones");
      }
    };
    fetchZones();
  }, []);

  // Load area data if editing
  useEffect(() => {
    const fetchAreaData = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`/area/${id}`);
        const data = res.data;

        setAreaName(data.areaName || "");
        setZone(data.zone || "");
        setAddress(data.address || "");
        setPolygons(data.polygons || []);
        setImagePreview(data.coverPhoto?.url || null);
        setImage(null); // Don't prefill file input
      } catch (error) {
        toast.error("Failed to load area for editing.");
      }
    };

    fetchAreaData();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveArea = async () => {
  if (!areaName || !zone || !address || polygons.length === 0) {
    toast.error("Please fill all required fields including polygons.");
    return;
  }

  const formData = new FormData();
  formData.append("areaName", areaName);
  formData.append("zone", zone);
  formData.append("address", address);
  formData.append("polygons", JSON.stringify(polygons));
  if (image) formData.append("file", image);
  if (id) formData.append("id", id); // Important: tell backend it's an update

  const toastId = toast.loading(id ? "Updating area..." : "Saving area...");

  try {
    const res = await axios.post("/save-area", formData);
    toast.dismiss(toastId);

    if (res.data.error) {
      toast.error(res.data.error);
    } else {
      toast.success(res.data.message || "Success!");
      navigate("/coverage-list");
    }
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.response?.data?.error || "Failed to save area.");
  }
};


  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        {id ? "Edit Area" : "Add New Area"}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Form
            image={image}
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            areaName={areaName}
            setAreaName={setAreaName}
            zone={zone}
            setZone={setZone}
            zoneOptions={zoneOptions}
            address={address}
            setAddress={setAddress}
            onSave={handleSaveArea}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Map
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            polygons={polygons}
            setPolygons={setPolygons}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
