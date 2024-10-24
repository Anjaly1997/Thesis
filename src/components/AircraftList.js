import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { aircrafts } from './aircraftData'; // Import aircraft data

const AircraftList = ({ onSelectDrone }) => {
  return (
    <div>
      {aircrafts.map((aircraft) => (
        <Card
          key={aircraft.id}
          onClick={() => onSelectDrone(aircraft)}
          sx={{
            marginBottom: '16px',
            backgroundColor: 'background.paper',
            borderLeft: `6px solid ${aircraft.systemState.color}`, // Color-coded based on risk
            cursor: 'pointer',
          }}
        >
          <CardContent>
            <Typography variant="h6">{aircraft.name}</Typography>
            <Typography variant="body2">System State: {aircraft.systemState.state}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AircraftList;
