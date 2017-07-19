'use strict';

const Mongojs = require('mongojs');
const Boom = require('boom');

const UserUtils = require('../../utils/userUtils');
const Config = require('../../config');

const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// handlers that do work on the routes
const handlers = {};

// business specific logic for testing
const lib = {};

handlers.get = function (request, reply) {
	request.params = request.params || {};
	if (request.params._id) {
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
	if (String(request.auth.credentials._id) === String(request.params._id)) {
		console.log('hit 1');
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

		db.users
		.find()
		.sort(sortObj)
		.limit(limit)
		.skip(page * limit)
		.toArray((err, docs) => {
			if (err) {
				return reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			return resolve(docs.map((user) => lib.removeUnwanted(user)));
		});
	});
};

// removes unwanted properties from user object, used before sending any users from db to client
// * remove right before sending to client
lib.removeUnwanted = function (user) {
	delete user.password;
	delete user.scope;
	return user;
};

lib.removeEmpty = function (obj) {
	Object.keys(obj).forEach((key) => (obj[key] === '') && delete obj[key]);
	return obj;
};

lib.postUser = function (params, payload) {
	return new Promise((resolve, reject) => {
		const finalUpdateObj = lib.removeEmpty(payload);
		if (Object.keys(finalUpdateObj).length) {
			return db.users.findAndModify({
				query: {
					_id: Mongojs.ObjectId(params._id),
				},
				update: {
					$set: finalUpdateObj,
				},
				new: true,
			}, (err, doc) => {
				if (err) {
					return reject(Boom.wrap(err, 'Internal MongoDB error'));
				}
				return resolve(lib.removeUnwanted(doc));
			});
		}
		return reject(Boom.badRequest());
	});
};

module.exports = {
	handlers,
	// export lib object for testing business logic
	lib: (process.env.NODE_ENV === 'test') ? lib : null
};
