import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Icon from "../../Icon";

export default function ConfirmationModal({
  open,
  title = "Are you sure?",
  message,
  itemName = "",
  onClose,
  onConfirm,
  confirmLabel = "Yes, Delete",
  cancelLabel = "Cancel",
  confirmColor = "error",
  showRemarks = false,
  onRemarksChange,
  remarksValue = "",
}) {
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
        <Stack
          gap="16px"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ p: "24px 16px" }}
        >
          <Icon name="warning" size="48px" color="#dc3545" />
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {message || (
              <>
                Are you sure you want to delete{" "}
                <strong>&quot;{itemName}&quot;</strong>?
              </>
            )}
          </Typography>
          {showRemarks && (
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Remarks"
              value={remarksValue}
              onChange={(e) => onRemarksChange?.(e.target.value)}
            />
          )}
        </Stack>
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
            onClick={() => onConfirm(remarksValue)}
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
  showRemarks: PropTypes.bool,
  onRemarksChange: PropTypes.func.isRequired,
  remarksValue: PropTypes.string,
};
