// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';
import { getToken, removeToken } from './utills/auth';

const Home = () => {
    const navigate = useNavigate();
    const token = getToken();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Welcome to the Home Page
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Your token: {token}
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
