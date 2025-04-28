import request from 'supertest';
import app from '../../app.js';
import { setupDB, teardownDB, clearDB } from '../test-setup.js';
import { Opportunity } from '../../features/opportunities/opportunity.js';

beforeAll(setupDB);
afterAll(teardownDB);
afterEach(clearDB);

describe('Opportunity Controller', () => {
  it('should create and fetch opportunities', async () => {
    // Create
    const resCreate = await request(app)
      .post('/api/opportunities')
      .send({ title: 'Test', description: 'desc', type: 'Job', posted_by: 'user' });
    expect(resCreate.status).toBe(201);
    
    // FIX: Set the opportunity to approved so it shows up in the GET request
    await Opportunity.findByIdAndUpdate(resCreate.body._id, { approved: true });

    // Fetch
    const resGet = await request(app).get('/api/opportunities');
    expect(resGet.status).toBe(200);
    expect(resGet.body.opportunities.length).toBeGreaterThan(0);
  });

  it('should update an opportunity', async () => {
    const opp = await Opportunity.create({ title: 'Old', description: 'desc', type: 'Job', posted_by: 'user' });
    const res = await request(app)
      .put(`/api/opportunities/${opp._id}`)
      .send({ title: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated');
  });

  it('should delete an opportunity', async () => {
    const opp = await Opportunity.create({ title: 'Del', description: 'desc', type: 'Job', posted_by: 'user' });
    const res = await request(app).delete(`/api/opportunities/${opp._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});