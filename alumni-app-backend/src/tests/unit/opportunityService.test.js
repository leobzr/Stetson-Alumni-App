import { jest } from '@jest/globals';
import opportunityService from '../../features/opportunities/opportunityService.js';
import { Opportunity } from '../../features/opportunities/opportunity.js';

describe('Opportunity Service', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should get opportunities with pagination', async () => {
    const mockOpportunities = [{ title: 'Test' }];
    jest.spyOn(Opportunity, 'find').mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockOpportunities),
    });
    jest.spyOn(Opportunity, 'countDocuments').mockResolvedValue(1);

    const result = await opportunityService.getOpportunities(1, 10);
    expect(Opportunity.find).toHaveBeenCalled();
    expect(Opportunity.countDocuments).toHaveBeenCalled();
    expect(result.opportunities).toEqual(mockOpportunities);
  });

  it('should create a new opportunity', async () => {
    const mockData = { title: 'New', description: 'desc', type: 'Job', posted_by: 'user' };
    const mockSave = jest.fn().mockResolvedValue({ ...mockData, _id: 'id' });
    jest.spyOn(Opportunity.prototype, 'save').mockImplementation(mockSave);

    const result = await opportunityService.createOpportunity(mockData);
    expect(result.title).toBe('New');
  });
});