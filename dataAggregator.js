// dataAggregator.js

const express = require('express');
const axios = require('axios');
const config = require('./config');

const router = express.Router();

// Function to fetch data from Twitter API
async function fetchTwitterData() {
  try {
    const response = await axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {
      headers: {
        'Authorization': `Bearer ${config.apiKeys.twitter}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Twitter data:', error);
    return null;
  }
}

// Function to fetch data from Stock Market API
async function fetchStockMarketData() {
  try {
    const response = await axios.get('https://api.stockmarket.com/v1/quotes', {
      headers: {
        'Authorization': `Bearer ${config.apiKeys.stockMarket}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Stock Market data:', error);
    return null;
  }
}

// Function to fetch data from IoT Device API
async function fetchIoTDeviceData() {
  try {
    const response = await axios.get('https://api.iotdevice.com/v1/data', {
      headers: {
        'Authorization': `Bearer ${config.apiKeys.iotDevice}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching IoT Device data:', error);
    return null;
  }
}

// Endpoint to trigger data aggregation
router.get('/aggregate', async (req, res) => {
  const twitterData = await fetchTwitterData();
  const stockMarketData = await fetchStockMarketData();
  const iotDeviceData = await fetchIoTDeviceData();

  // Combine all data into a single object
  const aggregatedData = {
    twitterData,
    stockMarketData,
    iotDeviceData
  };

  // Send the aggregated data to the client
  res.json(aggregatedData);
});

module.exports = router;
