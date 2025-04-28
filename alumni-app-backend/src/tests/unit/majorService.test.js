import { jest } from '@jest/globals';
import majorService from '../../features/majors/majorService.js';
import { Major } from '../../features/majors/major.js';

describe('Major Service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAllMajors', () => {
    it('should return all majors', async () => {
      const mockMajors = [
        { _id: '1', name: 'Computer Science' },
        { _id: '2', name: 'Business' }
      ];
      jest.spyOn(Major, 'find').mockResolvedValue(mockMajors);

      const result = await majorService.getAllMajors();

      expect(Major.find).toHaveBeenCalled();
      expect(result).toEqual(mockMajors);
    });
  });

  describe('getMajorById', () => {
    it('should return a major by id', async () => {
      const mockMajor = { _id: '1', name: 'Computer Science' };
      jest.spyOn(Major, 'findById').mockResolvedValue(mockMajor);

      const result = await majorService.getMajorById('1');

      expect(Major.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockMajor);
    });

    it('should return null if major not found', async () => {
      jest.spyOn(Major, 'findById').mockResolvedValue(null);

      const result = await majorService.getMajorById('nonexistent');

      expect(result).toBeNull();
    });
  });
});