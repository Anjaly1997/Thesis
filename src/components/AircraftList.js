import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  TextField,
  Tooltip,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CloudIcon from "@mui/icons-material/Cloud";
import PeopleIcon from "@mui/icons-material/People";
import FenceIcon from "@mui/icons-material/Fence";
import TrafficIcon from "@mui/icons-material/Traffic";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import SensorsIcon from "@mui/icons-material/Sensors";
import BuildIcon from "@mui/icons-material/Build";
import MailIcon from "@mui/icons-material/Mail";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { systemStates } from "./aircraftData";

// Function to generate a random icon index
const getRandomIconIndex = () => Math.floor(Math.random() * 12); 

const AircraftList = ({ aircraftData, onSelectDrone }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  // Filter and sort aircraft data dynamically
  const filteredAircrafts = aircraftData
    .filter((aircraft) =>
      aircraft.callsign?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((aircraft) => !riskFilter || aircraft.state === riskFilter)
    .sort((a, b) => {
      // Sort based on system state priority
      const priorityA =
        systemStates.find((state) => state.state === a.state)?.priority || 99;
      const priorityB =
        systemStates.find((state) => state.state === b.state)?.priority || 99;
      return priorityA - priorityB;
    });

  return (
    <>
      {/* Search and Filter */}
      <Box sx={{ display: "flex", marginBottom: "16px" }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1, marginRight: "16px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Risk</InputLabel>
          <Select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            label="Filter by Risk"
          >
            <MenuItem value="">All</MenuItem>
            {systemStates.map((state) => (
              <MenuItem key={state.state} value={state.state}>
                {state.state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Aircraft Cards */}
      <Box sx={{ maxHeight: "90vh", overflowY: "auto" }}>
        {filteredAircrafts.map((aircraft) => {
          const randomIconIndex = getRandomIconIndex();

          return (
            <Card
              key={aircraft.addrModeS}
              onClick={() => onSelectDrone(aircraft)} // Set selected aircraft on click
              sx={{
                marginBottom: "16px",
                cursor: "pointer",
                borderLeft: `6px solid ${
                  systemStates.find((s) => s.state === aircraft.state)?.color ||
                  "gray"
                }`,
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <CardContent>
                {/* Dynamic Callsign */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {aircraft.callsign || "Unknown"}
                </Typography>

                <Divider sx={{ marginY: "8px" }} />

                {/* System State */}
                <Typography variant="body2" color="text.secondary">
                  System State: {aircraft.state || "Normal"}
                </Typography>

                {/* Icons */}
                <Box display="flex" justifyContent="space-between">
                  <Tooltip title="Command Conformance">
                    <FlightTakeoffIcon
                      fontSize="small"
                      sx={{
                        color: randomIconIndex === 0 ? "red" : "inherit",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Telemetry">
                    <SignalCellularAltIcon
                      fontSize="small"
                      sx={{
                        color: randomIconIndex === 1 ? "red" : "inherit",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Battery">
                    <BatteryChargingFullIcon
                      fontSize="small"
                      sx={{
                        color: randomIconIndex === 2 ? "red" : "inherit",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Weather">
                    <CloudIcon
                      fontSize="small"
                      sx={{
                        color: randomIconIndex === 3 ? "red" : "inherit",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Casualty Risk">
                    <PeopleIcon fontSize="small" />
                  </Tooltip>
                  <Tooltip title="Geo-fence">
                    <FenceIcon fontSize="small" />
                  </Tooltip>
                  <Tooltip title="Obstacles">
                    <TrafficIcon fontSize="small" />
                  </Tooltip>
                  <Tooltip title="Positioning">
                    <GpsFixedIcon fontSize="small" />
                  </Tooltip>
                  <Tooltip title="Motor Health">
                    <BuildIcon fontSize="small" />
                  </Tooltip>
                  <Tooltip title="Sensors">
                    <SensorsIcon fontSize="small" />
                  </Tooltip>
                  <Tooltip title="UTM Info">
                    <MailIcon fontSize="small" />
                  </Tooltip>
                  <Tooltip title="Airspace Constraints">
                    <AirplanemodeActiveIcon fontSize="small" />
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default AircraftList;
