const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authController = {
    register: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) return res.status(400).json({ error: 'Email is already registered' });

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create(email, hashedPassword);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    
        try {
            const user = await User.findByEmail(email);
            console.log('User fetched from database:', user); // Debug log
    
            if (!user) return res.status(404).json({ error: 'User not found' });
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password valid:', isPasswordValid); // Debug log
    
            if (!isPasswordValid) return res.status(401).json({ error: 'Invalid email or password' });
    
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } catch (err) {
            console.error('Login error:', err); // Debug log
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = authController;
