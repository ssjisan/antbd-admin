import { Box, IconButton, Modal, useMediaQuery } from "@mui/material";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import PropTypes from "prop-types";
import "./GalleryStyles.css";
import Icon from "../../Icon";

export default function Gallery({
  albumOpen,
  handleAlbumClose,
  selectedImages,
}) {
  const forBelow767 = useMediaQuery("(max-width:767px)");

  const GalleryStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    p: 4,
    border: "0px solid transparent",
    boxShadow: 0,
    position: "relative", // Required for absolute positioning of close button
  };

  const galleryImages = selectedImages?.map((image) => ({
    original: image.src,
    thumbnail: image.src,
  }));

  return (
    <Modal
      open={albumOpen}
      onClose={handleAlbumClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 32, 51, 0.64)",
        },
      }}
    >
      <Box sx={GalleryStyle}>
        {/* Close Button */}
        <IconButton
          onClick={handleAlbumClose}
          sx={{
            position: "absolute",
            top: forBelow767 && -10,
            right: 40,
            zIndex: "10000000",
            bgcolor: "white", // Remove background
          }}
        >
          <Icon name="cross" size={24} color="red" />
        </IconButton>

        <ImageGallery items={galleryImages} />
      </Box>
    </Modal>
  );
}

Gallery.propTypes = {
  selectedImages: PropTypes.array.isRequired,
  handleAlbumClose: PropTypes.func.isRequired,
  albumOpen: PropTypes.bool.isRequired,
};
