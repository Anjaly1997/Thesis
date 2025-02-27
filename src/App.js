import React, { useEffect, useState } from "react";
import simnet from "./libs/simnet";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import AircraftList from "./components/AircraftList";
import DroneDetails from "./components/DroneDetails";
import staticData from "./data/aircraftData.json"; // Static JSON file
import "./App.css";

function App() {
  const [aircraftData, setAircraftData] = useState([]);
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
        console.log("addrModeS:", message.addrModeS);

        setAircraftData((prev) => {
          // Merge RabbitMQ data with static data
          const aircraftMap = prev.reduce((map, aircraft) => {
            map[aircraft.addrModeS] = aircraft;
            return map;
          }, {});

          if (!aircraftMap[message.addrModeS]) {
            aircraftMap[message.addrModeS] = {
              ...staticData.find((item) => item.addrModeS === message.addrModeS) || {}, // Default from JSON
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
            selectedDrone={selectedDrone}
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
            <MapView
              mapViewData={aircraftData}
              selectedAircraft={selectedDrone} // Highlight selected aircraft on the map
              onSelectAircraft={setSelectedDrone} // Callback to select aircraft from the map
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
        </div>
      </div>
    </div>
  );
}

export default App;
