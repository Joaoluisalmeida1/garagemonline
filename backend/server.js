const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const userRoutes = require('./routes/user.routes');
const listingsRoutes = require('./routes/listings.routes');
const path = require('path');
const fs = require('fs');

const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));

app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Mock database
const users = [
  {
    id: '1',
    firstName: 'João',
    lastName: 'Silva',
    email: 'test@example.com',
    password: 'test123', // In a real app, this would be hashed
    createdAt: '2024-03-01T00:00:00.000Z'
  }
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
};

// Auth routes
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;

  try {
    // Find user
    const user = users.find(u => u.email === email);
    console.log('Found user:', user ? 'yes' : 'no');

    if (!user || user.password !== password) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful');
    
    // Send response
    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: String(users.length + 1),
    firstName,
    lastName,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    }
  });
});

app.get('/api/auth/validate', authenticateToken, (req, res) => {
  try {
    console.log('Validating token for user:', req.user);
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      console.log('User not found during validation');
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    console.log('User validated successfully');
    res.json({
      valid: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// User routes
app.get('/api/users/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt
    }
  });
});

app.put('/api/users/profile', authenticateToken, (req, res) => {
  const { firstName, lastName, email } = req.body;
  const userIndex = users.findIndex(u => u.id === req.user.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  users[userIndex] = {
    ...users[userIndex],
    firstName: firstName || users[userIndex].firstName,
    lastName: lastName || users[userIndex].lastName,
    email: email || users[userIndex].email,
  };

  res.json({
    user: {
      id: users[userIndex].id,
      firstName: users[userIndex].firstName,
      lastName: users[userIndex].lastName,
      email: users[userIndex].email
    }
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test endpoints to verify routing
app.get('/api/users/:id/stats', (req, res) => {
  // Temporary test response
  res.json({
    activeListings: 0,
    totalViews: 0
  });
});

app.get('/api/listings/user/:id', (req, res) => {
  // Temporary test response
  res.json([]);
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`User stats endpoint: http://localhost:${PORT}/api/users/:id/stats`);
  console.log(`User listings endpoint: http://localhost:${PORT}/api/listings/user/:id`);
  console.log('Test user credentials:');
  console.log('Email: test@example.com');
  console.log('Password: test123');
  console.log('Available routes:');
  console.log('POST /api/listings - Create listing');
  console.log('GET /api/listings - Get all listings');
  console.log('GET /api/listings/:id - Get listing by ID');
  console.log('GET /api/listings/user/:id - Get user listings');
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
}); 