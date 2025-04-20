const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Secret keys and token lifetimes
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key';
const ACCESS_TOKEN_LIFE = '15m'; // 15 minutes
const REFRESH_TOKEN_LIFE = '7d'; // 7 days

// Helper functions to generate tokens
const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE });
};

// Register a new user
exports.register = async (req, res) => {
  try {
    const { user_name, email, password, first_name, last_name, year_graduated, major, company, title } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { user_name }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      user_name,
      email,
      password,
      first_name,
      last_name,
      year_graduated,
      major,
      company,
      title,
      is_approved: false // Users start as unapproved
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully. Awaiting approval.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is approved
    if (!user.is_approved) {
      return res.status(403).json({ message: 'Account pending approval' });
    }

    // Verify password - assumes you have a comparePassword method on user model
    // If not using bcrypt yet, do a direct comparison for now
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create payload
    const payload = {
      id: user._id,
      user_name: user.user_name,
      email: user.email,
      role: user.role || 'user'
    };

    // Generate tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Set refresh token as cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh access token
exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }

    // Verify refresh token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // Create new payload
      const payload = {
        id: decoded.id,
        user_name: decoded.user_name,
        email: decoded.email,
        role: decoded.role
      };

      // Generate new access token
      const newAccessToken = generateAccessToken(payload);
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


