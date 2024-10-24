import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Tooltip,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { InputAdornment } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import CloudIcon from '@mui/icons-material/Cloud';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import FenceIcon from '@mui/icons-material/Fence';
import TrafficIcon from '@mui/icons-material/Traffic';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import SensorsIcon from '@mui/icons-material/Sensors';
import BuildIcon from '@mui/icons-material/Build';
import MailIcon from '@mui/icons-material/Mail';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { aircrafts, systemStates } from './aircraftData'; // Importing from aircraftData.js

// Function to generate a random icon index
const getRandomIconIndex = () => Math.floor(Math.random() * 12); // Update to match the number of icons used

const AircraftList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  // Filter and sort aircraft based on system state priority
  const filteredAircrafts = aircrafts
    .filter(aircraft => aircraft.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(aircraft => !riskFilter || aircraft.systemState.state === riskFilter)
    .sort((a, b) => a.systemState.priority - b.systemState.priority); // Highest priority first

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginRight: '16px', flexGrow: 1 }}
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
              <MenuItem key={state.state} value={state.state}>{state.state}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {filteredAircrafts.map((aircraft) => {
          const randomIconIndex = getRandomIconIndex(); // Get a random icon index for each aircraft

          return (
            <Card
              key={aircraft.id}
              sx={{
                marginBottom: '16px',
                backgroundColor: 'background.paper',
                borderLeft: `6px solid ${aircraft.systemState.color}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
            >
              <CardContent sx={{ padding: '16px' }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {aircraft.name}
                  </Typography>
                </Box>

                <Divider sx={{ marginY: '8px' }} />

                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                  System State: {aircraft.systemState.state}
                </Typography>

                <Box display="flex" justifyContent="space-between">
                  {/* Only one icon gets the corresponding color based on the state */}
                  <Tooltip title="Command Conformance">
                    <FlightTakeoffIcon fontSize="small" sx={{ color: randomIconIndex === 0 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Telemetry">
                    <SignalCellularAltIcon fontSize="small" sx={{ color: randomIconIndex === 1 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Battery">
                    <BatteryChargingFullIcon fontSize="small" sx={{ color: randomIconIndex === 2 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Weather">
                    <CloudIcon fontSize="small" sx={{ color: randomIconIndex === 3 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Casualty Risk">
                    <PeopleIcon fontSize="small" sx={{ color: randomIconIndex === 4 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Geo-fence">
                    <FenceIcon fontSize="small" sx={{ color: randomIconIndex === 5 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Obstacles">
                    <TrafficIcon fontSize="small" sx={{ color: randomIconIndex === 6 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Positioning">
                    <GpsFixedIcon fontSize="small" sx={{ color: randomIconIndex === 7 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Motor Health">
                    <BuildIcon fontSize="small" sx={{ color: randomIconIndex === 8 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Sensors">
                    <SensorsIcon fontSize="small" sx={{ color: randomIconIndex === 9 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="UTM Info">
                    <MailIcon fontSize="small" sx={{ color: randomIconIndex === 10 ? aircraft.systemState.color : 'inherit' }} />
                  </Tooltip>
                  <Tooltip title="Airspace Constraints">
                    <AirplanemodeActiveIcon fontSize="small" sx={{ color: randomIconIndex === 11 ? aircraft.systemState.color : 'inherit' }} />
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
