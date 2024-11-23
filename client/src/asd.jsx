import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import { getToken } from './utills/auth'; // Import your utility to get the token

const URLShortener = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [qrcode, setQrcode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        setErrorMessage(''); // Clear any previous error
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the token from localStorage (or wherever it is stored)
        const token = getToken();

        try {
            // Shorten the URL
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/shorten`, 
                { original_url: url },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }
            );
            setShortUrl(`${import.meta.env.VITE_API_URL2}/${response.data.short_url}`);
        } catch (error) {
            console.error('Error shortening URL:', error);
            setErrorMessage('Failed to shorten URL. Please try again.');
            return;
        }

        try {
            // Generate QR code
            const qrcodeResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/generate-qrcode`,
                {original_url: url }, 
              
                
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }
            );
            setQrcode(qrcodeResponse.data.qrcode);
        } catch (error) {
            console.error('Error generating QR code:', error);
            setErrorMessage('Failed to generate QR code. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                URL Shortener and QR Code Generator
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="url"
                            label="Enter URL"
                            value={url}
                            onChange={handleUrlChange}
                            placeholder="https://example.com"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Shorten URL
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {errorMessage && (
                <Box mt={2}>
                    <Typography variant="body2" color="error">
                        {errorMessage}
                    </Typography>
                </Box>
            )}

            {shortUrl && (
                <Box mt={4}>
                    <Typography variant="h6">Shortened URL:</Typography>
                    <Typography variant="body1">
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                            {shortUrl}
                        </a>
                    </Typography>
                </Box>
            )}

            {qrcode && (
                <Box mt={4} textAlign="center">
                    <Typography variant="h6">QR Code:</Typography>
                    <img src={qrcode} alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
            )}
        </Container>
    );
};

export default URLShortener;
