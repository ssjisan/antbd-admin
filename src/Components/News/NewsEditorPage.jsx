import { useState } from "react";
import { Container, Stack, TextField, Button } from "@mui/material";
import Editor from "../Editor/Editor";
import axios from "axios";

export default function NewsEditorPage() {
  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState(null); // Will store editor JSON
  const [htmlOutput, setHtmlOutput] = useState(""); // Will store serialized HTML
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editorKey, setEditorKey] = useState(0);
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    if (!editorValue || editorValue.length === 0) {
      alert("Content cannot be empty");
      return;
    }

    const payload = {
      title,
      contentJSON: editorValue,
      contentHTML: htmlOutput,
      uploadedImages, // 🔥 IMPORTANT
    };

    setLoading(true);
    try {
      const res = await axios.post("/create-news", payload); // Axios automatically handles JSON

      // If status is 2xx, Axios considers it successful
      alert(res.data.message || "Article saved successfully!");

      // Reset form
      setTitle("");
      setEditorValue([{ type: "paragraph", children: [{ text: "" }] }]);
      setEditorKey((prev) => prev + 1);
      setHtmlOutput("");
    } catch (err) {
      console.error(err);

      // Axios error handling
      if (err.response) {
        // Server responded with a status outside 2xx
        alert(err.response.data.message || "Failed to save article");
      } else if (err.request) {
        // Request was made but no response
        alert("No response from server");
      } else {
        // Other errors
        alert("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Stack spacing={3}>
        {/* Title Input */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Editor */}
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

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit Article"}
        </Button>
      </Stack>
    </Container>
  );
}
