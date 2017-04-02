/* eslint-disable no-console */
'use strict';

const Hapi = require('hapi');

const Config = require('./server/config');
const Routes = require('./server/routes');
const Plugins = require('./server/modules/plugins');

const server = new Hapi.Server();

server.connection({
	host: Config.host,
	port: Config.port
});

server.register(Plugins, (err) => {
	if (err) {
		console.error(err);
	}

	server.route(Routes(server));

	server.start((err) => {
		if (err) {
			console.error(err);
		}

		// server started
		console.log(`Server runing at: ${server.info.uri}`);
	});

	server.on('request-error', (req, err) => {
		console.error(err);
	});
});

module.exports = server;
