/* eslint-disable no-console */
'use strict';

const Hapi = require('hapi');

const Config = require('./server/config');
const Routes = require('./server/routes');
const Plugins = require('./server/modules/plugins');
const AuthCtrl = require('./server/auth/auth.ctrl');

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
		validateFunc: AuthCtrl.handlers.validate,
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
