import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Cross } from "../../../assets/IconSet";

const loadGoogleMaps = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
    return;
  }

  const existingScript = document.querySelector("script[src*='maps.googleapis']");
  if (existingScript) {
    existingScript.addEventListener("load", callback);
    return;
  }

  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6tI6z6qCTkXDp-pSl8F22SvsvNR1rOA&libraries=drawing,geometry,places";
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
};

export default function CoverageMap({ onClose, isMapModalOpen, polygonData }) {
  const mapRef = useRef(null);
  const polygonsRef = useRef([]);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (!isMapModalOpen) {
      polygonsRef.current.forEach((polygon) => polygon.setMap(null));
      polygonsRef.current = [];
      if (mapRef.current) {
        mapRef.current = null;
      }
      return;
    }
    setMapKey((k) => k + 1);
  }, [isMapModalOpen]);

  useEffect(() => {
    if (!isMapModalOpen) return;
    if (!polygonData?.length) return;

    const init = () => {
      polygonsRef.current.forEach((polygon) => polygon.setMap(null));
      polygonsRef.current = [];

      const container = document.getElementById("google-map-container");
      if (!container) return;

      const map = new window.google.maps.Map(container, {
        center: { lat: 23.8103, lng: 90.4125 },
        zoom: 13,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
      mapRef.current = map;

      const allBounds = new window.google.maps.LatLngBounds();

      polygonData.forEach((poly) => {
        const path = poly.coordinates.map(([lat, lng]) => ({ lat, lng }));
        const polygon = new window.google.maps.Polygon({
          paths: path,
          strokeColor: "#4285F4",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#4285F4",
          fillOpacity: 0.35,
        });

        polygon.setMap(map);
        polygonsRef.current.push(polygon);

        path.forEach((point) => allBounds.extend(point));
      });

      map.fitBounds(allBounds);
    };

    if (
      typeof window.google === "object" &&
      typeof window.google.maps === "object"
    ) {
      init();
    } else {
      loadGoogleMaps(init);
    }
  }, [isMapModalOpen, polygonData, mapKey]);

  return (
    <Modal
      open={isMapModalOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={isMapModalOpen}>
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
            id="google-map-container"
            key={mapKey}
            sx={{
              flex: 1,
              height: "100%",
              width: "100%",
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
