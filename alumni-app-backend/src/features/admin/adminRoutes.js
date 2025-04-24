import express from 'express';
import { authenticateToken, adminOnly } from '../../middleware/authMiddleware.js';
import * as adminController from './adminController.js';

const router = express.Router();

// Apply authentication and admin check middleware
router.use(authenticateToken);
router.use(adminOnly);

/**
 * @swagger
 * /api/admin/users/pending:
 *   get:
 *     summary: Get pending user registrations
 *     security:
 *       - bearerAuth: []
 */
router.get('/users/pending', adminController.getPendingUsers);

/**
 * @swagger
 * /api/admin/users/approve:
 *   post:
 *     summary: Approve or reject a user
 *     security:
 *       - bearerAuth: []
 */
router.post('/users/approve', adminController.approveUser);

/**
 * @swagger
 * /api/admin/opportunities/pending:
 *   get:
 *     summary: Get pending opportunities
 *     security:
 *       - bearerAuth: []
 */
router.get('/opportunities/pending', adminController.getPendingOpportunities);

/**
 * @swagger
 * /api/admin/opportunities/approve:
 *   post:
 *     summary: Approve or reject an opportunity
 *     security:
 *       - bearerAuth: []
 */
router.post('/opportunities/approve', adminController.approveOpportunity);

export default router;