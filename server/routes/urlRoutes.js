const express = require('express');
const router = express.Router();
const { shortenUrl, deleteUrl, getHistory, generateQRCode } = require('../controllers/urlControllers');
const validateUrl = require('../middleware/validateUrl'); 
const authenticate = require('../middleware/authMiddleware'); 

// Route to shorten URL
router.post('/shorten', validateUrl, authenticate, shortenUrl); 

// Route to get the history of shortened URLs
router.get('/history', authenticate, getHistory);

// Route to delete a URL
router.delete('/delete/:id', authenticate, deleteUrl); 

// Route to handle redirection for shortened URLs (if needed)
router.get('/:shortUrl', authenticate, shortenUrl); 

// Route to generate a QR code for a shortened URL
router.get('/generate-qrcode/:shortUrl', authenticate, generateQRCode);

module.exports = router;
