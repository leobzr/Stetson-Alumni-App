const express = require('express');
const router = express.Router();
const Major = require('../models/major_model'); 

/**
 * @swagger
 * /api/majors:
 *   get:
 *     summary: Get all majors
 *     responses:
 *       200:
 *         description: A list of majors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/', async (req, res) => {
    try {
        const majors = await Major.find();
        res.status(200).json(majors);
    } catch (error) {
        console.error("Error retrieving majors:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

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
 *         description: The ID of the major to retrieve
 *     responses:
 *       200:
 *         description: A major object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', async (req, res) => {    
    try {
        const major = await Major.findById(req.params.id);
        if (!major) {
            return res.status(404).json({ message: "Major not found" });
        }
        res.status(200).json(major);
    } catch (error) {
        console.error("Error retrieving major:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Major created successfully
 */
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    try {
        const newMajor = new Major({
            name,
            description
        });

        await newMajor.save();
        res.status(201).json(newMajor);
    } catch (error) {
        console.error("Error creating major:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /api/majors/{id}:
 *   put:
 *     summary: Update a major by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the major to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       200:
 *         description: Major updated successfully
 */
router.put('/:id', async (req, res) => {
    
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    try {
        const updatedMajor = await Major.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedMajor) {
            return res.status(404).json({ message: "Major not found" });
        }

        res.status(200).json(updatedMajor);
    } catch (error) {
        console.error("Error updating major:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /api/majors/{id}:
 *   delete:
 *     summary: Delete a major by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the major to delete
 *     responses:
 *       200:
 *         description: Major deleted successfully
 */
router.delete('/:id', async (req, res) => {
    try {
        const deleteMajor = await Major.findByIdAndDelete(req.params.id);
        if (!deleteMajor) {
            return res.status(404).json({ message: "Major not found" });
        }
        res.status(200).json({ message: "Major deleted successfully" });
    } catch (error) {
        console.error("Error deleting major:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;