import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { Home, Map, Notifications, AirplanemodeActive } from "@mui/icons-material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff"; // Drone icon

const drawerWidth = 80;

// Styled components for glassmorphism
const GlassSidebar = styled(Box)({
  width: drawerWidth,
  background: "rgba(46, 57, 68, 0.6)", // Glass effect color
  backdropFilter: "blur(10px)",
  borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "12px",
});

const Sidebar = () => {
  const selectedPage = "Home"; // Hardcoded for now; can be dynamic later

  const menuItems = [
    { icon: <Home />, label: "Home" },
    { icon: <AirplanemodeActive />, label: "Aircraft" },
    { icon: <Map />, label: "Map" },
    { icon: <Notifications />, label: "Notifications" },
  ];

  return (
    <GlassSidebar>
      {/* Drone Logo */}
      <Box
        sx={{
          marginBottom: "32px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "8px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <FlightTakeoffIcon sx={{ fontSize: 36, color: "#E6E738" }} /> 
      </Box>

      {/* Menu Items */}
      <List sx={{ width: "100%", padding: 0 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                justifyContent: "center",
                padding: "12px 0",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                },
                ...(selectedPage === item.label && {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "8px",
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: selectedPage === item.label ? "#E7E8EA" : "#A0B3C0",
                  fontSize: selectedPage === item.label ? "30px" : "24px", // Slightly larger
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </GlassSidebar>
  );
};

export default Sidebar;
