import opportunityService from './opportunityService.js';

// Get all opportunities with pagination
export const getOpportunities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await opportunityService.getOpportunities(page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get opportunity by ID
export const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await opportunityService.getOpportunityById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new opportunity
export const createOpportunity = async (req, res) => {
  try {
    const savedOpportunity = await opportunityService.createOpportunity(req.body);
    res.status(201).json(savedOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an opportunity
export const updateOpportunity = async (req, res) => {
  try {
    const updatedOpportunity = await opportunityService.updateOpportunity(
      req.params.id,
      req.body
    );
    if (!updatedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(updatedOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an opportunity
export const deleteOpportunity = async (req, res) => {
  try {
    const deletedOpportunity = await opportunityService.deleteOpportunity(req.params.id);
    if (!deletedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

