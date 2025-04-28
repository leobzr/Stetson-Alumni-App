import { User } from '../users/user.js';
import { Opportunity } from '../opportunities/opportunity.js';
import adminService from './adminService.js';

// Get pending users
export const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await adminService.getPendingUsers();
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject user
export const approveUser = async (req, res) => {
  try {
    const { userId, approved } = req.body;
    
    const user = await adminService.approveUser(userId, approved);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const message = approved ? 'User approved successfully' : 'User rejected and removed';
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending opportunities
export const getPendingOpportunities = async (req, res) => {
  try {
    const pendingOpportunities = await adminService.getPendingOpportunities();
    res.status(200).json(pendingOpportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject opportunity
export const approveOpportunity = async (req, res) => {
  try {
    const { opportunityId, approved } = req.body;
    
    const opportunity = await adminService.approveOpportunity(
      opportunityId, 
      approved, 
      req.user.id
    );
    
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    
    const message = approved ? 'Opportunity approved successfully' : 'Opportunity rejected and removed';
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};