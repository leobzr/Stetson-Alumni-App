import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

// Import middleware
import errorHandler from './middleware/errorHandler.js';

// Import configuration
import specs from './config/swagger.js';

// Import routes
import userRoutes from './features/users/userRoutes.js';
import opportunityRoutes from './features/opportunities/opportunityRoutes.js';
import majorRoutes from './features/majors/majorRoutes.js';
import authRoutes from './features/auth/authRoutes.js';
import adminRoutes from './features/admin/adminRoutes.js';
import messageRoutes from './features/messages/messageRoutes.js';

const app = express();

// Middleware
app.use(cors({
<<<<<<< HEAD
  origin: ['http://localhost:5173', 'http://165.227.84.162'],
=======
  origin: [
    'http://localhost:5173', 
    'http://165.227.84.162'  // Your Digital Ocean droplet IP
  ],
>>>>>>> refs/remotes/origin/main
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/majors', majorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// 404 handler - moved after routes are defined
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

export default app;
