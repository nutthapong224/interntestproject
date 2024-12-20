import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shorturl from "./Shorturl";
import History from "./History";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from './Login'
import Home from './Home' 
import Navbar from "./Navbar";
// Create a Material-UI theme with the Kanit font
const theme = createTheme({
  typography: {
    fontFamily: "Kanit, sans-serif",
  },
});
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="container"> 
        <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
          

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/shorturl"
              element={
                <ProtectedRoute>
                  <Shorturl />
                </ProtectedRoute>
              }
            />

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
