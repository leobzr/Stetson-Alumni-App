const express = require('express');
const majorController = require('../controllers/majorController');
const router = express.Router();

/**
 * @swagger
 * /api/majors:
 *   get:
 *     summary: Get all majors
 *     responses:
 *       200:
 *         description: A list of majors
 */
router.get('/', majorController.getAllMajors);

/**
 * @swagger
 * /api/majors/{id}:
 *   get:
 *     summary: Get a major by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Major details
 *       404:
 *         description: Major not found
 */
router.get('/:id', majorController.getMajorById);

/**
 * @swagger
 * /api/majors:
 *   post:
 *     summary: Create a new major
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Major created successfully
 */
router.post('/', majorController.createMajor);

/**
 * @swagger
 * /api/majors/{id}:
 *   put:
 *     summary: Update a major
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
 *         description: Major updated successfully
 */
router.put('/:id', majorController.updateMajor);

/**
 * @swagger
 * /api/majors/{id}:
 *   delete:
 *     summary: Delete a major
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Major deleted successfully
 */
router.delete('/:id', majorController.deleteMajor);

module.exports = router;