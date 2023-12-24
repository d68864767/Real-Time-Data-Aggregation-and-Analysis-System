// test.js

const request = require('supertest');
const app = require('./server');
const jwt = require('jsonwebtoken');
const config = require('./config');

describe('API Endpoints', () => {
  let api;

  beforeAll(() => {
    api = app.listen(3000, () => console.log('Test server running on port 3000'));
  });

  afterAll((done) => {
    console.log('Gracefully stopping test server');
    api.close(done);
  });

  // Test for successful connection
  it('should return a 200 status', async () => {
    const res = await request(api).get('/api');
    expect(res.statusCode).toEqual(200);
  });

  // Test for authentication
  it('should authenticate a user', async () => {
    const user = {
      username: 'testuser',
      password: 'testpassword'
    };

    const token = jwt.sign({ user }, config.auth.jwtSecret, { expiresIn: '1h' });
    const res = await request(api).post('/api/auth').send({ token });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test for data aggregation
  it('should aggregate data', async () => {
    const res = await request(api).get('/api/dataAggregator');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  // Test for data processing
  it('should process data', async () => {
    const res = await request(api).get('/api/dataProcessor');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('processedData');
  });

  // Test for web interface
  it('should return web interface data', async () => {
    const res = await request(api).get('/api/webInterface');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  // Test for optimization
  it('should return optimization data', async () => {
    const res = await request(api).get('/api/optimization');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('optimizationData');
  });

  // Test for database
  it('should return database data', async () => {
    const res = await request(api).get('/api/database');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('databaseData');
  });
});
