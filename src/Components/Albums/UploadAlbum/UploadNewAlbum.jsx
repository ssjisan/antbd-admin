import { Box, Grid } from "@mui/material";
import UploadAlbumForm from "./UploadAlbumForm";
import UploadImagePreview from "./UploadImagePreview";
import { useState } from "react";
import axios from "../../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../lib/getErrorMessage";

export default function UploadNewAlbum() {
  const [sessionId, setSessionId] = useState(null);
  const [images, setImages] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const navigate = useNavigate();

  const MAX_FILE_SIZE_MB = 2;

  // ---------------------------------------------------------------------
  // 📁 Handle file selection & auto upload
  // ---------------------------------------------------------------------

  const handleImageUpload = async (event) => {
    try {
      const files = Array.from(event.target.files);

      if (!files.length) return;

      setIsUploading(true);

      let uploadedImages = [];

      for (const file of files) {
        // file size validation (2MB)
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          toast.error(`${file.name} exceeds 2MB limit`);
          continue;
        }

        const formData = new FormData();
        formData.append("image", file);
        if (sessionId) {
          formData.append("sessionId", sessionId);
        }

        const res = await axios.post("/gallery/temp-upload", formData);

        const data = res.data;

        // set sessionId once (first upload)
        if (!sessionId) {
          setSessionId(data.sessionId);
        }

        uploadedImages.push({
          id: Date.now() + Math.random(),
          ...data.image,
        });
      }

      setImages((prev) => [...prev, ...uploadedImages]);

      toast.success("Images uploaded");
    } catch (err) {
      toast.error(getErrorMessage(err, "Upload failed"));
    } finally {
      setIsUploading(false);
    }
  };
  // ---------------------------------------------------------------------
  // 🗑️ Remove image from preview
  // ---------------------------------------------------------------------
  const handleRemoveImage = async (id, filePath, url) => {
    try {
      setImages((prev) => prev.filter((img) => img.id !== id));

      const fileName = url.split("/").pop();

      await axios.delete("/gallery/temp-delete", {
        data: {
          sessionId,
          fileName,
        },
      });

      toast.success("Image removed");
    } catch (err) {
      toast.error(getErrorMessage(err, "Delete failed"));
    }
  };

  // ---------------------------------------------------------------------
  // 💾 Save album info to backend
  // ---------------------------------------------------------------------
  const handleFormSubmit = async (e) => {};

  // ---------------------------------------------------------------------
  // 🧩 Render
  // ---------------------------------------------------------------------
  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <UploadAlbumForm
            onImageUpload={handleImageUpload}
            onFormSubmit={handleFormSubmit}
            albumName={albumName}
            setAlbumName={setAlbumName}
            isSubmitting={isSaving || isUploading}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <UploadImagePreview
            images={images}
            setImages={setImages}
            handleRemoveImage={handleRemoveImage}
            rejectedFiles={rejectedFiles}
            isSubmitting={isSaving || isUploading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
