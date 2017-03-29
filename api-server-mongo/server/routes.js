'use strict';

const UserRoutes = require('./users/user.routes.js');

module.exports = (server) => {
	return [].concat(UserRoutes(server));
};
