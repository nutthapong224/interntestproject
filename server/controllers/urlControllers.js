const Url = require('../models/urlModel');
const shortid = require('shortid');
const QRCode = require('qrcode');

// Shorten URL
const shortenUrl = async (req, res) => {
    const { original_url } = req.body;
    const userId = req.user.id; // Assuming `req.user` is populated by authentication middleware
    if (!original_url) return res.status(400).json({ error: 'Original URL is required' });

    try {
        const shortUrl = shortid.generate();
        await Url.createUrl(original_url, shortUrl, userId);
        res.json({ original_url, short_url: shortUrl });
    } catch (err) {
        console.error('Error saving shortened URL:', err.message); // Log the error for debugging
        res.status(500).json({ error: 'Error saving shortened URL to the database' });
    }
};

// Delete URL
const deleteUrl = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await Url.deleteUrl(id, userId); // Ensure URL belongs to user
        if (!result) return res.status(404).json({ error: 'URL not found or you do not have permission to delete it' });
        res.json({ message: 'URL deleted successfully' });
    } catch (err) {
        console.error('Error deleting URL:', err.message); // Log the error for debugging
        res.status(500).json({ error: 'Error deleting the URL from the database' });
    }
};

// Fetch History
const getHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const urls = await Url.getUrlsByUser(userId);
        res.json(urls);
    } catch (err) {
        console.error('Error fetching history:', err.message); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching history from the database' });
    }
};

// Handle Redirect
const handleRedirect = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const urlData = await Url.getUrlByShortCode(shortUrl);
        if (!urlData) return res.status(404).json({ error: 'Shortened URL not found' });

        await Url.incrementClickCount(shortUrl);
        res.redirect(urlData.original_url);
    } catch (err) {
        console.error('Error handling redirect:', err.message); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Generate QR Code
const generateQRCode = async (req, res) => {
    const { shortUrl } = req.params;
    try {
        const qrCodeData = await QRCode.toDataURL(`${process.env.BASE_URL}/${shortUrl}`); // Generate QR code as data URL
        res.json({ qrcode: qrCodeData });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
}
module.exports = { shortenUrl, deleteUrl, getHistory, handleRedirect, generateQRCode };
