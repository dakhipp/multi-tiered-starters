'use strict';

const Boom = require('boom');

const UserUtils = require('../../utils/userUtils');
const Config = require('../../config');

const UserModel = require('./user.mod').sql;

// handlers that do work on the routes
const handlers = {};

// business specific logic for testing
const lib = {};

handlers.get = function (request, reply) {
	request.params = request.params || {};
	if (request.params.id) {
		return UserUtils.getUserById(request.params)
		.then((user) => {
			return reply(lib.removeUnwanted(user));
		})
		.catch((err) => {
			return reply(err);
		});
	}
	return reply(lib.getUsers(request.query));
};

handlers.post = function (request, reply) {
	request.params = request.params || {};
	if (request.auth.credentials.id === request.params.id) {
		return reply(lib.postUser(request.params, request.payload));
	}
	return reply(Boom.badRequest());
};

lib.getUsers = function (query) {
	return new Promise((resolve, reject) => {
		const limit = Config.usersPerPage;
		let page = 0;
		let sort = 'name';

		if (typeof query !== 'undefined') {
			page = query.page;
			sort = query.sort;
		}

		const sortObj = {};
		sortObj[sort] = 1;

		return UserModel.findAll({
			offset: page,
			limit,
			order: [
				[sort, 'DESC'],
			],
		})
		.then((results) => {
			return resolve(results.map((user) => lib.removeUnwanted(user)));
		})
		.catch((err) => {
			return reject(Boom.wrap(err, 'Internal db error'));
		});
	});
};

// removes unwanted properties from user object, used before sending any users from db to client
// * remove right before sending to client
lib.removeUnwanted = function (user) {
	delete user.password;
	delete user.scope;
	delete user.createdAt;
	delete user.updatedAt;
	return user;
};

lib.removeEmpty = function (obj) {
	Object.keys(obj).forEach((key) => (obj[key] === '') && delete obj[key]);
	return obj;
};

lib.postUser = function (params, payload) {
	// messed up object
	return new Promise((resolve, reject) => {
		return UserModel.update(lib.removeEmpty(payload),
			{
				where: {
					id: params.id,
				},
				returning: true,
			}
		)
		.then((user) => {
			return resolve(lib.removeUnwanted(user[1][0]));
		})
		.catch((err) => {
			return reject(Boom.wrap(err, 'Internal db error'));
		});
	});
};

module.exports = {
	handlers,
	// export lib object for testing business logic
	lib: (process.env.NODE_ENV === 'test') ? lib : null
};
