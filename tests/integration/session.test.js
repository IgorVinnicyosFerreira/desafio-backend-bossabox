const truncate = require('../utils/truncate');
const factory = require('../factories');
const request = require('supertest');
const app = require('../../src/app');
const faker = require('faker');

describe('Controllers > Session', () => {
  describe('Data validation', () => {
    it('should report errors when sending invalid data', async () => {
      const response = await request(app)
        .post('/sessions')
        .send({
          email: 'tony',
          password: '123'
        });

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('Authentication middleware', () => {
    beforeAll(async () => {
      await truncate();
      await factory.create('User', { email: 'user@gmail.com', password: '123456' });
    });

    it('should authenticate a user with valid credentials', async () => {
      const response = await request(app)
        .post('/sessions')
        .send({
          email: 'user@gmail.com',
          password: '123456'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should not authenticate a user with email incorrect', async () => {
      const response = await request(app)
        .post('/sessions')
        .send({
          email: 'joao@gmail.com',
          password: '123879'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });

    it('should not authenticated a user with password incorrect', async () => {
      const response = await request(app)
        .post('/sessions')
        .send({
          email: 'user@gmail.com',
          password: '99887637763'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Access to routes', () => {
    let user = {};
    beforeAll(async () => {
      await truncate();
      user = await factory.create('User', { password: '123456' });
    });

    it('should be able to access private routes when authenticated', async () => {
      const response = await request(app)
        .get('/tools')
        .set('Authorization', `Bearer ${user.generateToken()}`);

      expect(response.status).not.toBe(401);
    });

    it('should not be able to access private routes when not authenticated', async () => {
      const response = await request(app).get('/tools');

      expect(response.status).toBe(401);
    });

    it('should not be able to access private routes with invalid jwt token', async () => {
      const response = await request(app)
        .get('/tools')
        .set(
          'Authorization',
          'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        );

      expect(response.status).toBe(401);
    });
  });
});
