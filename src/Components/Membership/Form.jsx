import PropTypes from "prop-types";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function Form({
  handleSubmit,
  fileInputRef,
  handleImageChange,
  handleClickUpload,
  name,
  setName,
  preview,
  order,
  setOrder,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={600}>
          Membership&apos;s
        </Typography>

        <TextField
          name="name"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* NEW ORDER FIELD */}
        <TextField
          name="order"
          label="Order"
          type="number"
          fullWidth
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          inputProps={{ min: 0 }}
        />

        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <Box
          onClick={handleClickUpload}
          sx={{
            width: "100%",
            height: 250,
            border: "2px dashed #ccc",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
            position: "relative",
            p: 2,
          }}
        >
          {preview ? (
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "filter 0.3s ease-in-out",
                  "&:hover": { filter: "blur(4px)" },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  pointerEvents: "none",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.4)",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                  }}
                >
                  Change Image
                </Typography>
              </Box>
            </Box>
          ) : (
            <Stack sx={{ textAlign: "center" }}>
              <Typography
                color="text.primary"
                variant="body1"
                sx={{ fontWeight: 500 }}
              >
                Click here to upload logo
              </Typography>
              <Typography
                sx={{
                  color: "#919EAB",
                  fontSize: "12px !important",
                  fontWeight: 500,
                }}
              >
                Allowed *.jpeg, *.jpg, *.png max size of 1 Mb
              </Typography>
            </Stack>
          )}
        </Box>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleClickUpload: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  preview: PropTypes.string,
  order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setOrder: PropTypes.func,
};
