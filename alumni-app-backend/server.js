const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const specs = require('./swagger');


// Import routes
const userRouter = require('./routes/users');
const opportunityRouter = require('./routes/opportunities');
const majorRouter = require('./routes/majors');

// environment variables
dotenv.config();

// create express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:['http://localhost:5173', 'http://157.230.236.229'],  // Allow requests from any origin (for development)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  cretendials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
});

app.use('/api/users', userRouter);
app.use('/api/opportunities', opportunityRouter);
app.use('/api/majors', majorRouter);

// swagget stuff 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
