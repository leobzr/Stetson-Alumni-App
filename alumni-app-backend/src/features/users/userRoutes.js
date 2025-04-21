import express from 'express';
import * as userController from './userController.js';
import { authenticateToken } from '../../middleware/authMiddleware.js';

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
router.get('/', userController.getUsers);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
router.get('/profile', authenticateToken, userController.getProfile);

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
router.get('/:username', userController.getUserByUsername);

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
router.post('/', userController.createUser);

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
router.put('/:username', userController.updateUser);

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
router.delete('/:username', userController.deleteUser);

export default router;