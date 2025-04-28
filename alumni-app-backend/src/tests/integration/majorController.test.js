import request from 'supertest';
import app from '../../app.js';
import { setupDB, teardownDB, clearDB } from '../test-setup.js';
import { Major } from '../../features/majors/major.js';

// Setup and teardown
beforeAll(async () => await setupDB());
afterAll(async () => await teardownDB());
afterEach(async () => await clearDB());

describe('Major Controller', () => {
  describe('GET /api/majors', () => {
    it('should return all majors', async () => {
      // Create test data
      await Major.create([
        { name: 'Computer Science', description: 'CS courses' },
        { name: 'Business', description: 'Business courses' }
      ]);
      
      // Execute
      const response = await request(app).get('/api/majors');
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('name', 'Computer Science');
    });
  });

  describe('POST /api/majors', () => {
    it('should create a new major', async () => {
      const majorData = { name: 'Physics', description: 'Physics courses' };
      
      // Execute
      const response = await request(app)
        .post('/api/majors')
        .send(majorData);
      
      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'Physics');
      
      // Verify it was saved to database
      const savedMajor = await Major.findById(response.body._id);
      expect(savedMajor).not.toBeNull();
    });
  });
});