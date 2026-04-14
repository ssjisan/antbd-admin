import { useEffect, useRef, useState } from "react";

const Map = ({ searchQuery, setSearchQuery, polygons, setPolygons }) => {
  const mapRef = useRef(null);
  const [activeTool, setActiveTool] = useState("");
  const [googleMap, setGoogleMap] = useState(null);
  const polygonsRef = useRef([]);
  const drawingManagerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const searchMarkerRef = useRef(null);
  const geocoderRef = useRef(null);
  const mapClickListenerRef = useRef(null);

  // Load polygons from localStorage
  useEffect(() => {
    if (window.google && googleMap && Array.isArray(polygons)) {
      // Clear any previously drawn polygons
      polygonsRef.current.forEach((polygon) => polygon.setMap(null));
      polygonsRef.current = [];

      const bounds = new window.google.maps.LatLngBounds();

      polygons.forEach((polyObj) => {
        if (!polyObj || !Array.isArray(polyObj.coordinates)) return;

        const path = polyObj.coordinates.map(([lat, lng]) => {
          const latLng = new window.google.maps.LatLng(lat, lng);
          bounds.extend(latLng);
          return { lat, lng };
        });

        const polygon = new window.google.maps.Polygon({
          paths: path,
          map: googleMap,
          editable: false,
          strokeColor: "#FF0000",
          fillColor: "#FF0000",
          strokeOpacity: 0.4,
          strokeWeight: 2,
          clickable: false,
        });

        polygonsRef.current.push(polygon);
      });

      if (!bounds.isEmpty()) {
        googleMap.fitBounds(bounds);
      }
    }
  }, [googleMap, polygons]);

  // Init Map
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6tI6z6qCTkXDp-pSl8F22SvsvNR1rOA&libraries=drawing,geometry,places";
    script.async = true;
    script.onload = () => {
      const mapOptions = {
        center: { lat: 23.8103, lng: 90.4125 },
        zoom: 13,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        scrollwheel: true,
      };
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      setGoogleMap(map);
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
      placesServiceRef.current = new window.google.maps.places.PlacesService(
        map
      );
      geocoderRef.current = new window.google.maps.Geocoder();
    };
    document.head.appendChild(script);
  }, []);

  // Handle map click
  useEffect(() => {
    if (!googleMap) return;

    if (mapClickListenerRef.current) {
      window.google.maps.event.removeListener(mapClickListenerRef.current);
      mapClickListenerRef.current = null;
    }

    mapClickListenerRef.current = googleMap.addListener("click", (e) => {
      const latLng = e.latLng;
      if (!latLng) return;
      if (searchMarkerRef.current) {
        searchMarkerRef.current.setPosition(latLng);
      } else {
        searchMarkerRef.current = new window.google.maps.Marker({
          position: latLng,
          map: googleMap,
          animation: window.google.maps.Animation.DROP,
        });
      }
      googleMap.panTo(latLng);
      googleMap.setZoom(15);
      if (geocoderRef.current) {
        geocoderRef.current.geocode({ location: latLng }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
            setSearchQuery(results[0].formatted_address);
            setSuggestions([]);
          } else {
            setSearchQuery("");
          }
        });
      }
    });

    return () => {
      if (mapClickListenerRef.current) {
        window.google.maps.event.removeListener(mapClickListenerRef.current);
        mapClickListenerRef.current = null;
      }
    };
  }, [googleMap]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!autocompleteServiceRef.current) return;

    if (val.length >= 5) {
      setLoadingSuggestions(true);
      autocompleteServiceRef.current.getPlacePredictions(
        { input: val },
        (predictions, status) => {
          setLoadingSuggestions(false);
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (place) => {
    setSearchQuery(place.description);
    setSuggestions([]);
    if (!placesServiceRef.current || !googleMap) return;
    placesServiceRef.current.getDetails(
      { placeId: place.place_id, fields: ["geometry"] },
      (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if (result.geometry && result.geometry.location) {
            const location = result.geometry.location;
            googleMap.panTo(location);
            googleMap.setZoom(15);
            if (searchMarkerRef.current) {
              searchMarkerRef.current.setPosition(location);
            } else {
              searchMarkerRef.current = new window.google.maps.Marker({
                position: location,
                map: googleMap,
                animation: window.google.maps.Animation.DROP,
              });
            }
          }
        }
      }
    );
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    if (!googleMap || !geocoderRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng = new window.google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        googleMap.panTo(latLng);
        googleMap.setZoom(15);
        if (searchMarkerRef.current) {
          searchMarkerRef.current.setPosition(latLng);
        } else {
          searchMarkerRef.current = new window.google.maps.Marker({
            position: latLng,
            map: googleMap,
            animation: window.google.maps.Animation.DROP,
          });
        }
        geocoderRef.current.geocode({ location: latLng }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
            setSearchQuery(results[0].formatted_address);
            setSuggestions([]);
          } else {
            setSearchQuery("");
          }
        });
      },
      (error) => {
        alert("Unable to retrieve your location: " + error.message);
      }
    );
  };

  const handleDraw = () => {
    setActiveTool("draw");
    if (!googleMap) return;
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setMap(null);
    }

    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions: {
        editable: true,
        strokeColor: "#2196f3",
        fillColor: "#2196f3",
        strokeWeight: 2,
        clickable: false,
      },
    });

    drawingManager.setMap(googleMap);
    drawingManagerRef.current = drawingManager;

    window.google.maps.event.addListener(
      drawingManager,
      "polygoncomplete",
      (polygon) => {
        polygonsRef.current.push(polygon);
        savePolygons();
        polygon.setEditable(false);
        drawingManager.setDrawingMode(null);
        setActiveTool("");
      }
    );
  };

  const handleEdit = () => {
    setActiveTool("edit");

    polygonsRef.current.forEach((polygon) => {
      polygon.setEditable(true);

      const path = polygon.getPath();
      window.google.maps.event.addListener(path, "set_at", savePolygons);
      window.google.maps.event.addListener(path, "insert_at", savePolygons);
      window.google.maps.event.addListener(path, "remove_at", savePolygons);

      // Add right-click listener on vertices to delete them
      window.google.maps.event.addListener(path, "rightclick", (e) => {
        // Only delete vertex if right-click on a vertex (not on empty path area)
        if (e.vertex != null) {
          path.removeAt(e.vertex);
          savePolygons();
        }
      });
    });
  };

  const handleDeleteMode = () => {
    setActiveTool("delete");

    polygonsRef.current.forEach((polygon, index) => {
      polygon.setOptions({ clickable: true });

      const clickListener = polygon.addListener("click", () => {
        polygon.setMap(null); // Remove from map
        polygonsRef.current.splice(index, 1); // Remove from array
        savePolygons(); // Save updated polygons
        setActiveTool(""); // Exit delete mode
      });

      // Store listener so you can remove later if needed (optional)
      polygon._deleteListener = clickListener;
    });
  };

  useEffect(() => {
    if (activeTool !== "delete") {
      polygonsRef.current.forEach((polygon) => {
        polygon.setOptions({ clickable: false });
        if (polygon._deleteListener) {
          window.google.maps.event.removeListener(polygon._deleteListener);
          polygon._deleteListener = null;
        }
      });
    }
  }, [activeTool]);

  const handleClear = () => {
    setActiveTool("clear");
    polygonsRef.current.forEach((poly) => poly.setMap(null));
    polygonsRef.current = [];
    localStorage.removeItem("savedPolygons");
    setPolygons([]);
    if (searchMarkerRef.current) {
      searchMarkerRef.current.setMap(null);
      searchMarkerRef.current = null;
    }
  };

  // Save polygons with coordinates: [[lat, lng]]
  const savePolygons = () => {
    const data = polygonsRef.current.map((polygon) => {
      const path = polygon.getPath();
      const coordinates = [];
      for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        coordinates.push([point.lat(), point.lng()]);
      }
      return { coordinates };
    });
    localStorage.setItem("savedPolygons", JSON.stringify(data));
    setPolygons(data);
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 16 }}>
      <div style={{ position: "relative", marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Search location (min 5 characters)..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "8px 36px 8px 12px",
            fontSize: 16,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        {loadingSuggestions && (
          <div
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              width: 20,
              height: 20,
              border: "3px solid #ccc",
              borderTop: "3px solid #2196f3",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        )}
        {suggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: 4,
              maxHeight: 180,
              overflowY: "auto",
              zIndex: 1000,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {suggestions.map((place) => (
              <li
                key={place.place_id}
                onClick={() => handleSuggestionClick(place)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                {place.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={handleDraw}
          style={{
            backgroundColor: activeTool === "draw" ? "#4caf50" : "#e0e0e0",
            color: activeTool === "draw" ? "#fff" : "#000",
            marginRight: 8,
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Draw
        </button>
        <button
          onClick={handleDeleteMode}
          style={{
            backgroundColor: activeTool === "delete" ? "#f44336" : "#e0e0e0",
            color: activeTool === "delete" ? "#fff" : "#000",
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          Delete Area
        </button>
        <button
          onClick={handleEdit}
          style={{
            backgroundColor: activeTool === "edit" ? "#2196f3" : "#e0e0e0",
            color: activeTool === "edit" ? "#fff" : "#000",
            marginRight: 8,
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={handleClear}
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Clear
        </button>
        <button
          onClick={handleUseMyLocation}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          Use My Location
        </button>
      </div>

      <div
        ref={mapRef}
        style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
      />

      {/* Display coordinates */}
      <div style={{ marginTop: 20, paddingBottom: 20 }}>
        <h3>Saved Polygon Coordinates</h3>
        {(!Array.isArray(polygons) || polygons.length === 0) && (
          <p>No polygons drawn yet.</p>
        )}
        {Array.isArray(polygons) &&
          polygons.map((poly, index) => (
            <div key={index} style={{ marginBottom: 15 }}>
              <strong>Polygon {index + 1}:</strong>
              <ul style={{ paddingLeft: 20, marginTop: 5 }}>
                {Array.isArray(poly.coordinates) &&
                  poly.coordinates.map(([lat, lng], idx) => (
                    <li key={idx}>
                      Lat: {lat.toFixed(5)}, Lng: {lng.toFixed(5)}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Map;
