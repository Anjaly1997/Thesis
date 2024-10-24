export const systemStates = [
    { state: 'Normal', color: 'gray', priority: 4 },
    { state: 'Expected Change', color: 'cyan', priority: 3 },
    { state: 'Caution', color: 'yellow', priority: 2 },
    { state: 'Warning', color: 'red', priority: 1 },
  ];
  
  // Function to randomly assign a system state to each aircraft
  const getRandomSystemState = () => systemStates[Math.floor(Math.random() * systemStates.length)];
  
  export const aircrafts = [
    { id: 1, name: 'UAS-1', position: [51.505, -0.09], systemState: getRandomSystemState() },
    { id: 2, name: 'UAS-2', position: [48.8566, 2.3522], systemState: getRandomSystemState() },
    { id: 3, name: 'UAS-3', position: [40.7128, -74.006], systemState: getRandomSystemState() },
    { id: 4, name: 'UAS-4', position: [35.6762, 139.6503], systemState: getRandomSystemState() },
    { id: 5, name: 'UAS-5', position: [55.7558, 37.6176], systemState: getRandomSystemState() },
  ];
  