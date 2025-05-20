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
import {
  Home,
  Map,
  Notifications,
  AirplanemodeActive,
} from "@mui/icons-material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const drawerWidth = 80;

// Styled Sidebar (Glassmorphism)
const GlassSidebar = styled(Box)({
  width: drawerWidth,
  background: "rgba(46, 57, 68, 0.6)",
  backdropFilter: "blur(10px)",
  borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "12px",
});

const Sidebar = ({ onSelectPanel }) => {
  const menuItems = [
    { icon: <Home />,  label: "Map", panel: "map" },
    { icon: <AirplanemodeActive />, label: "Aircraft", panel: "map" },
    { icon: <Map />,label: "Welcome", panel: "welcome" },
    { icon: <Notifications />, label: "Notifications", panel: "notifications" },
  ];

  return (
    <GlassSidebar>
      {/* Drone Icon */}
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
              onClick={() => onSelectPanel(item.panel)}
              sx={{
                justifyContent: "center",
                padding: "12px 0",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: "#A0B3C0",
                  fontSize: "24px",
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
