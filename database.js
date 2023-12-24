// database.js

const mongoose = require('mongoose');
const redis = require('redis');
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.database.mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define User schema for MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create User model
const User = mongoose.model('User', userSchema);

// Connect to Redis
const redisClient = redis.createClient({
  host: config.database.redis.host,
  port: config.database.redis.port,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Could not connect to Redis:', err);
});

// Function to save data to Redis
const saveDataToRedis = (key, data) => {
  redisClient.set(key, JSON.stringify(data), 'EX', config.optimization.cacheExpiration);
};

// Function to get data from Redis
const getDataFromRedis = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
};

module.exports = {
  User,
  saveDataToRedis,
  getDataFromRedis,
};
