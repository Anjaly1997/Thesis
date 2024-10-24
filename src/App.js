import React from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <h1>UAS_HMI</h1>
        <MapView />
      </div>
    </div>
  );
}

export default App;
