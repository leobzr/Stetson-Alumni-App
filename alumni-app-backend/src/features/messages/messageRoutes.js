// src/features/messages/messageRoutes.js
import express from 'express';
import { authenticateToken } from '../../middleware/authMiddleware.js';
import * as messageController from './messageController.js';

const router = express.Router();

// Protect all message routes
router.use(authenticateToken);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message to another user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient_username:
 *                 type: string
 *               content:
 *                 type: string
 */
router.post('/', messageController.sendMessage);

/**
 * @swagger
 * /api/messages/inbox:
 *   get:
 *     summary: Get received messages
 *     security:
 *       - bearerAuth: []
 */
router.get('/inbox', messageController.getInbox);

/**
 * @swagger
 * /api/messages/sent:
 *   get:
 *     summary: Get sent messages
 *     security:
 *       - bearerAuth: []
 */
router.get('/sent', messageController.getSent);

/**
 * @swagger
 * /api/messages/{messageId}/read:
 *   put:
 *     summary: Mark a message as read
 *     security:
 *       - bearerAuth: []
 */
router.put('/:messageId/read', messageController.markAsRead);

/**
 * @swagger
 * /api/messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:messageId', messageController.deleteMessage);

export default router;