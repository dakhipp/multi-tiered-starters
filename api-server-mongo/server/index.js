/* eslint-disable no-console */
'use strict';

const Hapi = require('hapi');

const Config = require('./config');
const Routes = require('./routes');
const Plugins = require('./modules/plugins');
const Validate = require('./utils/validation');

const server = new Hapi.Server();

server.connection({
	host: Config.host,
	port: Config.port
});

server.register(Plugins, (err) => {
	if (err) {
		console.error(err);
	}

	server.auth.strategy('jwt', 'jwt', {
		key: Config.jwtSecret,
		validateFunc: Validate.JwtValidate,
		verifyOptions: {
			algorithms: ['HS256'],
		}
	});

	server.auth.default('jwt');

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
