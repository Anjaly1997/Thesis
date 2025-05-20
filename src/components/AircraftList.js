import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tooltip,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import {
  Flight,
  BatteryFull,
  Cloud,
  Group,
  GridOn,
  Warning,
  Radar,
  Build,
  Wifi,
  Mail,
  Speed,
} from "@mui/icons-material";
import { systemStates } from "./aircraftData";

// Severity logic
const severityLevels = {
  Warning: 3,
  Caution: 2,
  Expected: 1,
  Nominal: 0,
};

const severityColors = {
  Warning: "#E74C3C",
  Caution: "#F1C40F",
  Expected: "#1ABC9C",
  Nominal: "#95A5A6",
};

const getSeverity = (value) => {
  const val = (value || "").toLowerCase();
  if (
    ["critical", "failed", "emergency", "loss", "crossed terminate boundary", "major hazard"].includes(val)
  ) return "Warning";
  if (
    ["warning", "moderate", "nearby hazard", "crossed warning boundary"].includes(val)
  ) return "Caution";
  if (
    ["rerouting", "guided", "expected change"].includes(val)
  ) return "Expected";
  return "Nominal";
};

const AircraftList = ({ aircraftData, onSelectDrone }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const filteredAircrafts = aircraftData
    .map((aircraft) => {
      const fields = [
        aircraft.commandConformance ? "Normal" : "Critical",
        aircraft.flightEnvelopeProtection ? "Normal" : "Critical",
        aircraft.batteryEndurance,
        aircraft.meteorologicalStatus,
        aircraft.casualtyRisk,
        aircraft.geoFenceStatus,
        aircraft.obstaclesTrafficStatus,
        aircraft.sensorHealth,
        aircraft.motorHealth,
        aircraft.dataTransfer,
        aircraft.airspaceConstraints,
        aircraft.positionalAccuracy,
      ];

      const maxSeverity = fields.reduce((acc, val) => {
        const sev = getSeverity(val);
        return severityLevels[sev] > severityLevels[acc] ? sev : acc;
      }, "Nominal");

      return { ...aircraft, state: maxSeverity }; // Add calculated state
    })
    .filter((aircraft) =>
      aircraft.callsign?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((aircraft) => !riskFilter || aircraft.state === riskFilter)
    .sort((a, b) => {
      const priorityA = severityLevels[a.state] ?? 99;
      const priorityB = severityLevels[b.state] ?? 99;
      return priorityB - priorityA; // Higher risk on top
    });

  return (
    <>
      {/* Search + Filter */}
      <Box sx={{ display: "flex", marginBottom: "16px", gap: "8px" }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "'Chakra Petch', sans-serif",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            minWidth: 180,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "'Chakra Petch', sans-serif",
            },
          }}
        >
          <InputLabel>Filter by Risk</InputLabel>
          <Select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            label="Filter by Risk"
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2D403F",
                  color: "#FFFFFF",
                  fontFamily: "'Chakra Petch', sans-serif",
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {Object.keys(severityLevels).map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Aircraft Cards */}
      <Box
        sx={{
          maxHeight: "90vh",
          overflowY: "auto",
          paddingRight: "12px",
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        {filteredAircrafts.map((aircraft) => {
          const fields = [
            { icon: <Flight />, label: "Command Conformance", value: aircraft.commandConformance ? "Normal" : "Critical" },
            { icon: <SignalCellularAltIcon />, label: "Flight Envelope", value: aircraft.flightEnvelopeProtection ? "Normal" : "Critical" },
            { icon: <BatteryFull />, label: "Battery", value: aircraft.batteryEndurance },
            { icon: <Cloud />, label: "Weather", value: aircraft.meteorologicalStatus },
            { icon: <Group />, label: "Casualty Risk", value: aircraft.casualtyRisk },
            { icon: <GridOn />, label: "Geofence", value: aircraft.geoFenceStatus },
            { icon: <Warning />, label: "Obstacle Traffic", value: aircraft.obstaclesTrafficStatus },
            { icon: <Radar />, label: "Sensor Health", value: aircraft.sensorHealth },
            { icon: <Build />, label: "Motor Health", value: aircraft.motorHealth },
            { icon: <Wifi />, label: "Data Transfer", value: aircraft.dataTransfer },
            { icon: <Mail />, label: "Airspace Constraint", value: aircraft.airspaceConstraints },
            { icon: <Speed />, label: "Positional Accuracy", value: aircraft.positionalAccuracy },
          ];

          let maxSeverity = aircraft.state;
          let maxIndex = -1;

          fields.forEach((field, i) => {
            const sev = getSeverity(field.value);
            if (sev === maxSeverity && maxIndex === -1) {
              maxIndex = i;
            }
          });

          const borderColor = severityColors[maxSeverity];

          return (
            <Card
              key={aircraft.callsign}
              onClick={() => onSelectDrone(aircraft)}
              sx={{
                marginBottom: "14px",
                padding: "0px",
                cursor: "pointer",
                borderLeft: `6px solid ${borderColor}`,
                backgroundColor: "rgba(255, 255, 255, 0.06)", // Slight opacity
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                color: "#FFFFFF",
              }}
            >
              <CardContent sx={{ paddingBottom: "10px !important", paddingTop: "10px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "'Chakra Petch', sans-serif",
                  }}
                >
                  {aircraft.callsign || "Unknown"}
                </Typography>
                <Divider
                  sx={{
                    marginY: "6px",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  System State: {maxSeverity}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ marginTop: "8px", flexWrap: "wrap" }}
                >
                  {fields.map((field, i) => {
                    const sev = getSeverity(field.value);
                    const color =
                      i === maxIndex
                        ? severityColors[sev]
                        : severityColors["Nominal"];

                    return (
                      <Tooltip key={i} title={field.label}>
                        <Box component="span">
                          {React.cloneElement(field.icon, {
                            fontSize: "small",
                            sx: { color },
                          })}
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default AircraftList;
