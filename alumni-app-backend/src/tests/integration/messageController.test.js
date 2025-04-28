import request from 'supertest';
import app from '../../app.js';
import { setupDB, teardownDB, clearDB } from '../test-setup.js';
import { User } from '../../features/users/user.js';
import { Message } from '../../features/messages/message.js';
import { jest } from '@jest/globals';
import adminService from '../../features/admin/adminService.js';
import { Opportunity } from '../../features/opportunities/opportunity.js';

beforeAll(setupDB);
afterAll(teardownDB);
afterEach(clearDB);

describe('Message Controller', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/messages/inbox');
    expect(res.status).toBe(401);
  });

  // Add more tests with authentication mock if needed
});

describe('Admin Service', () => {
  afterEach(() => jest.restoreAllMocks());

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
    // Create an admin user and a pending user
    await User.create({
      user_name: 'admin',
      email: 'admin@a.com',
      password: 'adminpw',
      first_name: 'Admin',
      last_name: 'User',
      year_graduated: 2020,
      major: 'CS',
      company: 'c',
      title: 't',
      is_approved: true,
      role: 'admin'
    });
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

    // Log in as admin to get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@a.com', password: 'adminpw' });
    const token = loginRes.body.accessToken;

    // Use token in request
    const res = await request(app)
      .get('/api/admin/users/pending')
      .set('Authorization', `Bearer ${token}`);

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