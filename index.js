const server = require ('./models/server');

require('dotenv').config();

const server = new Server();

server.listen();