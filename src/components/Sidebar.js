import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Home, Map, Notifications, AirplanemodeActive } from '@mui/icons-material';

const Sidebar = () => {
  const drawerWidth = 80; // Width of the sidebar

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'primary.main',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ padding: 0, flex: 1 }}>
        {[
          { icon: <Home />, label: 'Home' },
          { icon: <AirplanemodeActive />, label: 'Aircraft' },
          { icon: <Map />, label: 'Map' },
          { icon: <Notifications />, label: 'Notifications' },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ justifyContent: 'center', padding: '10px 0' }}>
              <ListItemIcon sx={{ minWidth: 0, color: 'text.primary', display: 'flex', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
