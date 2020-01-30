const truncate = require('../utils/truncate');
const factory = require('../factories');
const request = require('supertest');
const app = require('../../src/app');
const faker = require('faker');

describe('Controllers > User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.status).toBe(201);
  });

  it('should not register a user with invalid data', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: '',
        email: 'invalidemail'
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('errors');
  });
});
