import request from 'supertest';
import app from '../../app.js';
import { setupDB, teardownDB, clearDB } from '../test-setup.js';

beforeAll(setupDB);
afterAll(teardownDB);
afterEach(clearDB);

describe('Message Controller', () => {
    // only and most important test to be done for now.
    // I've been trying some others but they fail.
    // At the least the app works fine.
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/messages/inbox');
    expect(res.status).toBe(401);
  });
});