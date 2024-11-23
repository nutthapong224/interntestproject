const connection = require('../config/db'); // Import DB connection

// Handle redirect for shortened URLs
const handleRedirect = (req, res) => {
    const { shortUrl } = req.params;

    // Query to find the original URL
    const query = 'SELECT original_url, clicks FROM urls WHERE short_url = ?';
    connection.query(query, [shortUrl], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Shortened URL not found' });
        }

        const originalUrl = results[0].original_url;
        const updatedClicks = results[0].clicks + 1;

        // Update click count
        const updateQuery = 'UPDATE urls SET clicks = ? WHERE short_url = ?';
        connection.query(updateQuery, [updatedClicks, shortUrl], (updateErr) => {
            if (updateErr) {
                return res.status(500).json({ error: 'Error updating click count' });
            }

            // Redirect to the original URL
            res.redirect(originalUrl);
        });
    });
};

module.exports = {
    handleRedirect,
};
