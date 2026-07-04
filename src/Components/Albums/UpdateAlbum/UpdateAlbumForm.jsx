import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AlbumAdd } from "../../../assets/IconSet";
import PropTypes from "prop-types";

export default function UpdateAlbumForm({
  albumName,
  setAlbumName,
  isLoading,
  handleSubmit,
  onImageUpload,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Update Album
      </Typography>
      <Stack direction="column" spacing={3}>
        <TextField
          label="Album Name"
          variant="outlined"
          fullWidth
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)} // Update album name
          sx={{ mb: 3 }}
        />
        <Button
          color="inherit"
          variant="soft"
          startIcon={<AlbumAdd size="24px" color={"#060415"} />}
          component="label"
          sx={{ mb: 3 }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={(e) => onImageUpload(e)}
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading} // Disable button while loading
          endIcon={
            isLoading && <CircularProgress size={24} sx={{ color: "white" }} />
          }
        >
          Update Album
        </Button>
      </Stack>
    </Box>
  );
}

UpdateAlbumForm.propTypes = {
  albumName: PropTypes.string.isRequired,
  setAlbumName: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
};
