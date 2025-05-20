import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import redIcon from "../assets/drone-red.png";
import yellowIcon from "../assets/drone-yellow.png";
import cyanIcon from "../assets/drone-cyan.png";
import grayIcon from "../assets/drone-gray.png";

// Severity helpers
const severityLevels = {
  Warning: 3,
  Caution: 2,
  Expected: 1,
  Nominal: 0,
};

const getSeverity = (value) => {
  const v = (value || "").toLowerCase();
  if (
    ["critical", "failed", "emergency", "loss", "crossed terminate boundary", "major hazard"].includes(v)
  )
    return "Warning";
  if (
    ["warning", "moderate", "nearby hazard", "crossed warning boundary"].includes(v)
  )
    return "Caution";
  if (["rerouting", "guided", "expected change"].includes(v)) return "Expected";
  return "Nominal";
};

const computeOverallState = (aircraft) => {
  const fields = [
    aircraft.commandConformance ? "Nominal" : "Critical",
    aircraft.flightEnvelopeProtection ? "Nominal" : "Critical",
    aircraft.batteryEndurance,
    aircraft.geoFenceStatus,
    aircraft.obstaclesTrafficStatus,
    aircraft.meteorologicalStatus,
    aircraft.casualtyRisk,
    aircraft.dataTransfer,
    aircraft.positionalAccuracy,
    aircraft.sensorHealth,
    aircraft.motorHealth,
    aircraft.airspaceConstraints,
  ];

  let max = "Nominal";
  fields.forEach((f) => {
    const sev = getSeverity(f);
    if (severityLevels[sev] > severityLevels[max]) {
      max = sev;
    }
  });
  return max;
};

// Icons by state
const getIconByState = (state, isSelected) => {
  const size = isSelected ? [48, 48] : [32, 32];
  switch (state) {
    case "Warning":
      return L.icon({ iconUrl: redIcon, iconSize: size, iconAnchor: [16, 16] });
    case "Caution":
      return L.icon({ iconUrl: yellowIcon, iconSize: size, iconAnchor: [16, 16] });
    case "Expected":
      return L.icon({ iconUrl: cyanIcon, iconSize: size, iconAnchor: [16, 16] });
    default:
      return L.icon({ iconUrl: grayIcon, iconSize: size, iconAnchor: [16, 16] });
  }
};

const getFlightNameIcon = (name, isSelected) => {
  const color = isSelected ? "#00BFFF" : "#E7E43E";
  return L.divIcon({
    className: "flight-name-icon",
    html: `<div style="text-align: center; font-weight: bold; font-size: 12px; color: ${color};">${name}</div>`,
    iconSize: [0, 0],
    iconAnchor: [16, -8],
  });
};

const FlyToSelectedMarker = ({ selectedAircraft, allAircrafts }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedAircraft) {
      map.flyTo(
        [selectedAircraft.latitude, selectedAircraft.longitude],
        13,
        { duration: 1.5 }
      );
    } else if (allAircrafts.length > 0) {
      const bounds = allAircrafts.map((a) => [a.latitude, a.longitude]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [selectedAircraft, allAircrafts, map]);
  return null;
};

const MapView = ({ mapViewData, selectedAircraft, onSelectAircraft }) => {
  const [mapStyle, setMapStyle] = useState("dark-v10");

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
      {/* Theme Switch Buttons */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
        {["dark-v10", "light-v10", "satellite-streets-v11", "streets-v11"].map(
          (style) => (
            <button
              key={style}
              onClick={() => setMapStyle(style)}
              style={mapStyle === style ? activeButtonStyle : buttonStyle}
            >
              {style.split("-")[0].charAt(0).toUpperCase() +
                style.split("-")[0].slice(1)}
            </button>
          )
        )}
        <button
          onClick={() => onSelectAircraft(null)}
          style={{
            ...buttonStyle,
            backgroundColor: "#FF4500",
            color: "#FFFFFF",
          }}
        >
          Reset View
        </button>
      </div>

      {/* Map Display */}
      <MapContainer
        center={[52.3, 10.5]}
        zoom={11}
        style={{ height: "65vh", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5qYWx5LWNsYXVzdGhhbCIsImEiOiJjbTBrbnJ5YmowdzV4MmpxdzF1MGxrNHMxIn0.HKayHQR7X8J95mNMLfIHvg`}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />

        <Rectangle bounds={boundsOuter} pathOptions={{ color: "yellow", weight: 3, fill: false }} />
        <Rectangle bounds={boundsMiddle} pathOptions={{ color: "red", weight: 2, fill: false }} />
        <Rectangle bounds={boundsInner} pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.4 }} />

        {/* Additional Alert Rectangles */}
        <Rectangle
          bounds={[[52.305, 10.48], [52.315, 10.49]]}
          pathOptions={{ color: "red", weight: 2, fillColor: "red", fillOpacity: 0.4 }}
        />

        <Rectangle
          bounds={[[52.295, 10.52], [52.305, 10.53]]}
          pathOptions={{ color: "yellow", weight: 2, fillColor: "yellow", fillOpacity: 0.3 }}
        />

        <FlyToSelectedMarker selectedAircraft={selectedAircraft} allAircrafts={mapViewData} />

        {mapViewData.map((aircraft) => {
          const severity = computeOverallState(aircraft);
          const isSelected = selectedAircraft?.addrModeS === aircraft.addrModeS;
          return (
            <React.Fragment key={aircraft.addrModeS || aircraft.callsign}>
              <Marker
                position={[aircraft.latitude, aircraft.longitude]}
                icon={getFlightNameIcon(aircraft.callsign || "Unknown", isSelected)}
                eventHandlers={{ click: () => onSelectAircraft(aircraft) }}
              />
              <Marker
                position={[aircraft.latitude, aircraft.longitude]}
                icon={getIconByState(severity, isSelected)}
                eventHandlers={{ click: () => onSelectAircraft(aircraft) }}
              >
                <Popup>
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#2D403F",
                      fontSize: "14px",
                    }}
                  >
                    <strong style={{ color: "#E7E43E" }}>{aircraft.callsign}</strong>
                    <br />
                    Latitude: {aircraft.latitude}
                    <br />
                    Longitude: {aircraft.longitude}
                    <br />
                    Heading: {aircraft.trueHeading || "N/A"}&deg;
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </>
  );
};

export default MapView;
