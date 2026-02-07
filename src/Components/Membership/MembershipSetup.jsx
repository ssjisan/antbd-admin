import { Grid, useMediaQuery } from "@mui/material";
import ConfirmationModal from "../Common/RemoveConfirmation/ConfirmationModal";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import toast from "react-hot-toast";
import axios from "axios";
import List from "./List";

export default function MembershipSetup() {
  const isSmDown = useMediaQuery("(max-width:767px)");
  const [memberships, setMemberships] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef();
  const [order, setOrder] = useState("");

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
    if (order !== "") formData.append("order", parseInt(order, 10));

    const loadingToast = toast.loading(
      editingId ? "Updating..." : "Uploading...",
    );

    try {
      const { data } = await axios.post("/membership-handle", formData);

      toast.success(
        editingId
          ? "Membership updated successfully!"
          : "Membership added successfully!",
        { id: loadingToast },
      );

      setMemberships((prev) => {
        const updatedList = editingId
          ? prev.map((c) => (c._id === editingId ? data.membership : c))
          : [data.membership, ...(prev || [])];

        // Sort by order ascending
        return updatedList.sort((a, b) => a.order - b.order);
      });

      setName("");
      setOrder("");
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
      toast.error("No membership selected to delete.");
      return;
    }

    const loadingToast = toast.loading("Deleting...");

    try {
      await axios.delete(`/membership-delete/${dataToDelete._id}`);
      toast.success("Membership deleted successfully.", { id: loadingToast });

      setMemberships((prev) =>
        prev?.filter((membership) => membership._id !== dataToDelete._id),
      );

      setSelectedRowId(null);
      setDataToDelete(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete membership.", { id: loadingToast });
    }
  };

  const handleEditClick = async (id) => {
    try {
      const res = await axios.get(`/membership/${id}`);
      const membership = res.data;

      if (!membership) {
        toast.error("Membership not found");
        return;
      }

      setName(membership.name);
      setOrder(membership.order || "");
      setPreview(membership.image?.url || null);
      setImage(null);
      setEditingId(id);
    } catch (error) {
      toast.error("Failed to load membership for editing.");
    }
  };

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await axios.get("/memberships");
        setMemberships(res.data || []);
      } catch {
        toast.error("Failed to load memberships");
      }
    };
    fetchMemberships();
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
          order={order}
          setOrder={setOrder}
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
          memberships={memberships}
          selectedRowId={selectedRowId}
          dataToDelete={dataToDelete}
          setDataToDelete={setDataToDelete}
          onDeleteClick={(membership) => {
            setDataToDelete(membership);
            setIsModalOpen(true);
          }}
          onEditClick={handleEditClick}
        />

        <ConfirmationModal
          open={isModalOpen}
          title="Delete membership"
          itemName={dataToDelete?.name || "Untitled"}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleRemove}
        />
      </Grid>
    </Grid>
  );
}
