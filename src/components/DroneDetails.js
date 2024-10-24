import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const DroneDetails = ({ drone }) => {
  if (!drone) {
    return <div>Please select a drone to see details.</div>;
  }

  return (
    <Card sx={{ backgroundColor: 'background.paper', marginTop: '16px', borderRadius: '8px' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {drone.name}
        </Typography>
        <Typography variant="body2">System State: {drone.systemState.state}</Typography>
        <Typography variant="body2">Position: {drone.position.join(', ')}</Typography>
        {/* Add any other details about the drone here */}
      </CardContent>
    </Card>
  );
};

export default DroneDetails;
