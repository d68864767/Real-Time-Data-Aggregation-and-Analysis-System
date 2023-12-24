const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const dataAggregator = require('./dataAggregator');
const dataProcessor = require('./dataProcessor');
const webInterface = require('./webInterface');
const auth = require('./auth');
const optimization = require('./optimization');
const database = require('./database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', auth);
app.use('/api', dataAggregator);
app.use('/api', dataProcessor);
app.use('/api', webInterface);
app.use('/api', optimization);
app.use('/api', database);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
