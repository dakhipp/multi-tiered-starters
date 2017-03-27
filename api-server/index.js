const server = require('./server/server');
const config = require('./server/config');

module.exports = server.start(config.host, config.port);
