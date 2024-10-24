import React, { useState } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import AircraftList from './components/AircraftList';
import './App.css';

function App() {
  const [selectedDrone, setSelectedDrone] = useState(null); // Track selected aircraft

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

        {/* MapView on the right */}
        <div style={{ flexGrow: 1, padding: '16px' }}>
          <MapView />
        </div>
      </div>
    </div>
  );
}

export default App;
