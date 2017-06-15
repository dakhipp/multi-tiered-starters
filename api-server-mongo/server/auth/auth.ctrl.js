'use strict';

const Mongojs = require('mongojs');
const Boom = require('boom');
const JWT   = require('jsonwebtoken');
const HapiAuthJWT = require('hapi-auth-jwt2');

const Bcrypt = require('bcrypt');

const Config = require('../config');

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
			if (user) {
				return reject(Boom.badRequest('User already exsists.'));
			}

			return lib.hashPassword(request.payload.password);
		})
		.then((password) => {
			const hashedUser = request.payload;
			hashedUser.password = password;

			return lib.createUser(hashedUser);
		})
		.then((createdUser) => {
			return reply(lib.attachToken(lib.cleanUser(createdUser)));
		})
		.catch((err) => {
			return reply(Boom.wrap(new Error(err)));
		});
	});
};

// logs a user in given username and password
handlers.login = function (request, reply) {
	return new Promise((resolve, reject) => {
		return lib.getUserByUsername({ username: request.payload.username })
		.then((user) => {
			if (!user) {
				return reject(Boom.badRequest('User does not exsist.'));
			}
			return lib.comparePassword(request.payload.password, user);
		})
		.then((validatedUser) => {
			return reply(lib.attachToken(lib.cleanUser(validatedUser)));
		})
		.catch((err) => {
			return reply(Boom.wrap(new Error(err)));
		});
	});
};

// scrubs unwanted properties off of user based on whitelist array
lib.cleanUser = function (user) {
	delete user.password;
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
				return reject(Boom.badRequest('Wrong credentials.'));
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
