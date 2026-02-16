import { useState, useEffect } from "react";
import { Container, Stack, TextField, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../Editor/Editor";
import axios from "axios";
import toast from "react-hot-toast";

export default function NewsEditorPage() {
  const { id } = useParams(); // 👈 detect edit mode
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [htmlOutput, setHtmlOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editorKey, setEditorKey] = useState(0);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, GIF allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max size 2MB");
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview("");
  };
  // ✅ Fetch data if editing
  useEffect(() => {
    if (!id) return;

    const fetchSingleNews = async () => {
      try {
        const res = await axios.get(`/news/${id}`);

        const data = res.data;

        setTitle(data.title || "");
        setEditorValue(data.contentJSON || []);
        setHtmlOutput(data.contentHTML || "");
        setUploadedImages(data.uploadedImages || []);
        if (data.coverPhoto) {
          setCoverPreview(data.coverPhoto); // URL from DB
          setCoverFile(null); // no new file selected yet
        }
        // 🔥 force editor re-render with loaded value
        setEditorKey((prev) => prev + 1);
      } catch (error) {
        toast.error("Failed to load article");
      }
    };

    fetchSingleNews();
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!editorValue || editorValue.length === 0) {
      toast.error("Content cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("contentHTML", htmlOutput);
      formData.append("contentJSON", JSON.stringify(editorValue));
      formData.append("uploadedImages", JSON.stringify(uploadedImages));

      // ✅ Only append cover if user selected one
      if (coverFile) {
        formData.append("coverPhoto", coverFile);
      }

      let res;

      if (id) {
        res = await axios.put(`/update-news/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post("/create-news", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success(res.data.message || "Saved successfully!");
      navigate("/news-list");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Stack spacing={3}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor
          key={editorKey}
          value={editorValue}
          onChangeValue={(json, html) => {
            setEditorValue(json);
            setHtmlOutput(html);
          }}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
        <Box
          style={{
            width: "100%",
            height: "360px",
            border: "1px dashed #d9d9d9",
            background: "#f6f7f8",
            textAlign: "center",
            cursor: "pointer",
            position: "relative",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {coverPreview ? (
            <Box>
              <img
                src={coverPreview}
                alt="cover"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
              <Button color="error" onClick={handleRemoveCover}>
                Remove Cover
              </Button>
            </Box>
          ) : (
            <>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                style={{ display: "none" }}
                id="coverUpload"
                onChange={handleCoverChange}
              />
              <label htmlFor="coverUpload" style={{ cursor: "pointer" }}>
                <Box>
                  <strong>Click here to upload a cover</strong>
                  <Box style={{ fontSize: "12px", marginTop: "8px" }}>
                    Allowed *.jpeg, *.jpg, *.png, *.gif — max 2 Mb
                  </Box>
                </Box>
              </label>
            </>
          )}
        </Box>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : id ? "Update Article" : "Submit Article"}
        </Button>
      </Stack>
    </Container>
  );
}
