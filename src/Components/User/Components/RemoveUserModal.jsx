import { Box, Button, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function RemoveUserModal({
  isModalOpen,
  handleRemove,
  userRemoveModal,
}) {
  return (
    <Modal open={isModalOpen} onClose={userRemoveModal}>
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Button
          id="modal-modal-description"
          sx={{ mt: 2 }}
          onClick={handleRemove}
        >
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Button>
      </Box>
    </Modal>
  );
}

RemoveUserModal.propTypes = {
  isModalOpen: PropTypes.any,
  handleRemove: PropTypes.any,
  userRemoveModal: PropTypes.any,
};
