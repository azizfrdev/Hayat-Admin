import React, { useState } from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "./providers/dataProvider";
import authProvider from "./providers/authProvider";
import CustomLogin from "./components/log/CustomLogin";
import { AdminList } from "./components/pages/AdminsResource";
import AdminCreate from "./components/pages/AdminsResource";
import CustomLayout from "./components/buttons/CustomLayout";
import DoctorList from "./components/pages/doctor";
import DoctorShow from "./components/buttons/read/DoctorShow";
import DoctorCreate from "./components/buttons/create/DoctorCreate";
import DoctorDelete from "./components/buttons/delete/DoctorDelete";
import DoctorEdit from "./components/buttons/edit/DoctorEdit";
import { themes } from './themes/themes';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens'; 

export const App = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0].light); 
  const [anchorEl, setAnchorEl] = useState(null); 
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null); 
  };

  const handleThemeChange = (themeName) => {
    const selectedTheme = themes.find(theme => theme.name === themeName);
    if (selectedTheme) {
      setCurrentTheme(selectedTheme.light);
    }
    setAnchorEl(null); 
  };

  return (
    <div>
      <Tooltip title="Select Theme" enterDelay={300}>
        <IconButton
          onClick={handleMenuClick}
          color="inherit"
          aria-label="Select Theme"
          sx={{
            zIndex: 999,
            position: 'absolute',
            right: '85px', 
            top: '5px', 
          }}
        >
          <ColorLensIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ zIndex: 999 }}
      >
        {themes.map((theme) => (
          <MenuItem
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)} 
            selected={theme.name === currentTheme.name}
          >
            {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)} Theme
          </MenuItem>
        ))}
      </Menu>

      <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        disableTelemetry={true}
        loginPage={CustomLogin}
        layout={CustomLayout}
        theme={currentTheme} 
      >
        <Resource 
          name="admins" 
          list={AdminList} 
          create={AdminCreate} 
          options="admins" 
        />
        <Resource
          name="doctors"
          list={DoctorList}
          create={DoctorCreate}
          show={DoctorShow}
          delete={DoctorDelete}
          edit={DoctorEdit}
          options="doctors"
        />
      </Admin>
    </div>
  );
};
