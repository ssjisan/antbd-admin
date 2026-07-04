import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Icon from "../../Icon";

export default function UploadAlbumForm({
  onImageUpload,
  onFormSubmit,
  isSubmitting,
  albumName, // Accept albumName as a prop
  setAlbumName, // Accept setAlbumName as a prop
}) {
  return (
    <Box component="form" onSubmit={onFormSubmit}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Create Album
      </Typography>
      <Stack direction="column" spacing={3}>
        <TextField
          label="Album Name"
          variant="outlined"
          fullWidth
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)} // Update album name state
          sx={{ mb: 3 }}
        />
        <Button
          color="inherit"
          variant="soft"
          startIcon={<Icon name="albumadd" size="24px" color={"#060415"} />}
          component="label"
          sx={{ mb: 3 }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            name="images"
            hidden
            multiple
            onChange={onImageUpload}
          />
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          endIcon={
            isSubmitting && (
              <CircularProgress size={24} sx={{ color: "white" }} />
            )
          }
        >
          Create
        </Button>
        <Typography variant="body2" color={"text.secondary"}>
          Maximum file size is 2MB.
        </Typography>
      </Stack>
    </Box>
  );
}

UploadAlbumForm.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired, // Change to bool from func
  albumName: PropTypes.string.isRequired, // Accept albumName prop
  setAlbumName: PropTypes.func.isRequired, // Accept setAlbumName prop
};
