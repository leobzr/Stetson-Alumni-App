import { User } from '../users/user.js';
import { Opportunity } from '../opportunities/opportunity.js';

// Get pending users
export const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ is_approved: false })
      .select('-password -refresh_tokens');
    
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject user
export const approveUser = async (req, res) => {
  try {
    const { userId, approved } = req.body;
    
    if (approved) {
      // Approve the user
      const user = await User.findByIdAndUpdate(userId, 
        { is_approved: true },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User approved successfully' });
    } else {
      // Delete the rejected user
      const user = await User.findByIdAndDelete(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User rejected and removed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending opportunities
export const getPendingOpportunities = async (req, res) => {
  try {
    const pendingOpportunities = await Opportunity.find({ 
      needs_approval: true,
      approved: false 
    }).populate('posted_by', 'user_name first_name last_name');
    
    res.status(200).json(pendingOpportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject opportunity
export const approveOpportunity = async (req, res) => {
  try {
    const { opportunityId, approved } = req.body;
    
    if (approved) {
      // Approve the opportunity
      const opportunity = await Opportunity.findByIdAndUpdate(opportunityId, {
        approved: true,
        needs_approval: false,
        approved_by: req.user.id,
        approval_date: new Date()
      }, { new: true });
      if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
      res.status(200).json({ message: 'Opportunity approved successfully' });
    } else {
      // Delete the rejected opportunity
      const opportunity = await Opportunity.findByIdAndDelete(opportunityId);
      if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });
      res.status(200).json({ message: 'Opportunity rejected and removed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};