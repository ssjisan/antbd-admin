import { useRef } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Cross } from "../../../assets/IconSet";

export default function CoverageMap({ onClose, isMapModalOpen, polygonData }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const initializeMap = () => {
    const container = mapContainerRef.current;
    if (!container || !polygonData?.length) return;

    // Remove existing map if present
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const firstCoord = polygonData[0].coordinates[0];
    const map = L.map(container).setView(firstCoord, 17);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    polygonData.forEach((poly) => {
      const latlngs = poly.coordinates.map(([lat, lng]) => [lat, lng]);
      const polygon = L.polygon(latlngs, { color: "blue" }).addTo(map);
      map.fitBounds(polygon.getBounds());
    });
  };

  const handleFadeEntered = () => {
    setTimeout(() => {
      initializeMap();
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 300); // slight delay ensures container is fully visible
  };

  return (
    <Modal
      open={isMapModalOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={isMapModalOpen} onEntered={handleFadeEntered}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            borderRadius: "8px",
            width: "90vw",
            maxWidth: "1400px",
            height: "80vh",
            outline: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            sx={{ p: 2, borderBottom: "1px solid rgba(145, 158, 171, 0.24)" }}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">View Area on Map</Typography>
            <IconButton onClick={onClose}>
              <Cross size="24px" color="#000" />
            </IconButton>
          </Stack>

          <Box
            ref={mapContainerRef}
            id="leaflet-map-container"
            sx={{
              flex: 1,
              height: "100%",
              width: "100%",
              "& .leaflet-container": {
                height: "100%",
                width: "100%",
              },
            }}
          />
        </Box>
      </Fade>
    </Modal>
  );
}

CoverageMap.propTypes = {
  isMapModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  polygonData: PropTypes.array.isRequired,
};
