import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import icons
import redIcon from "../assets/drone-red.png";
import yellowIcon from "../assets/drone-yellow.png";
import cyanIcon from "../assets/drone-cyan.png";
import grayIcon from "../assets/drone-gray.png";

// Helper function for icons
const getIconByState = (state) => {
  switch (state) {
    case "Warning":
      return L.icon({ iconUrl: redIcon, iconSize: [32, 32], iconAnchor: [16, 16] });
    case "Caution":
      return L.icon({ iconUrl: yellowIcon, iconSize: [32, 32], iconAnchor: [16, 16] });
    case "Expected Change":
      return L.icon({ iconUrl: cyanIcon, iconSize: [32, 32], iconAnchor: [16, 16] });
    case "Normal":
    default:
      return L.icon({ iconUrl: grayIcon, iconSize: [32, 32], iconAnchor: [16, 16] });
  }
};

// Fit bounds dynamically
const FitBounds = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = positions.map((pos) => [pos.latitude, pos.longitude]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);

  return null;
};

const MapView = ({ mapViewData }) => {
  const [mapStyle, setMapStyle] = React.useState("dark-v10");

  return (
    <>
      <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
        <button onClick={() => setMapStyle("dark-v10")}>Dark</button>
        <button onClick={() => setMapStyle("light-v10")}>Light</button>
        <button onClick={() => setMapStyle("satellite-streets-v11")}>Satellite</button>
        <button onClick={() => setMapStyle("streets-v11")}>Streets</button>
      </div>

      <MapContainer center={[52.286867, 10.538144]} zoom={6} style={{ height: "65vh", width: "100%" }}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5qYWx5LWNsYXVzdGhhbCIsImEiOiJjbTBrbnJ5YmowdzV4MmpxdzF1MGxrNHMxIn0.HKayHQR7X8J95mNMLfIHvg`}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />

        {/* Adjust zoom dynamically */}
        <FitBounds positions={mapViewData} />

        {/* Aircraft Markers */}
        {mapViewData.map((aircraft) => (
          <Marker
            key={aircraft.addrModeS}
            position={[aircraft.latitude, aircraft.longitude]}
            icon={getIconByState(aircraft.state || "Normal")}
          >
            <Popup>
              <strong>{aircraft.callsign || "Unknown"}</strong>
              <br />
              Latitude: {aircraft.latitude}
              <br />
              Longitude: {aircraft.longitude}
              <br />
              Heading: {aircraft.trueHeading || "N/A"}°
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapView;
