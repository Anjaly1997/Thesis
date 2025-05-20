import React, { useEffect, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import AircraftList from "./components/AircraftList";
import DroneDetails from "./components/DroneDetails";
import staticData from "./data/aircraftData.json"; // New JSON with lat/lng
import "./App.css";

function App() {
  const [aircraftData, setAircraftData] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [activePanel, setActivePanel] = useState("map"); // for Sidebar control

  useEffect(() => {
    // Enrich static data (if lat/lng missing — but your new file has them!)
    const enriched = staticData.map((item, index) => ({
      addrModeS: item.addrModeS || `UAS-${index + 1}`,
      callsign: item.callsign || `UAS-${index + 1}`,
      state: item.state || "Normal",
      latitude: item.latitude || 52.3,
      longitude: item.longitude || 10.5,
      ...item,
    }));

    setAircraftData(enriched);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelectPanel={setActivePanel} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Aircraft List (always shown) */}
        <div
          style={{
            width: "30%",
            padding: "16px",
            borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <AircraftList
            aircraftData={aircraftData}
            onSelectDrone={setSelectedDrone}
            selectedDrone={selectedDrone}
          />
        </div>

        {/* Dynamic Right Panel */}
        <div
          style={{
            flexGrow: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {activePanel === "map" && (
            <>
              <div style={{ flexGrow: 1, borderRadius: "8px", overflow: "hidden" }}>
                <MapView
                  mapViewData={aircraftData}
                  selectedAircraft={selectedDrone}
                  onSelectAircraft={setSelectedDrone}
                />
              </div>
              <div
                style={{
                  height: "30vh",
                  backgroundColor: "background.paper",
                  padding: "16px",
                  marginTop: "16px",
                }}
              >
                <DroneDetails drone={selectedDrone} />
              </div>
            </>
          )}

          {activePanel === "notifications" && (
            <div style={{ color: "white" }}>📢 No notifications yet.</div>
          )}

          {activePanel === "welcome" && (
            <div style={{ color: "white" }}>👋 Welcome to the HMI dashboard.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
