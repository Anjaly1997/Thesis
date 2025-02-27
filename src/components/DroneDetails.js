import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const DroneDetails = ({ drone }) => {
  if (!drone) {
    return (
      <Box
        sx={{
          background: "rgba(46, 57, 68, 0.6)", // Glass effect
          backdropFilter: "blur(10px)",
          color: "#E7E8EA",
          borderRadius: "12px",
          padding: "16px",
          textAlign: "center",
          fontFamily: "'Chakra Petch', sans-serif",
          marginTop: "16px",
        }}
      >
        Please select a drone to see details.
      </Box>
    );
  }

  return (
    <Card
      sx={{
        background: "rgba(46, 57, 68, 0.6)", // Glass effect
        backdropFilter: "blur(10px)",
        color: "#E7E8EA",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        marginTop: "16px",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#E7E43E", // Highlight color
            fontFamily: "'Chakra Petch', sans-serif",
          }}
        >
          {drone.callsign || "Unknown"}
        </Typography>

        <Box sx={{ marginTop: "8px" }}>
          {/* Display basic fields */}
          <Typography
            variant="body2"
            sx={{
              marginBottom: "6px",
              fontFamily: "'Chakra Petch', sans-serif",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <strong>System State:</strong> {drone.systemState || "Normal"}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            <strong>Position:</strong> {drone.latitude}, {drone.longitude}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            <strong>True Heading:</strong> {drone.trueHeading || "N/A"}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            <strong>Altitude:</strong> {drone.altitudeMSL || "N/A"}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            <strong>Ground Speed:</strong> {drone.groundSpeed || "N/A"} knots
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
            <strong>Air Speed:</strong> {drone.airSpeed || "N/A"} knots
          </Typography>

          <Box sx={{ marginTop: "12px" }}>
            {/* Display additional fields */}
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Command Conformance:</strong> {drone.commandConformance ? "Yes" : "No"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Flight Envelope Protection:</strong>{" "}
              {drone.flightEnvelopeProtection ? "Yes" : "No"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Battery Endurance:</strong> {drone.batteryEndurance || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Geo Fence Status:</strong> {drone.geoFenceStatus || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Obstacles and Traffic Status:</strong>{" "}
              {drone.obstaclesTrafficStatus || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Meteorological Status:</strong> {drone.meteorologicalStatus || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Casualty Risk:</strong> {drone.casualtyRisk || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Data Transfer:</strong> {drone.dataTransfer || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Positional Accuracy:</strong> {drone.positionalAccuracy || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Sensor Health:</strong> {drone.sensorHealth || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Motor Health:</strong> {drone.motorHealth || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <strong>Airspace Constraints:</strong> {drone.airspaceConstraints || "N/A"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DroneDetails;
