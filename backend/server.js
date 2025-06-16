import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
const MONGODB_URI = 'mongodb://127.0.0.1:27017/bioverse';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// MongoDB Connection with better error handling
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
.then(() => {
  console.log('Connected to MongoDB');
  console.log('MongoDB URI:', MONGODB_URI);
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  console.log('Please make sure MongoDB is installed and running on your system.');
  console.log('You can download MongoDB from: https://www.mongodb.com/try/download/community');
  process.exit(1); // Exit if cannot connect to database
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
}); 