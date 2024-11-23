const connection = require('../config/db');

const User = {
    findByEmail: async (email) => {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [results] = await connection.promise().query(query, [email]);
            return results[0] || null;  // Return the first user or null if not found
        } catch (err) {
            throw new Error('Error fetching user from the database: ' + err.message);
        }
    },

    create: async (email, hashedPassword) => {
        try {
            const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
            const [results] = await connection.promise().query(query, [email, hashedPassword]);
            return results;  // Return the result of the insert operation
        } catch (err) {
            throw new Error('Error creating user in the database: ' + err.message);
        }
    },
};

module.exports = User;
