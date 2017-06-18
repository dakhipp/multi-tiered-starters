'use strict';

const Mongojs = require('mongojs');
const Boom = require('boom');

const UserUtils = require('../utils/userUtils');
const Config = require('../config');

const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// handlers that do work on the routes
const handlers = {};

// business specific logic for testing
const lib = {};

handlers.get = function (request, reply) {
	request.params = request.params || {};
	if (request.params._id) {
		return reply(UserUtils.getUserById(request.params));
	}
	return reply(lib.getUsers(request.query));
};

handlers.post = function (request, reply) {
	request.params = request.params || {};
	if (request.params.id) {
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
				reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			resolve(docs.map((user) => UserUtils.removeUnwanted(user)));
		});
	});
};

lib.postUser = function (params, payload) {
	return new Promise((resolve, reject) => {
		db.users.findAndModify({
			query: {
				_id: Mongojs.ObjectId(params.id),
			},
			update: {
				$set: payload,
			},
			new: true,
		}, (err, doc) => {
			if (err) {
				reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			resolve(UserUtils.removeUnwanted(doc));
		});
	});
};

module.exports = {
	handlers,
	// export lib object for testing business logic
	lib: (process.env.NODE_ENV === 'test') ? lib : null
};
