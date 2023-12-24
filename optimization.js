// optimization.js

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const router = express.Router();

// Middleware to compress responses
router.use(compression());

// Middleware to secure HTTP headers
router.use(helmet());

// Middleware for logging HTTP requests
router.use(morgan('tiny'));

// Rate limiter middleware to control the rate of requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
router.use(limiter);

// Speed limiter middleware to control the speed of requests
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100
});
router.use(speedLimiter);

module.exports = router;
