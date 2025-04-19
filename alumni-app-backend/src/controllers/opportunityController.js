const Opportunity = require('../models/opportunity');

// Get all opportunities with pagination
exports.getOpportunities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
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
};

// Get opportunity by ID
exports.getOpportunityById = async (req, res) => {
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
};

// Create a new opportunity
exports.createOpportunity = async (req, res) => {
  try {
    const newOpportunity = new Opportunity(req.body);
    const savedOpportunity = await newOpportunity.save();
    res.status(201).json(savedOpportunity);
  } catch (error) {
    res.status(400).json({
      message: "Error creating opportunity",
        error: error.message
    });
    }
};

// Update an opportunity
exports.updateOpportunity = async (req, res) => {
    try {
        const updatedOpportunity = await Opportunity.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!updatedOpportunity) {
        return res.status(404).json({ message: "Opportunity not found" });
        }
        res.status(200).json(updatedOpportunity);
    } catch (error) {
        console.error("Error updating opportunity:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete an opportunity
exports.deleteOpportunity = async (req, res) => {
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
};

