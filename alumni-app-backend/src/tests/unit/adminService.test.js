import { jest } from '@jest/globals';
import adminService from '../../features/admin/adminService.js';
import { User } from '../../features/users/user.js';
import { Opportunity } from '../../features/opportunities/opportunity.js';

describe('Admin Service', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should get pending users', async () => {
    const mockUsers = [{ user_name: 'pending' }];
    // FIX: Properly mock the chained select method
    jest.spyOn(User, 'find').mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUsers)
    });
    
    const result = await adminService.getPendingUsers();
    expect(result).toEqual(mockUsers);
  });

  it('should approve a user', async () => {
    const mockUser = { _id: 'id', is_approved: true };
    jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue(mockUser);
    const result = await adminService.approveUser('id', true);
    expect(result).toEqual(mockUser);
  });

  it('should reject (delete) a user', async () => {
    const mockUser = { _id: 'id' };
    jest.spyOn(User, 'findByIdAndDelete').mockResolvedValue(mockUser);
    const result = await adminService.approveUser('id', false);
    expect(result).toEqual(mockUser);
  });

  it('should get pending opportunities', async () => {
    const mockOpps = [{ title: 'pending' }];
    jest.spyOn(Opportunity, 'find').mockResolvedValue(mockOpps);
    const result = await adminService.getPendingOpportunities();
    expect(result).toEqual(mockOpps);
  });
});