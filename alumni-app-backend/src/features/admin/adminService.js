import { User } from '../users/user.js';
import { Opportunity } from '../opportunities/opportunity.js';

/**
 * Service for admin-related operations
 */
class AdminService {
  /**
   * Get pending users
   */
  async getPendingUsers() {
    return User.find({ is_approved: false })
      .select('-password -refresh_tokens');
  }

  /**
   * Approve or reject user
   */
  async approveUser(userId, approved) {
    if (approved) {
      return User.findByIdAndUpdate(
        userId, 
        { is_approved: true },
        { new: true }
      );
    } else {
      return User.findByIdAndDelete(userId);
    }
  }

  /**
   * Get pending opportunities
   */
  async getPendingOpportunities() {
    return Opportunity.find({ 
      needs_approval: true,
      approved: false 
    });
  }

  /**
   * Approve or reject opportunity
   */
  async approveOpportunity(opportunityId, approved, adminId) {
    if (approved) {
      return Opportunity.findByIdAndUpdate(
        opportunityId,
        {
          approved: true,
          needs_approval: false,
          approved_by: adminId,
          approval_date: new Date()
        },
        { new: true }
      );
    } else {
      return Opportunity.findByIdAndDelete(opportunityId);
    }
  }
}

export default new AdminService();