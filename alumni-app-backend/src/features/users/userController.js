import { User } from './user.js';

// Get all users with pagination
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit);
    const total = await User.countDocuments();

    res.status(200).json({
      total,
      page,
      limit,
      users
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user by username
export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ user_name: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: error.message
    });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_name: req.params.username },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({
      message: "Error updating user",
      error: error.message
    });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ user_name: req.params.username });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password -refresh_tokens');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};