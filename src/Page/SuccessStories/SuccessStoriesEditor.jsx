import { Box, Typography } from "@mui/material";
import SuccessStoriesEditorPage from "../../Components/SuccessStories/SuccessStoriesEditorPage";

export default function SuccessStoriesEditor() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "48px" }}>
        News Editor
      </Typography>
      <SuccessStoriesEditorPage />
    </Box>
  );
}
