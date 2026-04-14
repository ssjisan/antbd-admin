import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Form({ id }) {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    name: "",
    path: "",
    icon: "",
    order: 0,
    parent: "",
    isMenu: true,
    isActive: true,
    description: "",
  });

  // 🔁 Load parent pages
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await api.get("/get-all-pages");

        // flatten tree for dropdown
        const flatten = (data) => {
          let result = [];
          data.forEach((item) => {
            result.push(item);
            if (item.children?.length) {
              result = result.concat(flatten(item.children));
            }
          });
          return result;
        };

        setPages(flatten(res.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPages();
  }, []);

  // 🔁 If editing
  useEffect(() => {
    if (!id) return;

    const fetchPage = async () => {
      try {
        const { data } = await api.get(`/get-page/${id}`);

        setForm({
          id: data._id,
          name: data.name,
          path: data.path,
          icon: data.icon || "",
          order: data.order || 0,
          parent: data.parent || "",
          isMenu: data.isMenu,
          isActive: data.isActive,
          description: data.description || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load page");
      }
    };

    fetchPage();
  }, [id]);

  // 🔄 handle change
  const handleChange = (field) => (e) => {
    const value =
      field === "isMenu" || field === "isActive"
        ? e.target.checked
        : e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 🚀 Submit
  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        parent: form.parent || null,
      };

      const { data } = await api.post("/page-settings", payload);
      navigate("/pages");
      toast.success(data.message);

      // reset form
      setForm({
        id: "",
        name: "",
        path: "",
        icon: "",
        order: 0,
        parent: "",
        isMenu: true,
        isActive: true,
        description: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error");
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
        maxWidth: "720px", // 👈 max width
        mx: "auto",
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Page Name"
          value={form.name}
          onChange={handleChange("name")}
          fullWidth
        />

        <TextField
          label="Path (route)"
          placeholder="/settings"
          value={form.path}
          onChange={handleChange("path")}
          fullWidth
        />

        <TextField
          label="Icon Name"
          placeholder="dashboard"
          value={form.icon}
          onChange={handleChange("icon")}
          fullWidth
        />

        <TextField
          label="Order"
          type="number"
          value={form.order}
          onChange={handleChange("order")}
          fullWidth
        />

        {/* Parent Dropdown */}
        <TextField
          select
          label="Parent Page"
          value={form.parent}
          onChange={handleChange("parent")}
          fullWidth
        >
          <MenuItem value="">None</MenuItem>
          {pages.map((p) => (
            <MenuItem key={p._id} value={p._id}>
              {p.name}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Switch checked={form.isMenu} onChange={handleChange("isMenu")} />
          }
          label="Show in Sidebar (isMenu)"
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.isActive}
              onChange={handleChange("isActive")}
            />
          }
          label="Active Page"
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange("description")}
          fullWidth
        />

        <Button variant="contained" onClick={handleSubmit}>
          {form.id ? "Update Page" : "Create Page"}
        </Button>
      </Stack>
    </Box>
  );
}
Form.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
