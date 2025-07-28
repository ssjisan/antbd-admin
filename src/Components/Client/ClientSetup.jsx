import { Grid, useMediaQuery } from "@mui/material";
import ConfirmationModal from "../Common/RemoveConfirmation/ConfirmationModal";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import toast from "react-hot-toast";
import axios from "axios";
import List from "./List";

export default function ClientSetup() {
  const isSmDown = useMediaQuery("(max-width:767px)");
  const [clients, setClients] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, and WEBP formats are allowed.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a name.");
      return;
    }

    if (!editingId && !image) {
      toast.error("Please upload an image.");
      return;
    }

    if (image) {
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(image.type)) {
        toast.error("Only PNG, JPG, and WEBP formats are allowed.");
        return;
      }

      const oneMB = 1024 * 1024;
      if (image.size > oneMB) {
        toast.error("Image must be less than 1MB");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    if (editingId) formData.append("id", editingId);

    const loadingToast = toast.loading(editingId ? "Updating..." : "Uploading...");

    try {
      const { data } = await axios.post("/client-handle", formData);

      toast.success(
        editingId ? "Client updated successfully!" : "Client added successfully!",
        { id: loadingToast }
      );

      setClients((prev) =>
        editingId
          ? prev.map((c) => (c._id === editingId ? data.client : c))
          : [data.client, ...(prev || [])]
      );

      setName("");
      setImage(null);
      setPreview(null);
      setEditingId(null);
      fileInputRef.current.value = null;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong!", {
        id: loadingToast,
      });
    }
  };

  const handleRemove = async () => {
    if (!dataToDelete?._id) {
      toast.error("No client selected to delete.");
      return;
    }

    const loadingToast = toast.loading("Deleting...");

    try {
      await axios.delete(`/client-delete/${dataToDelete._id}`);
      toast.success("Client deleted successfully.", { id: loadingToast });

      setClients((prev) =>
        prev?.filter((client) => client._id !== dataToDelete._id)
      );

      setSelectedRowId(null);
      setDataToDelete(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete client.", { id: loadingToast });
    }
  };

  const handleEditClick = async (id) => {
    try {
      const res = await axios.get(`/client/${id}`);
      const client = res.data;

      if (!client) {
        toast.error("Client not found");
        return;
      }

      setName(client.name);
      setPreview(client.image?.url || null);
      setImage(null);
      setEditingId(id);
    } catch (error) {
      toast.error("Failed to load client for editing.");
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("/clients");
        setClients(res.data || []);
      } catch {
        toast.error("Failed to load clients");
      }
    };
    fetchClients();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          position: isSmDown ? "static" : "sticky",
          top: isSmDown ? "auto" : "80px",
          alignSelf: "flex-start",
          zIndex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Form
          handleSubmit={handleSubmit}
          fileInputRef={fileInputRef}
          handleImageChange={handleImageChange}
          handleClickUpload={handleClickUpload}
          name={name}
          setName={setName}
          preview={preview}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={10}
        sx={{
          pr: 1,
          mt: "36px",
        }}
      >
        <List
          clients={clients}
          selectedRowId={selectedRowId}
          dataToDelete={dataToDelete}
          setDataToDelete={setDataToDelete}
          setSelectedRowId={setSelectedRowId}
          onDeleteClick={(client) => {
            setDataToDelete(client);
            setIsModalOpen(true);
          }}
          onEditClick={handleEditClick}
        />

        <ConfirmationModal
          open={isModalOpen}
          title="Delete Client"
          itemName={dataToDelete?.name || ""}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleRemove}
        />
      </Grid>
    </Grid>
  );
}
