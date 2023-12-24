// webInterface.js

const express = require('express');
const router = express.Router();
const database = require('./database');
const socketIo = require('socket.io');

// Initialize Socket.io
const io = socketIo();

// Function to emit real-time data to the client
function emitRealTimeData() {
  setInterval(async () => {
    const data = await database.getData();
    io.emit('realTimeData', data);
  }, 1000);
}

// Route to get historical data
router.get('/data', async (req, res) => {
  try {
    const data = await database.getData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get real-time data
router.get('/realTimeData', (req, res) => {
  try {
    emitRealTimeData();
    res.json({ message: 'Real-time data is being sent to the client.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
