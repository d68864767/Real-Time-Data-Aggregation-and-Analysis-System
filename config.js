// config.js

// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
  },

  // Database configuration
  database: {
    mongodb: {
      url: process.env.MONGODB_URL || 'mongodb://localhost:27017/mydatabase',
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    },
  },

  // API keys for data sources
  apiKeys: {
    twitter: process.env.TWITTER_API_KEY,
    stockMarket: process.env.STOCK_MARKET_API_KEY,
    iotDevice: process.env.IOT_DEVICE_API_KEY,
  },

  // JWT secret for authentication
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'my-secret-key',
  },

  // Performance optimization settings
  optimization: {
    cacheExpiration: process.env.CACHE_EXPIRATION || 60, // in seconds
  },

  // Websocket configuration
  websocket: {
    port: process.env.WEBSOCKET_PORT || 8080,
  },
};
