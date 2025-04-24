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
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.is_approved = approved;
    await user.save();
    
    res.status(200).json({ 
      message: approved ? 'User approved successfully' : 'User rejected' 
    });
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
    
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    
    opportunity.approved = approved;
    opportunity.needs_approval = false;
    
    if (approved) {
      opportunity.approved_by = req.user.id;
      opportunity.approval_date = new Date();
    }
    
    await opportunity.save();
    
    res.status(200).json({ 
      message: approved ? 'Opportunity approved successfully' : 'Opportunity rejected' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};