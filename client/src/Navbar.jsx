// src/components/Navbar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/history">
            History
          </Button>
          <Button color="inherit" component={Link} to="/shorturl">
            Short URL
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
