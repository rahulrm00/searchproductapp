import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Header = () => (
  <AppBar position="static" sx={{ mb: 4 }}>
    <Toolbar>
      <StorefrontIcon sx={{ mr: 2 }} />
      <Typography variant="h6" component="div">
        My Product Store
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
