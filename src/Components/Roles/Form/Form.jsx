import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";

export default function Form({ id }) {
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    permissions: [],
  });

  // 🔁 Load pages
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await api.get("/get-all-pages");

        // flatten tree
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
        toast.error("Failed to load pages");
      }
    };

    fetchPages();
  }, []);

  // 🔁 Load role if editing
  useEffect(() => {
    if (!id) return;

    const fetchRole = async () => {
      try {
        const res = await api.get(`/role/${id}`);
        const role = res.data;

        setForm({
          id: role._id,
          name: role.name,
          description: role.description || "",
          permissions: role.permissions || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load role");
      }
    };

    fetchRole();
  }, [id]);

  // 🔄 Handle basic input
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // 🔄 Handle permission toggle
  const handlePermissionChange = (pageId, field) => (e) => {
    const checked = e.target.checked;

    setForm((prev) => {
      let permissions = [...prev.permissions];

      const index = permissions.findIndex(
        (p) => p.page === pageId || p.page?._id === pageId,
      );

      if (index === -1) {
        permissions.push({
          page: pageId,
          canView: false,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
          [field]: checked,
        });
      } else {
        permissions[index][field] = checked;
      }

      return { ...prev, permissions };
    });
  };

  // ✅ Check if permission exists
  const isChecked = (pageId, field) => {
    const perm = form.permissions.find(
      (p) => p.page === pageId || p.page?._id === pageId,
    );
    return perm ? perm[field] : false;
  };

  // 🚀 Submit
  const handleSubmit = async () => {
    try {
      const payload = {
        id: form.id,
        name: form.name,
        description: form.description,
        permissions: form.permissions.map((p) => ({
          page: p.page?._id || p.page,
          canView: p.canView || false,
          canCreate: p.canCreate || false,
          canUpdate: p.canUpdate || false,
          canDelete: p.canDelete || false,
        })),
      };

      const res = await api.post("/role-settings", payload);

      toast.success(res.data.message);

      navigate("/roles");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  const handleSelectAllRow = (pageId) => (e) => {
    const checked = e.target.checked;

    setForm((prev) => {
      let permissions = [...prev.permissions];

      const index = permissions.findIndex(
        (p) => p.page === pageId || p.page?._id === pageId,
      );

      if (index === -1) {
        permissions.push({
          page: pageId,
          canView: checked,
          canCreate: checked,
          canUpdate: checked,
          canDelete: checked,
        });
      } else {
        permissions[index] = {
          ...permissions[index],
          canView: checked,
          canCreate: checked,
          canUpdate: checked,
          canDelete: checked,
        };
      }

      return { ...prev, permissions };
    });
  };

  const isAllChecked = (pageId) => {
    const perm = form.permissions.find(
      (p) => p.page === pageId || p.page?._id === pageId,
    );

    if (!perm) return false;

    return (
      !!perm.canView && !!perm.canCreate && !!perm.canUpdate && !!perm.canDelete
    );
  };

  const isIndeterminate = (pageId) => {
    const perm = form.permissions.find(
      (p) => p.page === pageId || p.page?._id === pageId,
    );

    if (!perm) return false;

    const values = [
      !!perm.canView,
      !!perm.canCreate,
      !!perm.canUpdate,
      !!perm.canDelete,
    ];

    return values.some(Boolean) && !values.every(Boolean);
  };

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        maxWidth: "720px", // 👈 max width
        mx: "auto",
      }}
    >
      {/* Role Form */}
      <Stack spacing={2} mb={3}>
        <TextField
          label="Role Name"
          value={form.name}
          onChange={handleChange("name")}
          fullWidth
        />

        <TextField
          label="Description"
          value={form.description}
          onChange={handleChange("description")}
          fullWidth
          multiline
          rows={2}
        />
      </Stack>

      <Box
        sx={{
          boxShadow:
            "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          borderRadius: "16px",
          p: 2,
          mt: 3,
          mb: 3,
        }}
      >
        <TableContainer sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Page</TableCell>
                <TableCell>All</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Create</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pages.map((page) => (
                <TableRow key={page._id}>
                  <TableCell>{page.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={isAllChecked(page._id)}
                      indeterminate={isIndeterminate(page._id)}
                      onChange={handleSelectAllRow(page._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={isChecked(page._id, "canView")}
                      onChange={handlePermissionChange(page._id, "canView")}
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={isChecked(page._id, "canCreate")}
                      onChange={handlePermissionChange(page._id, "canCreate")}
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={isChecked(page._id, "canUpdate")}
                      onChange={handlePermissionChange(page._id, "canUpdate")}
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={isChecked(page._id, "canDelete")}
                      onChange={handlePermissionChange(page._id, "canDelete")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Submit */}
      <Button variant="contained" onClick={handleSubmit}>
        {form.id ? "Update Role" : "Create Role"}
      </Button>
    </Box>
  );
}
Form.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
