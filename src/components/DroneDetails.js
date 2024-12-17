import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DroneDetails = ({ drone }) => {
  if (!drone) {
    return <div>Please select a drone to see details.</div>;
  }

  return (
    <Card sx={{ backgroundColor: "background.paper", marginTop: "16px", borderRadius: "8px" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {drone.callsign || "Unknown"}
        </Typography>
        <Typography variant="body2">System State: {drone.state || "Normal"}</Typography>
        <Typography variant="body2">
          Position: {drone.latitude}, {drone.longitude}
        </Typography>
        <Typography variant="body2">True Heading: {drone.trueHeading}</Typography>
        <Typography variant="body2">Altitude: {drone.altitude}</Typography>
        <Typography variant="body2">Ground Speed: {drone.groundSpeed}</Typography>
      </CardContent>
    </Card>
  );
};

export default DroneDetails;
