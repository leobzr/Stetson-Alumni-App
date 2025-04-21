import 'dotenv/config';  // Load environment variables once
import app from './src/app.js';
import connectDB from './src/config/database.js';

// Connect to database
connectDB();

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});
