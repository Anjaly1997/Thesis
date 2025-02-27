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
import Tooltip from "@mui/material/Tooltip";
import { systemStates } from "./aircraftData";

// Helper function to get colors for system states
const getIconColor = (state) => {
  switch (state) {
    case "Warning":
      return "#E74C3C"; // Red for high risk
    case "Caution":
      return "#F1C40F"; // Yellow for medium risk
    case "Expected Change":
      return "#1ABC9C"; // Cyan for expected state change
    default:
      return "#95A5A6"; // Gray for normal state
  }
};

const AircraftList = ({ aircraftData, onSelectDrone }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search filter
  const [riskFilter, setRiskFilter] = useState(""); // State for risk-based filtering

  // Filter and sort aircrafts based on search and risk priority
  const filteredAircrafts = aircraftData
    .filter((aircraft) =>
      aircraft.callsign?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((aircraft) => !riskFilter || aircraft.state === riskFilter)
    .sort((a, b) => {
      const priorityA =
        systemStates.find((state) => state.state === a.state)?.priority || 99;
      const priorityB =
        systemStates.find((state) => state.state === b.state)?.priority || 99;
      return priorityA - priorityB;
    });

  return (
    <>
      {/* Search and Filter Section */}
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
            {systemStates.map((state) => (
              <MenuItem key={state.state} value={state.state}>
                {state.state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Aircraft List */}
      <Box
        sx={{
          maxHeight: "90vh",
          overflowY: "auto",
          paddingRight: "12px", // Padding for scrollbar
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
          const iconColor = getIconColor(aircraft.state);

          return (
            <Card
              key={aircraft.addrModeS}
              onClick={() => onSelectDrone(aircraft)}
              sx={{
                marginBottom: "16px",
                cursor: "pointer",
                borderLeft: `6px solid ${iconColor}`,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                color: "#FFFFFF",
              }}
            >
              <CardContent>
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
                    marginY: "8px",
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
                  System State: {aircraft.state || "Normal"}
                </Typography>

                {/* Aircraft Icons */}
                <Box display="flex" justifyContent="space-between" sx={{ marginTop: "12px" }}>
  <Tooltip title="Command Conformance">
    <FlightTakeoffIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Flight Envelope Protection">
    <SignalCellularAltIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Battery Endurance">
    <BatteryChargingFullIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Meteorological Conditions">
    <CloudIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Casualty Risk">
    <PeopleIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Geo-fence Constraints">
    <FenceIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Obstacles and Traffic">
    <TrafficIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Positional Accuracy">
    <GpsFixedIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Sensor Health">
    <SensorsIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Motor Health">
    <BuildIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Data Transfer">
    <MailIcon fontSize="small" sx={{ color: "white" }} />
  </Tooltip>
  <Tooltip title="Airspace Conformance">
    <AirplanemodeActiveIcon fontSize="small" sx={{ color: "white" }} />
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
