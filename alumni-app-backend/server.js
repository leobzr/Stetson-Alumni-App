require('dotenv').config();  // Load environment variables once
const app = require('./src/app');
const connectDB = require('./src/config/database');

// Connect to database
connectDB();

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});
