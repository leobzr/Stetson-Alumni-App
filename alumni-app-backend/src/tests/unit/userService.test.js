import { jest } from '@jest/globals';
import userService from '../../features/users/userService.js';
import { User } from '../../features/users/user.js';

describe('User Service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getUsers', () => {
    it('should return users with pagination', async () => {
      const mockUsers = [{ name: 'John' }];
      // Mock the chain: find().select().skip().limit()
      const selectMock = jest.fn().mockReturnThis();
      const skipMock = jest.fn().mockReturnThis();
      const limitMock = jest.fn().mockResolvedValue(mockUsers);

      jest.spyOn(User, 'find').mockReturnValue({
        select: selectMock,
        skip: skipMock,
        limit: limitMock
      });
      jest.spyOn(User, 'countDocuments').mockResolvedValue(1);

      const result = await userService.getUsers(1, 10);

      expect(User.find).toHaveBeenCalled();
      expect(User.countDocuments).toHaveBeenCalled();
      expect(result).toEqual({
        users: mockUsers,
        total: 1,
        page: 1,
        limit: 10
      });
    });
  });

  describe('getUserByUsername', () => {
    it('should find a user by username', async () => {
      const mockUser = { user_name: 'john' };
      const selectMock = jest.fn().mockResolvedValue(mockUser);

      jest.spyOn(User, 'findOne').mockReturnValue({
        select: selectMock
      });

      const result = await userService.getUserByUsername('john');

      expect(User.findOne).toHaveBeenCalledWith({ user_name: 'john' });
      expect(result).toEqual(mockUser);
    });
  });
});