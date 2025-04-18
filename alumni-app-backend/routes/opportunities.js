const express = require('express');
const router = express.Router();
const Opportunity = require('../models/opportunity_model'); 

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
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 5)
 *     responses:
 *       200:
 *         description: A list of opportunities
 */
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const opportunities = await Opportunity.find()
            .skip(skip)
            .limit(limit);
        const total = await Opportunity.countDocuments();

        res.status(200).json({
            total,
            page,
            limit,
            opportunities
        });
    } catch (error) {
        console.error("Error retrieving opportunities:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

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
 *         description: The ID of the opportunity to retrieve
 *     responses:
 *       200:
 *         description: An opportunity object
 */
router.get('/:id', async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }
        res.status(200).json(opportunity);
    } catch (error) {
        console.error("Error retrieving opportunity:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               posted_by:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: ['Internship', 'Job', 'Connection', 'Other']
 *               needs_approval:
 *                 type: boolean
 *                 default: true
 *               approved:
 *                 type: boolean
 *                 default: false
 *               approved_by:
 *                 type: string
 *               is_paid:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Opportunity created successfully
 */
router.post('/', async (req, res) => {
    try {
        const {title, description, posted_by, type, needs_approval, approved, approved_by, is_paid } = req.body;

        const newOpportunity = new Opportunity({
            title,
            description,
            posted_by,
            type,
            needs_approval: needs_approval !== undefined ? needs_approval : true,
            approved: approved !== undefined ? approved : false,
            approved_by: approved_by || "Not Approved", 
            is_paid: is_paid !== undefined ? is_paid : false 
        });

        const savedOpportunity = await newOpportunity.save();
        res.status(201).json(savedOpportunity);
    } catch (error) {   
        console.error("Error creating opportunity:", error);
        return res.status(400).json({
            message: "Error creating opportunity",
            error: error.message
        });
    }
});

/** 
 * @swagger
 * /api/opportunities/{id}:
 *   put:
 *     summary: Update an opportunity by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the opportunity to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               posted_by:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: ['Internship', 'Job', 'Connection', 'Other']
 *               needs_approval:
 *                 type: boolean
 *                 default: true
 *               approved:
 *                 type: boolean
 *                 default: false
 *               approved_by:
 *                 type: string
 *               is_paid:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Opportunity updated successfully
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedOpportunity = await Opportunity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOpportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }

        res.status(200).json(updatedOpportunity);
    } catch (error) {
        console.error("Error updating opportunity:", error);
        return res.status(400).json({
            message: "Error updating opportunity",
            error: error.message
        });
    }
});

/**
 * @swagger
 * /api/opportunities/{id}:
 *   delete:
 *     summary: Delete an opportunity by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the opportunity to delete
 *     responses:
 *       200:
 *         description: Opportunity deleted successfully
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedOpportunity = await Opportunity.findByIdAndDelete(req.params.id);
        if (!deletedOpportunity) {
            return res.status(404).json({ message: "Opportunity not found" });
        }
        res.status(200).json({ message: "Opportunity deleted successfully" });
    } catch (error) {
        console.error("Error deleting opportunity:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;