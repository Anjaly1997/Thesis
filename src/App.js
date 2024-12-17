import React, { useEffect, useState } from "react";
import simnet from "./libs/simnet";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import AircraftList from "./components/AircraftList";
import DroneDetails from "./components/DroneDetails";
import "./App.css";

function App() {
  const [aircraftData, setAircraftData] = useState([]); // JSON data for aircraft
  const [selectedDrone, setSelectedDrone] = useState(null); // Currently selected drone for details

  useEffect(() => {
    simnet.connect({
      url: "ws://127.0.0.1:15674/ws",
      user: "guest",
      pass: "guest",
      exchange: "/topic/",
    });

    simnet.onConnected(() => {
      simnet.subscribe("aircraft", (message) => {
        setAircraftData((prev) => {
          const aircraftMap = prev.reduce((map, aircraft) => {
            map[aircraft.addrModeS] = aircraft;
            return map;
          }, {});

          // Update or add new aircraft while preserving callsign stability
          if (!aircraftMap[message.addrModeS]) {
            aircraftMap[message.addrModeS] = {
              ...message,
              callsign: message.callsign || `FLIGHT_${message.addrModeS}`,
            };
          } else {
            aircraftMap[message.addrModeS] = {
              ...aircraftMap[message.addrModeS],
              ...message,
              callsign: aircraftMap[message.addrModeS].callsign,
            };
          }

          return Object.values(aircraftMap);
        });
      });
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Aircraft List */}
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
          />
        </div>

        {/* Map and Drone Details */}
        <div
          style={{
            flexGrow: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flexGrow: 1,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <MapView mapViewData={aircraftData} />
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
        </div>
      </div>
    </div>
  );
}

export default App;
