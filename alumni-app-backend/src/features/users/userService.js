import { User } from './user.js';

/**
 * Service for user-related operations
 */
class UserService {
  /**
   * Get all users with pagination
   */
  async getUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const users = await User.find()
      .select('-password -refresh_tokens')
      .skip(skip)
      .limit(limit);
    const total = await User.countDocuments();
    
    return { users, total, page, limit };
  }

  /**
   * Get a user by their username
   */
  async getUserByUsername(username) {
    return User.findOne({ user_name: username })
      .select('-password -refresh_tokens');
  }

  /**
   * Get a user by ID
   */
  async getUserById(userId) {
    return User.findById(userId)
      .select('-password -refresh_tokens');
  }

  /**
   * Create a new user
   */
  async createUser(userData) {
    const newUser = new User(userData);
    return newUser.save();
  }

  /**
   * Update a user
   */
  async updateUser(username, userData) {
    return User.findOneAndUpdate(
      { user_name: username },
      userData,
      { new: true, runValidators: true }
    ).select('-password -refresh_tokens');
  }

  /**
   * Delete a user
   */
  async deleteUser(username) {
    return User.findOneAndDelete({ user_name: username });
  }
  
  /**
   * Get current user profile
   */
  async getProfile(userId) {
    return this.getUserById(userId);
  }
}

export default new UserService();