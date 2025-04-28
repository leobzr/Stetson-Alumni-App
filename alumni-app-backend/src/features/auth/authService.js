import jwt from 'jsonwebtoken';
import { User } from '../users/user.js';

/**
 * Service for authentication-related operations
 */
class AuthService {
  constructor() {
    this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key';
    this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key';
    this.ACCESS_TOKEN_LIFE = '15m';
    this.REFRESH_TOKEN_LIFE = '7d';
  }

  /**
   * Generate an access token
   */
  generateAccessToken(payload) {
    return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, { expiresIn: this.ACCESS_TOKEN_LIFE });
  }

  /**
   * Generate a refresh token
   */
  generateRefreshToken(payload) {
    return jwt.sign(payload, this.REFRESH_TOKEN_SECRET, { expiresIn: this.REFRESH_TOKEN_LIFE });
  }

  /**
   * Register a new user
   */
  async register(userData) {
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email: userData.email }, { user_name: userData.user_name }] 
    });
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = new User({
      ...userData,
      is_approved: false // Users start as unapproved
    });

    return user.save();
  }

  /**
   * Login user
   */
  async login(email, password) {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if user is approved
    if (!user.is_approved) {
      throw new Error('Account pending approval');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create payload
    const payload = {
      id: user._id,
      user_name: user.user_name,
      email: user.email,
      role: user.role || 'user'
    };

    // Generate tokens
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    
    return { accessToken, refreshToken, user };
  }
  
  /**
   * Refresh token
   */
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, this.REFRESH_TOKEN_SECRET);
      
      // Create payload for new token
      const payload = {
        id: decoded.id,
        user_name: decoded.user_name,
        email: decoded.email,
        role: decoded.role
      };

      // Generate new access token
      const accessToken = this.generateAccessToken(payload);
      return { accessToken };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
  
  /**
   * Get current user
   */
  async getCurrentUser(userId) {
    return User.findById(userId).select('-password -refresh_tokens');
  }
}

export default new AuthService();