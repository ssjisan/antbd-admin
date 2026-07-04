import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UpdateAlbumForm from "./UpdateAlbumForm";
import UpdateImagePreview from "./UpdateImagePreview";

const CLOUD_NAME = "dzcpx6hrf";
const UPLOAD_PRESET = "aoa-albums-preset";

export default function UpdateMarkedAlbum() {
  const { albumId } = useParams();
  const [albumName, setAlbumName] = useState("");
  const [images, setImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAlbum();
  }, []);

  const loadAlbum = async () => {
    try {
      const { data } = await axios.get(`/album/${albumId}`);
      setAlbumName(data.name);
      const formattedImages = data.images.map((image) => ({
        src: image.src,
        public_id: image.public_id,
        size: image.size,
        name: image.name,
        _id: image._id,
        fromDatabase: true, // Existing image
      }));
      setImages(formattedImages);
    } catch (err) {
      toast.error("Failed to load album data");
      console.error("Error loading album:", err);
    }
  };

  // Upload new images to Cloudinary
  const uploadToCloudinary = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      xhr.open("POST", url);

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
          else reject(new Error("Upload failed"));
        }
      };
      xhr.send(formData);
    });
  };

  // Handle new file selection
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const rejected = [];

    files.forEach((file, index) => {
      if (file.size > 5 * 1024 * 1024) rejected.push(file.name);
      else
        validFiles.push({
          id: `${file.name}-${index}-${Date.now()}`,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2),
          file,
          progress: 0,
          uploading: true,
          uploaded: false,
          src: URL.createObjectURL(file),
        });
    });

    if (rejected.length > 0) {
      setRejectedFiles((prev) => [...prev, ...rejected]);
      toast.error(`Some files exceed 5MB`);
    }

    setImages((prev) => [...prev, ...validFiles]);
    setIsUploading(true);

    for (const img of validFiles) {
      try {
        const res = await uploadToCloudinary(img.file, (percent) => {
          setImages((prev) =>
            prev.map((i) => (i.id === img.id ? { ...i, progress: percent } : i))
          );
        });

        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id
              ? {
                  ...i,
                  src: res.secure_url,
                  public_id: res.public_id,
                  size: (res.bytes / (1024 * 1024)).toFixed(2),
                  uploading: false,
                  uploaded: true,
                  progress: 100,
                }
              : i
          )
        );
      } catch (err) {
        console.error(err);
        toast.error(`Failed to upload ${img.name}`);
        setImages((prev) => prev.filter((i) => i.id !== img.id));
      }
    }
    setIsUploading(false);
  };

  // Remove image (old or new)
  const handleRemoveImage = async (id, public_id, fromDatabase = false) => {
    // Show loading toast
    const toastId = toast.loading("Removing image...");

    if (public_id) {
      try {
        await axios.post("/delete-image", { public_id });
        toast.success("Image removed", { id: toastId });
      } catch (err) {
        console.error(err);
        toast.error("Failed to remove image", { id: toastId });
        return; // stop removing from UI if Cloudinary delete fails
      }
    }

    // Remove from UI
    setImages((prev) => prev.filter((img) => img._id !== id));

    // If image is from DB, store its _id for deletion in backend
    if (fromDatabase) {
      setRemovedImages((prev) => [...prev, id]);
    }
  };

  // Handle album update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!albumName.trim()) return toast.error("Enter album name");

    setIsSaving(true);
    const toastId = toast.loading("Updating album...");

    try {
      // Prepare the payload
      const payload = {
        albumName,
        newImages: images.filter((img) => img.uploaded && !img._id), // new images
        existingImages: images
          .filter((img) => img._id) // existing images
          .map((img, index) => ({
            _id: img._id,
            order: index, // send updated order
          })),
        removedImages,
      };

      const res = await axios.put(`/album/${albumId}`, payload);

      if (res.data.success) {
        toast.success("Album updated successfully!", { id: toastId });
        navigate("/album_list");
      } else {
        toast.error(res.data.error || "Failed to update album", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <UpdateAlbumForm
            albumName={albumName}
            setAlbumName={setAlbumName}
            onImageUpload={handleImageUpload}
            handleSubmit={handleSubmit}
            isSubmitting={isUploading || isSaving}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <UpdateImagePreview
            images={images}
            setImages={setImages}
            handleRemoveImage={handleRemoveImage}
            rejectedFiles={rejectedFiles}
            isSubmitting={isUploading || isSaving}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
