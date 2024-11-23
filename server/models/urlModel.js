// In your urlModel.js file
const connection = require('../config/db');

const Url = {
    createUrl: (originalUrl, shortUrl, userId) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO urls (original_url, short_url, user_id) VALUES (?, ?, ?)';
            connection.query(query, [originalUrl, shortUrl, userId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    deleteUrl: (id, userId) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM urls WHERE id = ? AND user_id = ?';
            connection.query(query, [id, userId], (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows > 0); // Returns true if a row was deleted
            });
        });
    },

    getUrlsByUser: (userId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM urls WHERE user_id = ?';
            connection.query(query, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    getUrlByShortCode: (shortUrl) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM urls WHERE short_url = ?';
            connection.query(query, [shortUrl], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Return the first match (should be unique)
            });
        });
    },

    incrementClickCount: (shortUrl) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE urls SET clicks = clicks + 1 WHERE short_url = ?';
            connection.query(query, [shortUrl], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
};

module.exports = Url;
