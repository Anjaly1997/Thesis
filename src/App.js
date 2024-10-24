import React, { useState } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import AircraftList from './components/AircraftList';
import DroneDetails from './components/DroneDetails';
import './App.css';

function App() {
  const [selectedDrone, setSelectedDrone] = useState(null); // Track selected drone

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Aircraft List on the left */}
        <div style={{ width: '30%', padding: '16px', borderRight: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <AircraftList onSelectDrone={setSelectedDrone} />
        </div>

        {/* Right Side Split into Two Parts */}
        <div style={{ flexGrow: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
          {/* Top Portion: Map */}
          <div style={{ flexGrow: 1, marginBottom: '16px', borderRadius: '8px', overflow: 'hidden' }}>
            <MapView />
          </div>

          {/* Bottom Portion: Detailed View */}
          <div style={{ height: '40%', backgroundColor: 'background.paper', borderRadius: '8px', padding: '16px' }}>
            <DroneDetails drone={selectedDrone} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
