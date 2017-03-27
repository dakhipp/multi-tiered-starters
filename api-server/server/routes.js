const userRoutes = require('./users/user.routes.js');

module.exports = (server) => {
	return [].concat(userRoutes(server));
}
