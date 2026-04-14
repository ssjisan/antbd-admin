import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Settings({ id }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: "",
    title: "",
    order: 0,
    publishStatus: true,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  // 🔁 Load data for edit
  useEffect(() => {
    if (!id) return;

    const fetchSlider = async () => {
      try {
        const { data } = await api.get(`/slider/${id}`);

        setForm({
          id: data._id,
          title: data.title,
          order: data.order || 0,
          publishStatus: data.publishStatus,
        });

        setPreview(data.coverPhoto?.url);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load slider");
      }
    };

    fetchSlider();
  }, [id]);

  // 🔄 Handle input change
  const handleChange = (field) => (e) => {
    const value = field === "publishStatus" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 🖼️ Handle image upload
  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    // 🔥 Validate size (2MB)
    if (selected.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // 🚀 Submit
  const handleSubmit = async () => {
    setLoading(true);
    const toastId = toast.loading("Uploading slider...");
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("order", form.order);
      formData.append("publishStatus", form.publishStatus);

      if (form.id) {
        formData.append("id", form.id);
      }

      if (file) {
        formData.append("coverPhoto", file);
      }

      const { data } = await api.post("/update-slider", formData);

      toast.dismiss(toastId);
      toast.success(data.message);
      navigate("/slider");

      // reset
      setForm({
        id: "",
        title: "",
        order: 0,
        publishStatus: true,
      });
      setFile(null);
      setPreview("");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || "Error");
    } finally {
      setLoading(true);
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        border: "1px solid #eee",
        borderRadius: "12px",
        background: "#fff",
        width: "100%",
        maxWidth: "600px",
        mx: "auto",
      }}
    >
      <Stack spacing={2}>
        {/* Title */}
        <TextField
          label="Title"
          value={form.title}
          onChange={handleChange("title")}
          fullWidth
        />

        {/* Order */}
        <TextField
          label="Order"
          type="number"
          value={form.order}
          onChange={handleChange("order")}
          fullWidth
        />

        {/* Publish */}
        <FormControlLabel
          control={
            <Switch
              checked={form.publishStatus}
              onChange={handleChange("publishStatus")}
            />
          }
          label="Publish"
        />

        <Box
          component="label"
          sx={{
            width: "100%",
            aspectRatio: "33 / 14", // 🔥 keeps ratio
            backgroundColor: "#f6f7f8",
            border: "2px dashed #d0d5dd",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
            transition: "0.2s",
            "&:hover": {
              borderColor: "#98a2b3",
              backgroundColor: "#f0f2f4",
            },
          }}
        >
          {/* Hidden Input */}
          <input type="file" hidden onChange={handleFileChange} />

          {/* If image exists → show preview */}
          {preview ? (
            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // 🔥 no stretch
              }}
            />
          ) : (
            // 📄 Placeholder Content
            <Box
              sx={{
                textAlign: "center",
                px: 2,
              }}
            >
              <Box sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                Upload Cover Photo
              </Box>

              <Box sx={{ fontSize: 12, color: "#667085" }}>
                Resolution: 1320 × 560 px
              </Box>

              <Box sx={{ fontSize: 12, color: "#667085" }}>
                Aspect Ratio: 33 : 14 (~2.36:1)
              </Box>

              <Box sx={{ fontSize: 12, color: "#667085" }}>
                Max size: 2MB • JPG, PNG
              </Box>
            </Box>
          )}
        </Box>

        {/* Submit */}
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {form.id ? "Update Slider" : "Create Slider"}
        </Button>
      </Stack>
    </Box>
  );
}

Settings.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
