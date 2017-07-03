'use strict';

const UserUtils = require('./userUtils');

// validates a user based on their jwt token on the Authorization header
const JwtValidate = function (decoded, request, callback) {
	UserUtils.getUserById(decoded)
	.then((userFromToken) => {
		if (!userFromToken) {
			return callback(null, false);
		}
		// do a role check, using the retured user's scope
		return callback(null, true, { scope: userFromToken.scope });
	})
	.catch((err) => {
		return reply(Boom.wrap(err));
	});
};

module.exports = {
	JwtValidate
};
