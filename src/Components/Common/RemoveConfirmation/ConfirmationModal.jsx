import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import { Warning } from "../../../assets/IconSet";
import { useState } from "react";

export default function ConfirmationModal({
  open,
  title = "Are you sure?",
  message,
  itemName = "",
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmColor = "primary",
  showRemarks = false, // ✅ new prop
}) {
  const [remarks, setRemarks] = useState("");

  const handleConfirm = () => {
    onConfirm(remarks); // ✅ send remarks to parent
    setRemarks("");
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        {/* Header */}
        <Box
          sx={{
            p: "16px",
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Box>

        {/* Content */}
        <Stack
          gap="16px"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ p: "24px 16px" }}
        >
          <Warning size="48px" color="#dc3545" />
          <Typography
            variant="body1"
            sx={{ textAlign: "center", whiteSpace: "pre-line" }}
          >
            {message || (
              <>
                Are you sure you want to delete{" "}
                <strong>&quot;{itemName}&quot;</strong>?
              </>
            )}
          </Typography>

          {/* ✅ Remarks input (visible only when showRemarks = true) */}
          {showRemarks && (
            <TextField
              label="Remarks"
              multiline
              minRows={3}
              fullWidth
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Write your remarks here..."
              sx={{
                mt: 2,
              }}
            />
          )}
        </Stack>

        {/* Actions */}
        <Stack
          direction={"row"}
          gap="16px"
          justifyContent={"flex-end"}
          sx={{ p: "16px", borderTop: "1px solid rgba(145, 158, 171, 0.24)" }}
        >
          <Button onClick={onClose} color="inherit">
            {cancelLabel}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={confirmColor}
          >
            {confirmLabel}
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  itemName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  confirmColor: PropTypes.string,
  showRemarks: PropTypes.bool, // ✅ new
};
