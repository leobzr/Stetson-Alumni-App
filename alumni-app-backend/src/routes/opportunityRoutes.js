const express = require('express');
const opportunityController = require('../controllers/opportunityController');
const router = express.Router();

/**
 * @swagger
 * /api/opportunities:
 *   get:
 *     summary: Get all opportunities with pagination
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
 *         description: A list of opportunities
 */
router.get('/', opportunityController.getOpportunities);

/**
 * @swagger
 * /api/opportunities/{id}:
 *   get:
 *     summary: Get an opportunity by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Opportunity details
 *       404:
 *         description: Opportunity not found
 */
router.get('/:id', opportunityController.getOpportunityById);

/**
 * @swagger
 * /api/opportunities:
 *   post:
 *     summary: Create a new opportunity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Opportunity created successfully
 */
router.post('/', opportunityController.createOpportunity);

/**
 * @swagger
 * /api/opportunities/{id}:
 *   put:
 *     summary: Update an opportunity
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: Opportunity updated successfully
 */
router.put('/:id', opportunityController.updateOpportunity);

/**
 * @swagger
 * /api/opportunities/{id}:
 *   delete:
 *     summary: Delete an opportunity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Opportunity deleted successfully
 */
router.delete('/:id', opportunityController.deleteOpportunity);

module.exports = router;