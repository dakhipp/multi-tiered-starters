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
			return reply(UserUtils.removeUnwanted(user));
		})
		.catch((err) => {
			return reply(err);
		});
	}
	return reply(lib.getUsers(request.query));
};

handlers.post = function (request, reply) {
	request.params = request.params || {};
	if (request.params._id) {
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

			return resolve(docs.map((user) => UserUtils.removeUnwanted(user)));
		});
	});
};

lib.removeEmpty = function (obj) {
	Object.keys(obj).forEach((key) => (obj[key] === '') && delete obj[key]);
	return obj;
};

lib.postUser = function (params, payload) {
	return new Promise((resolve, reject) => {
		db.users.findAndModify({
			query: {
				_id: Mongojs.ObjectId(params._id),
			},
			update: {
				$set: lib.removeEmpty(payload),
			},
			new: true,
		}, (err, doc) => {
			if (err) {
				return reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			return resolve(UserUtils.removeUnwanted(doc));
		});
	});
};

module.exports = {
	handlers,
	// export lib object for testing business logic
	lib: (process.env.NODE_ENV === 'test') ? lib : null
};
