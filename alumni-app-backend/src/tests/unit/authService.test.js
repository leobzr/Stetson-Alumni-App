import { jest } from '@jest/globals';
import authService from '../../features/auth/authService.js';
import { User } from '../../features/users/user.js';

describe('Auth Service', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should throw if user does not exist on login', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    await expect(authService.login('a@a.com', 'pw')).rejects.toThrow('Invalid credentials');
  });

  // Add more tests for register, refresh, etc.
});