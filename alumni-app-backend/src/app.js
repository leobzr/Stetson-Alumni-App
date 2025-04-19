const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const specs = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const userRoutes = require('./routes/userRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const majorRoutes = require('./routes/majorRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://157.230.236.229'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/majors', majorRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// 404 handler - moved after routes are defined
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;