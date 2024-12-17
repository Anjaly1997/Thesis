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

// Helper to get icon colors
const getIconColor = (state) => {
  switch (state) {
    case "Warning":
      return "#E74C3C";
    case "Caution":
      return "#F1C40F";
    case "Expected Change":
      return "#1ABC9C";
    default:
      return "#95A5A6";
  }
};

const AircraftList = ({ aircraftData, onSelectDrone }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

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
      {/* Search and Filter */}
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

      {/* Aircraft Cards with Proper Spacing */}
      <Box
        sx={{
          maxHeight: "90vh",
          overflowY: "auto",
          paddingRight: "12px", // Added spacing from scrollbar
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
                <Divider sx={{ marginY: "8px", borderColor: "rgba(255, 255, 255, 0.2)" }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  System State: {aircraft.state || "Normal"}
                </Typography>

                {/* Icons */}
                <Box display="flex" justifyContent="space-between" sx={{ marginTop: "12px" }}>
                  <FlightTakeoffIcon fontSize="small" sx={{ color: "white" }} />
                  <SignalCellularAltIcon fontSize="small" sx={{ color: "white" }} />
                  <BatteryChargingFullIcon fontSize="small" sx={{ color: "white" }} />
                  <CloudIcon fontSize="small" sx={{ color: "white" }} />
                  <PeopleIcon fontSize="small" sx={{ color: "white" }} />
                  <FenceIcon fontSize="small" sx={{ color: "white" }} />
                  <TrafficIcon fontSize="small" sx={{ color: "white" }} />
                  <GpsFixedIcon fontSize="small" sx={{ color: "white" }} />
                  <SensorsIcon fontSize="small" sx={{ color: "white" }} />
                  <BuildIcon fontSize="small" sx={{ color: "white" }} />
                  <MailIcon fontSize="small" sx={{ color: "white" }} />
                  <AirplanemodeActiveIcon fontSize="small" sx={{ color: "white" }} />
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
