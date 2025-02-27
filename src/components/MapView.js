import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import icons
import redIcon from "../assets/drone-red.png";
import yellowIcon from "../assets/drone-yellow.png";
import cyanIcon from "../assets/drone-cyan.png";
import grayIcon from "../assets/drone-gray.png";

// Helper function for icons
const getIconByState = (state, isSelected) => {
  const baseSize = isSelected ? [48, 48] : [32, 32];
  switch (state) {
    case "Warning":
      return L.icon({ iconUrl: redIcon, iconSize: baseSize, iconAnchor: [16, 16] });
    case "Caution":
      return L.icon({ iconUrl: yellowIcon, iconSize: baseSize, iconAnchor: [16, 16] });
    case "Expected Change":
      return L.icon({ iconUrl: cyanIcon, iconSize: baseSize, iconAnchor: [16, 16] });
    case "Normal":
    default:
      return L.icon({ iconUrl: grayIcon, iconSize: baseSize, iconAnchor: [16, 16] });
  }
};

// Helper function for flight name icons
const getFlightNameIcon = (name, isSelected) => {
  const color = isSelected ?  "#0000FF" : "#E7E43E"; // Highlight selected name
  return L.divIcon({
    className: "flight-name-icon",
    html: `<div style="text-align: center; font-weight: bold; font-size: 12px; color: ${color};">${name}</div>`,
    iconSize: [0, 0],
    iconAnchor: [16, -8],
  });
};

// Component to dynamically zoom to selected marker
const FlyToSelectedMarker = ({ selectedAircraft, allAircrafts }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedAircraft) {
      map.flyTo(
        [selectedAircraft.latitude, selectedAircraft.longitude],
        13, // Zoom level
        { duration: 1.5 }
      );
    } else if (allAircrafts.length > 0) {
      const bounds = allAircrafts.map((aircraft) => [aircraft.latitude, aircraft.longitude]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [selectedAircraft, allAircrafts, map]);

  return null;
};

const MapView = ({ mapViewData, selectedAircraft, onSelectAircraft }) => {
  const [mapStyle, setMapStyle] = useState("dark-v10");

  // Rectangle coordinates for visual boundaries
  const boundsOuter = [
    [54.1, 13.5],
    [53.8, 14.6],
  ];
  const boundsMiddle = [
    [54.05, 13.6],
    [53.85, 14.5],
  ];
  const boundsInner = [
    [54.0, 13.7],
    [53.9, 14.4],
  ];

  // Button styling for theme selection
  const buttonStyle = {
    backgroundColor: "#3D4F53",
    color: "#FFFFFF",
    fontFamily: "'Chakra Petch', sans-serif",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#E7E43E",
    color: "#2D403F",
  };

  return (
    <>
      {/* Map Style and Reset Buttons */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => setMapStyle("dark-v10")}
          style={mapStyle === "dark-v10" ? activeButtonStyle : buttonStyle}
        >
          Dark
        </button>
        <button
          onClick={() => setMapStyle("light-v10")}
          style={mapStyle === "light-v10" ? activeButtonStyle : buttonStyle}
        >
          Light
        </button>
        <button
          onClick={() => setMapStyle("satellite-streets-v11")}
          style={mapStyle === "satellite-streets-v11" ? activeButtonStyle : buttonStyle}
        >
          Satellite
        </button>
        <button
          onClick={() => setMapStyle("streets-v11")}
          style={mapStyle === "streets-v11" ? activeButtonStyle : buttonStyle}
        >
          Streets
        </button>
        <button
          onClick={() => onSelectAircraft(null)} // Reset selection
          style={{
            ...buttonStyle,
            backgroundColor: "#FF4500", // Different color for reset button
            color: "#FFFFFF",
          }}
        >
          Reset View
        </button>
      </div>

      {/* Map Container */}
      <MapContainer center={[52.3, 10.5]} zoom={11} style={{ height: "65vh", width: "100%", borderRadius: "8px" }}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5qYWx5LWNsYXVzdGhhbCIsImEiOiJjbTBrbnJ5YmowdzV4MmpxdzF1MGxrNHMxIn0.HKayHQR7X8J95mNMLfIHvg`}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />

        {/* Rectangles */}
        <Rectangle bounds={boundsOuter} pathOptions={{ color: "yellow", weight: 3, fill: false }} />
        <Rectangle bounds={boundsMiddle} pathOptions={{ color: "red", weight: 2, fill: false }} />
        <Rectangle bounds={boundsInner} pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.4 }} />

        {/* Fly to selected aircraft or reset view */}
        <FlyToSelectedMarker selectedAircraft={selectedAircraft} allAircrafts={mapViewData} />

        {/* Aircraft Markers */}
        {mapViewData.map((aircraft) => (
          <React.Fragment key={aircraft.addrModeS}>
            {/* Flight Name */}
            <Marker
              key={`${aircraft.addrModeS}-name`}
              position={[aircraft.latitude, aircraft.longitude]}
              icon={getFlightNameIcon(aircraft.callsign || "Unknown", selectedAircraft?.addrModeS === aircraft.addrModeS)}
              eventHandlers={{
                click: () => onSelectAircraft(aircraft),
              }}
            />
            {/* Aircraft Icon */}
            <Marker
              position={[aircraft.latitude, aircraft.longitude]}
              icon={getIconByState(aircraft.state || "Normal", selectedAircraft?.addrModeS === aircraft.addrModeS)}
              eventHandlers={{
                click: () => onSelectAircraft(aircraft),
              }}
            >
              <Popup>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#2D403F",
                    fontSize: "14px",
                  }}
                >
                  <strong style={{ color: "#E7E43E" }}>{aircraft.callsign || "Unknown"}</strong>
                  <br />
                  Latitude: {aircraft.latitude}
                  <br />
                  Longitude: {aircraft.longitude}
                  <br />
                  Heading: {aircraft.trueHeading || "N/A"}°
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </>
  );
};

export default MapView;
