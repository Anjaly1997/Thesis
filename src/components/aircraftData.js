export const systemStates = [
  { state: "Normal", color: "gray", priority: 4 },
  { state: "Expected Change", color: "cyan", priority: 3 },
  { state: "Caution", color: "yellow", priority: 2 },
  { state: "Warning", color: "red", priority: 1 },
];

// Function to transform incoming aircraft data
export const transformAircraftData = (data) => {
  return data.map((aircraft) => ({
    addrModeS: aircraft.addrModeS,
    callsign: aircraft.callsign || "Unknown",
    latitude: aircraft.latitude,
    longitude: aircraft.longitude,
    state: aircraft.state || "Normal",
    trueHeading: aircraft.trueHeading || 0,
    altitude: aircraft.altitude || 0,
    groundSpeed: aircraft.groundSpeed || 0,
  }));
};
