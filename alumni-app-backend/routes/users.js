const express = require('express');
const User = require('../models/user_model');  
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .skip(skip)
            .limit(limit);
        const total = await User.countDocuments();

        // Match the format of your opportunities API
        res.status(200).json({
            total,
            page,
            limit,
            users  // Include the array in a property
        });
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Get a user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information
 *       404:
 *         description: User not found
 */
router.get('/:username', async (req, res) => {
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
});


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               year_graduated:
 *                 type: integer
 *               major:
 *                 type: string
 *               company:
 *                 type: string
 *               title:
 *                 type: string
 *               email:
 *                 type: string
 *               linkedin_link:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/', async (req, res) => {
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
});

/**
 * @swagger
 * /api/users/{username}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/:username', async (req, res) => {
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
});

/**
 * @swagger
 * /api/users/{username}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/:username', async (req, res) => {
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
});

module.exports = router;