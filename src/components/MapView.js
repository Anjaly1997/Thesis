import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { aircrafts } from './aircraftData';

// Import icons from assets
import redIcon from '../assets/drone-red.png';
import yellowIcon from '../assets/drone-yellow.png';
import cyanIcon from '../assets/drone-cyan.png';
import grayIcon from '../assets/drone-gray.png';

const getIconByState = (systemState) => {
  switch (systemState.state) {
    case 'Warning':
      return L.icon({ iconUrl: redIcon, iconSize: [32, 32], iconAnchor: [16, 16] });
    case 'Caution':
      return L.icon({ iconUrl: yellowIcon, iconSize: [32, 32], iconAnchor: [16, 16] });
    case 'Expected Change':
      return L.icon({ iconUrl: cyanIcon, iconSize: [32, 32], iconAnchor: [16, 16] });
    case 'Normal':
    default:
      return L.icon({ iconUrl: grayIcon, iconSize: [32, 32], iconAnchor: [16, 16] });
  }
};

const MapView = () => {
  const [mapStyle, setMapStyle] = React.useState('dark-v10');

  return (
    <>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
        <button onClick={() => setMapStyle('dark-v10')}>Dark</button>
        <button onClick={() => setMapStyle('light-v10')}>Light</button>
        <button onClick={() => setMapStyle('satellite-streets-v11')}>Satellite</button>
        <button onClick={() => setMapStyle('streets-v11')}>Streets</button>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '65vh', width: '100%' }} // Increased map height
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5qYWx5LWNsYXVzdGhhbCIsImEiOiJjbTBrbnJ5YmowdzV4MmpxdzF1MGxrNHMxIn0.HKayHQR7X8J95mNMLfIHvg`}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />
        {aircrafts.map((aircraft) => (
          <Marker
            key={aircraft.id}
            position={aircraft.position}
            icon={getIconByState(aircraft.systemState)}
          >
            <Popup>
              {aircraft.name} - {aircraft.systemState.state}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapView;
