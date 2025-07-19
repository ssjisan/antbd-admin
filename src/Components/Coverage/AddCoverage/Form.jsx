import PropTypes from "prop-types";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Stack,
} from "@mui/material";

export default function Form({
  imagePreview,
  onImageChange,
  areaName,
  setAreaName,
  zone,
  setZone,
  zoneOptions,
  address,
  setAddress,
  onSave,
  error,
}) {
  const imageUrl = imagePreview
    ? typeof imagePreview === "object" && imagePreview.url
      ? imagePreview.url
      : typeof imagePreview === "string"
      ? imagePreview
      : URL.createObjectURL(imagePreview)
    : null;

  return (
    <Box
      sx={{
        p: {
          xs: 0,
          sm: 2,
        },
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      <Stack gap="16px" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Area Cover Image
        </Typography>

        <Box
          onClick={() =>
            document.getElementById("area-image-upload-input")?.click()
          }
          sx={{
            width: "100%",
            height: "320px",
            background: "#F6F7F8",
            borderRadius: "12px",
            border: "3px solid #fff",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="Area"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </>
          ) : (
            <Stack sx={{ textAlign: "center" }}>
              <Typography color="text.primary" variant="h6" sx={{ fontWeight: 500 }}>
                Click here to upload a cover
              </Typography>
              <Typography variant="body2" sx={{ color: "#919EAB", fontWeight: 500 }}>
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
              </Typography>
            </Stack>
          )}

          <input
            type="file"
            hidden
            id="area-image-upload-input"
            accept="image/*"
            onChange={onImageChange}
          />
        </Box>

        {error && (
          <Stack
            sx={{
              p: "16px",
              backgroundColor: "#FFF2EF",
              borderRadius: "12px",
            }}
          >
            <Typography color="text.primary" variant="body2" sx={{ fontWeight: 600 }}>
              {error.fileName} - {error.fileSize} Mb
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#919EAB",
                fontWeight: 500,
              }}
            >
              {error.message}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Autocomplete
        options={zoneOptions}
        getOptionLabel={(option) => option.name || ""}
        value={zoneOptions.find((z) => z._id === zone) || null}
        onChange={(_, newValue) => setZone(newValue?._id || "")}
        renderInput={(params) => (
          <TextField {...params} label="Zone" margin="normal" fullWidth />
        )}
      />

      <TextField
        label="Area Name"
        fullWidth
        margin="normal"
        value={areaName}
        onChange={(e) => setAreaName(e.target.value)}
      />

      <TextField
        label="Office Address"
        fullWidth
        multiline
        rows={3}
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={onSave}
      >
        Save Area
      </Button>
    </Box>
  );
}

Form.propTypes = {
  imagePreview: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onImageChange: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
  areaName: PropTypes.string.isRequired,
  setAreaName: PropTypes.func.isRequired,
  zone: PropTypes.string.isRequired,
  setZone: PropTypes.func.isRequired,
  zoneOptions: PropTypes.array.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  error: PropTypes.object,
};

Form.defaultProps = {
  imagePreview: null,
  error: null,
};
