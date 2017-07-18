'use strict';

const Mongojs = require('mongojs');
const Boom = require('boom');
const JWT   = require('jsonwebtoken');
const Bcrypt = require('bcrypt');

const UserUtils = require('../../utils/userUtils');
const Config = require('../../config');

const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// handlers that do work on the routes
const handlers = {};

// business specific logic for testing
const lib = {};

// registers new user if one does not already esist, password is hashed, and created user is returned
handlers.register = function (request, reply) {
	return new Promise((resolve, reject) => {
		// check if user already exsists
		return lib.getUserByUsername({ username: request.payload.username })
		.then((user) => {
			if (request.payload.password !== request.payload.password_conf) {
				throw Boom.badRequest('Password does not match password confirmation.');
			}
			if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(request.payload.password)) {
				throw Boom.badRequest('Password does not match minimum complexity requirements.');
			}
			if (user) {
				throw Boom.badRequest('User already exists.');
			}
			return lib.hashPassword(request.payload.password);
		})
		.then((password) => {
			const hashedUser = request.payload;
			hashedUser.password = password;
			return lib.createUser(lib.attachScope(hashedUser));
		})
		.then((createdUser) => {
			return reply(lib.attachToken(UserUtils.removeUnwanted(createdUser)));
		})
		.catch((err) => {
			return reply(Boom.wrap(err));
		});
	});
};

// logs a user in given username and password
handlers.login = function (request, reply) {
	return new Promise((resolve, reject) => {
		return lib.getUserByUsername({ username: request.payload.username })
		.then((user) => {
			if (!user) {
				throw Boom.badRequest('Invalid credentials.');
			}
			return lib.comparePassword(request.payload.password, user);
		})
		.then((validatedUser) => {
			return reply(lib.attachToken(UserUtils.removeUnwanted(validatedUser)));
		})
		.catch((err) => {
			return reply(Boom.wrap(err));
		});
	});
};

// attaches default scope of USER to user object
lib.attachScope = function (user) {
	user.scope = 'USER';
	return user;
};

// attaches token to user object
lib.attachToken = function (user) {
	user.token = JWT.sign(user, Config.jwtSecret);
	return user;
};

// saves a user to db
lib.createUser = function (user) {
	return new Promise((resolve, reject) => {
		db.users.save(user, (err, doc) => {
			if (err) {
				return reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			return resolve(doc);
		});
	});
};

// returns hashed version of password
lib.hashPassword = function (password) {
	return new Promise((resolve, reject) => {
		Bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				return reject(err);
			}

			return resolve(hash);
		});
	});
};

// returns user if compare is true/successful or error if false/not successful
lib.comparePassword = function (plainPass, hashedPassUser) {
	return new Promise((resolve, reject) => {
		Bcrypt.compare(plainPass, hashedPassUser.password, (err, res) => {
			if (err) {
				return reject(err);
			}
			if (!res) {
				return reject(Boom.badRequest('Invalid credentials.'));
			}
			return resolve(hashedPassUser);
		});
	});
};

// fetches a user by username
lib.getUserByUsername = function (params) {
	return new Promise((resolve, reject) => {
		db.users.findOne({
			username: params.username,
		}, (err, doc) => {
			if (err) {
				reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			resolve(doc);
		});
	});
};

module.exports = {
	handlers,
	// export lib object for testing business logic
	lib: (process.env.NODE_ENV === 'test') ? lib : null
};
