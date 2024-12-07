const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5002; // Define the PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample in-memory user store (for demonstration purposes)
const users = [];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Nirmal Balbir Consultancy!'); // Respond with a welcome message
});

// Signup GET route
app.get('/signup', (req, res) => {
    res.send('Signup page'); // You can return an HTML page or a form here
});

// Signup endpoint (POST)
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser  = users.find(user => user.email === email);
    if (existingUser ) {
        return res.status(400).json({ message: 'User  already exists' });
    }

    // Add new user to the "database"
    users.push({ name, email, password });
    res.status(201).json({ message: 'User  created successfully' });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        // Here you would typically generate a token (e.g., JWT) for authentication
        res.json({ token: 'sample_token', message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});