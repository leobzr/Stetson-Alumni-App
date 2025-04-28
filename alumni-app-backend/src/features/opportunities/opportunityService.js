import { Opportunity } from './opportunity.js';

/**
 * Service for opportunity-related operations
 */
class OpportunityService {
  /**
   * Get all opportunities with pagination
   */
  async getOpportunities(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const opportunities = await Opportunity.find({ approved: true })
      .skip(skip)
      .limit(limit);
    const total = await Opportunity.countDocuments({ approved: true });
    
    return { opportunities, total, page, limit };
  }

  /**
   * Get an opportunity by ID
   */
  async getOpportunityById(id) {
    return Opportunity.findById(id);
  }

  /**
   * Create a new opportunity
   */
  async createOpportunity(data) {
    const newOpportunity = new Opportunity({
      ...data,
      needs_approval: true,
      approved: false
    });
    return newOpportunity.save();
  }

  /**
   * Update an opportunity
   */
  async updateOpportunity(id, data) {
    return Opportunity.findByIdAndUpdate(
      id,
      { ...data, needs_approval: true, approved: false },
      { new: true }
    );
  }

  /**
   * Delete an opportunity
   */
  async deleteOpportunity(id) {
    return Opportunity.findByIdAndDelete(id);
  }
}

export default new OpportunityService();