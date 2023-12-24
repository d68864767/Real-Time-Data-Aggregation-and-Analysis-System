// dataProcessor.js

const natural = require('natural');
const config = require('./config');
const database = require('./database');

// Function to process Twitter data
function processTwitterData(twitterData) {
  // Use Natural.js for natural language processing
  const tokenizer = new natural.WordTokenizer();
  return twitterData.map(tweet => {
    const tokens = tokenizer.tokenize(tweet.text);
    return {
      ...tweet,
      tokens
    };
  });
}

// Function to process Stock Market data
function processStockMarketData(stockMarketData) {
  // Calculate average stock price
  const averagePrice = stockMarketData.reduce((sum, stock) => sum + stock.price, 0) / stockMarketData.length;
  return {
    averagePrice,
    stocks: stockMarketData
  };
}

// Function to process IoT Device data
function processIoTDeviceData(iotDeviceData) {
  // Calculate average temperature
  const averageTemperature = iotDeviceData.reduce((sum, data) => sum + data.temperature, 0) / iotDeviceData.length;
  return {
    averageTemperature,
    devices: iotDeviceData
  };
}

// Function to process all data
async function processData(aggregatedData) {
  const processedTwitterData = processTwitterData(aggregatedData.twitterData);
  const processedStockMarketData = processStockMarketData(aggregatedData.stockMarketData);
  const processedIoTDeviceData = processIoTDeviceData(aggregatedData.iotDeviceData);

  // Combine all processed data into a single object
  const processedData = {
    twitterData: processedTwitterData,
    stockMarketData: processedStockMarketData,
    iotDeviceData: processedIoTDeviceData
  };

  // Save the processed data to the database
  await database.saveData(processedData);

  return processedData;
}

module.exports = {
  processData
};
