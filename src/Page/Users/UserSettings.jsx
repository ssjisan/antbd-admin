import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function UserSettings() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  // ---------------------------
  // Load Roles
  // ---------------------------
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        setRoles(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load roles");
      }
    };

    fetchRoles();
  }, []);

  // ---------------------------
  // Load User if editing
  // ---------------------------
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/${id}`);
        const user = res.data;

        setForm({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role?._id || user.role,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user");
      }
    };

    fetchUser();
  }, [id]);

  // ---------------------------
  // Handle input change
  // ---------------------------
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // ---------------------------
  // Submit
  // ---------------------------
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.email || !form.role) {
        return toast.error("All fields are required");
      }

      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      if (form.id) {
        // UPDATE
        const res = await api.put(`/user/${form.id}`, payload);
        toast.success(res.data.message);
      } else {
        // CREATE
        const res = await api.post("/register", payload);
        toast.success(res.data.message);
      }

      navigate("/users");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
      }}
    >
      <Typography variant="h6" mb={2}>
        {form.id ? "Update User" : "Create User"}
      </Typography>

      <Stack
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "720px",
          mx: "auto",
          border: "1px solid #eee",
          borderRadius: "12px",
          background: "#fff",
          p: 3,
        }}
      >
        <TextField
          label="Name"
          value={form.name}
          onChange={handleChange("name")}
          fullWidth
        />

        <TextField
          label="Email"
          value={form.email}
          onChange={handleChange("email")}
          fullWidth
        />

        {/* Role Dropdown */}
        <TextField
          select
          label="Role"
          value={form.role}
          onChange={handleChange("role")}
          fullWidth
        >
          <MenuItem value="">Select Role</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role._id} value={role._id}>
              {role.name}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={handleSubmit}>
          {form.id ? "Update User" : "Create User"}
        </Button>
      </Stack>
    </Box>
  );
}
