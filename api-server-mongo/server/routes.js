'use strict';

const UserRoutes = require('./users/user.routes.js');
const AuthRoutes = require('./auth/auth.routes.js');

module.exports = (server) => {
	return [].concat(UserRoutes(server), AuthRoutes(server));
};
