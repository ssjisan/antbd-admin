import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Box,
  TextField,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import toast from "react-hot-toast";
import { GPS } from "../../../assets/IconSet";

export default function Map({
  searchQuery,
  setSearchQuery,
  polygons,
  setPolygons,
}) {
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const markerRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);

  // Initialize map
  useEffect(() => {
    const map = L.map("map");
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        marker: false,
        circle: false,
        rectangle: false,
        polyline: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);

    const savePolygons = () => {
      const allPolygons = [];
      drawnItems.eachLayer((layer) => {
        if (layer instanceof L.Polygon) {
          const coords = layer
            .getLatLngs()[0]
            .map((latlng) => [latlng.lat, latlng.lng]);
          allPolygons.push({ coordinates: coords });
        }
      });
      setPolygons(allPolygons);
    };

    map.on("draw:created", (e) => {
      drawnItems.addLayer(e.layer);
      savePolygons();
    });

    map.on("draw:deleted", savePolygons);
    map.on("draw:edited", savePolygons);

    map.locate({ setView: true, maxZoom: 100 });

    map.once("locationfound", async (e) => {
      const latlng = e.latlng;
      if (markerRef.current) map.removeLayer(markerRef.current);

      markerRef.current = L.marker(latlng)
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();

      map.setView(latlng, 100);
      setTimeout(() => map.invalidateSize(), 100);

      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              format: "json",
              lat: latlng.lat,
              lon: latlng.lng,
              zoom: 20,
              addressdetails: 1,
            },
            headers: { "User-Agent": "YourApp/1.0" },
          }
        );
        setSearchQuery(
          res.data?.display_name || `${latlng.lat}, ${latlng.lng}`
        );
      } catch {
        setSearchQuery(`${latlng.lat}, ${latlng.lng}`);
      }
    });

    map.once("locationerror", () => {
      toast.error("Unable to retrieve your location. Showing default view.");
      map.setView([23.7414, 90.4149], 100);
      setTimeout(() => map.invalidateSize(), 100);
    });

    map.on("click", async (e) => {
      const latlng = e.latlng;
      if (markerRef.current) map.removeLayer(markerRef.current);

      markerRef.current = L.marker(latlng)
        .addTo(map)
        .bindPopup("Custom selected location")
        .openPopup();

      map.setView(latlng, 100);
      setTimeout(() => map.invalidateSize(), 100);

      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              format: "json",
              lat: latlng.lat,
              lon: latlng.lng,
              zoom: 20,
              addressdetails: 1,
            },
            headers: { "User-Agent": "YourApp/1.0" },
          }
        );

        setSearchQuery(
          res.data?.display_name || `${latlng.lat}, ${latlng.lng}`
        );
        setSuggestions([]);
      } catch {
        setSearchQuery(`${latlng.lat}, ${latlng.lng}`);
        toast.error("Failed to get address from dropped pin.");
      }
    });

    return () => {
      map.off();
      map.remove();
    };
  }, [setPolygons, setSearchQuery]);

  // Load existing polygons from props
  useEffect(() => {
    if (!mapRef.current || !drawnItemsRef.current || !Array.isArray(polygons))
      return;

    drawnItemsRef.current.clearLayers();

    polygons.forEach((poly) => {
      if (poly.coordinates?.length) {
        const latlngs = poly.coordinates.map(([lat, lng]) =>
          L.latLng(lat, lng)
        );
        const polygon = L.polygon(latlngs, { color: "#3388ff" });
        drawnItemsRef.current.addLayer(polygon);
      }
    });

    if (polygons.length > 0) {
      const allPoints = polygons.flatMap((p) =>
        p.coordinates.map(([lat, lng]) => L.latLng(lat, lng))
      );
      const bounds = L.latLngBounds(allPoints);
      mapRef.current.fitBounds(bounds);
    }
  }, [polygons]);

  // Handle search input
  const fetchSuggestions = async (query) => {
    setIsLoading(true);
    setNoResult(false);

    try {
      const { data } = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            format: "json",
            q: query,
            addressdetails: 1,
            limit: 10,
          },
          headers: { "User-Agent": "YourApp/1.0" },
        }
      );

      const bdResults = data.filter((p) => p.address?.country_code === "bd");
      const sorted = [
        ...bdResults,
        ...data.filter((p) => p.address?.country_code !== "bd"),
      ];

      setSuggestions(sorted.slice(0, 5));
      setNoResult(sorted.length === 0);
    } catch {
      toast.error("Error fetching location suggestions.");
      setSuggestions([]);
      setNoResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length >= 4) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setNoResult(false);
    }
  };

  const handleSelectSuggestion = (place) => {
    setSearchQuery(place.display_name);
    setSuggestions([]);

    const latLng = L.latLng(parseFloat(place.lat), parseFloat(place.lon));

    if (markerRef.current) mapRef.current.removeLayer(markerRef.current);

    markerRef.current = L.marker(latLng)
      .addTo(mapRef.current)
      .bindPopup("Selected location")
      .openPopup();

    mapRef.current.setView(latLng, 100);
    setTimeout(() => mapRef.current.invalidateSize(), 100);
  };

  const handleTrackUserLocation = () => {
    if (!mapRef.current) return;

    mapRef.current.locate({ setView: true, maxZoom: 100 });

    mapRef.current.once("locationfound", async (e) => {
      const latlng = e.latlng;
      if (markerRef.current) mapRef.current.removeLayer(markerRef.current);

      markerRef.current = L.marker(latlng)
        .addTo(mapRef.current)
        .bindPopup("You are here")
        .openPopup();

      mapRef.current.setView(latlng, 100);
      setTimeout(() => mapRef.current.invalidateSize(), 100);

      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              format: "json",
              lat: latlng.lat,
              lon: latlng.lng,
              zoom: 20,
              addressdetails: 1,
            },
            headers: { "User-Agent": "YourApp/1.0" },
          }
        );

        setSearchQuery(
          res.data?.display_name || `${latlng.lat}, ${latlng.lng}`
        );
        setSuggestions([]);
      } catch {
        toast.error("Unable to fetch area name.");
        setSearchQuery(`${latlng.lat}, ${latlng.lng}`);
        setSuggestions([]);
      }
    });

    mapRef.current.once("locationerror", () => {
      toast.error("Unable to retrieve your location.");
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        position: "relative",
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      <Box sx={{ mb: 1, position: "relative", zIndex: 1 }}>
        <TextField
          placeholder="Search location..."
          value={searchQuery}
          onChange={handleInputChange}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <>
                {isLoading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                <InputAdornment position="end">
                  <IconButton onClick={handleTrackUserLocation}>
                    <GPS color="#000" size="20px" />
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}
        />

        {suggestions.length > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "40px",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ccc",
              zIndex: 1500,
              maxHeight: "200px",
              overflowY: "auto",
              boxShadow: 3,
            }}
          >
            {suggestions.map((s, i) => (
              <Box
                key={i}
                sx={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  ":hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => handleSelectSuggestion(s)}
              >
                {s.display_name}
              </Box>
            ))}
          </Box>
        )}

        {noResult && !isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "40px",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ccc",
              zIndex: 1500,
              boxShadow: 3,
              p: 2,
              textAlign: "center",
              color: "#999",
            }}
          >
            No results found.
          </Box>
        )}
      </Box>

      <Box
        id="map"
        sx={{
          height: "560px",
          width: "100%",
          borderRadius: 1,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          background: "#fff",
          px: 2,
          py: 1,
          fontSize: "13px",
          borderRadius: "8px",
          zIndex: 999,
          boxShadow: 1,
          color: "#000",
          fontWeight: 700,
        }}
      >
        💡 Tip: Click on the map to drop a location manually if GPS or search
        fails.
      </Box>
    </Box>
  );
}

Map.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  polygons: PropTypes.array.isRequired,
  setPolygons: PropTypes.func.isRequired,
};
