import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { Box, Button, Stack, Typography } from "@mui/material";
import Icon from "../../Icon";

export default function RemoveAlbum({
  confirmationModalOpen,
  handleConfirmRemove,
  albumName,
  handleCloseRemoveAlbum,
}) {
  return (
    <Modal open={confirmationModalOpen} onClose={handleCloseRemoveAlbum}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          width: "480px",
          maxWidth: "90%",
        }}
      >
        <Box
          sx={{
            p: "16px",
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Delete Album
          </Typography>
        </Box>
        <Stack
          gap="16px"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            p: "24px 16px",
          }}
        >
          <Icon name="warning" size="48px" color="#dc3545" />
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Are you sure you want to delete{" "}
            <strong>&quot;{albumName}&quot;</strong>?
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          gap="16px"
          justifyContent={"flex-end"}
          sx={{ p: "16px", borderTop: "1px solid rgba(145, 158, 171, 0.24)" }}
        >
          <Button onClick={handleCloseRemoveAlbum} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmRemove}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}

RemoveAlbum.propTypes = {
  confirmationModalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  albumName: PropTypes.string.isRequired,
  handleConfirmRemove: PropTypes.func.isRequired,
  handleCloseRemoveAlbum: PropTypes.func.isRequired,
};
