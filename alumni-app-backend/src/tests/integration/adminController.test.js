// Mock jsonwebtoken BEFORE importing app or middleware!
process.env.ACCESS_TOKEN_SECRET = 'test_secret'; // Ensure secret is set

jest.mock('jsonwebtoken', () => ({
  verify: (token, secret) => {
    // Accept any token and secret for test purposes
    return { id: 'admin-id', role: 'admin' };
  },
  sign: () => 'fake-token'
}));

import request from 'supertest';
import app from '../../app.js';
import { setupDB, teardownDB, clearDB } from '../test-setup.js';
import { User } from '../../features/users/user.js';
import { Message } from '../../features/messages/message.js';
import { jest } from '@jest/globals';
import adminService from '../../features/admin/adminService.js';
import { Opportunity } from '../../features/opportunities/opportunity.js';
import jwt from 'jsonwebtoken';

beforeAll(setupDB);
afterAll(teardownDB);
afterEach(clearDB);
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Message Controller', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/messages/inbox');
    expect(res.status).toBe(401);
  });

  // you can add more message‐route tests here
});

describe('Admin Service', () => {
  it('should get pending users', async () => {
    const mockUsers = [{ user_name: 'pending' }];
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

describe('Admin Controller', () => {
  it('should get pending users', async () => {
    // Create a test pending user
    await User.create({ 
      user_name: 'pending', 
      is_approved: false, 
      email: 'a@a.com', 
      password: 'pw', 
      first_name: 'a', 
      last_name: 'b', 
      year_graduated: 2020, 
      major: 'CS', 
      company: 'c', 
      title: 't' 
    });
    
    // FIX: Send request with authorization header
    const res = await request(app)
      .get('/api/admin/users/pending')
      .set('Authorization', 'Bearer fake-token');
      
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('Opportunity Controller', () => {
  it('should create and fetch opportunities', async () => {
    // Create
    const resCreate = await request(app)
      .post('/api/opportunities')
      .send({ title: 'Test', description: 'desc', type: 'Job', posted_by: 'user' });
    expect(resCreate.status).toBe(201);
    // Approve the opportunity so it appears in GET
    await Opportunity.findByIdAndUpdate(resCreate.body._id, { approved: true });
    // Fetch
    const resGet = await request(app).get('/api/opportunities');
    expect(resGet.status).toBe(200);
    expect(resGet.body.opportunities.length).toBeGreaterThan(0);
  });

  // ...rest of your tests
});