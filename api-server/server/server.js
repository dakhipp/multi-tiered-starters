const Hapi = require('hapi');

const routes = require('./routes');
const plugins = require('./modules/plugins');

const start = (host, port) => {
	return new Promise((resolve, reject) => {
		const server = new Hapi.Server();
		server.connection({host, port});

		server.register(plugins, (err) => {
			if(err) {
				console.error(err);
				return reject(err);
			}

			server.route(routes(server));

			server.start((err) => {
				if(err) {
					console.error(err);
					return reject(err);
				}

				// server started
				console.log(`Server runing at: ${server.info.uri}`);
				resolve();
			});

			server.on('request-error', (req, err) => {
				console.error(err);
			});
		});
	});
}

module.exports = {
	start
}