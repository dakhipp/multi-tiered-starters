'use strict';

const Mongojs = require('mongojs');

const Config = require('../config');

const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// handlers that do work on the routes
const handlers = {};

// business specific logic for testing
const lib = {};

lib.getUsers = function (query) {
	return new Promise((resolve, reject) => {
		const limit = Config.usersPerPage;
		let page = 0;
		let sort = 'name';

		if (typeof query !== undefined) {
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

			resolve(docs);
		});
	});
};

lib.getUser = function (params) {
	return new Promise((resolve, reject) => {
		db.users.findOne({
			_id: Mongojs.ObjectId(params.id),
		}, (err, doc) => {
			if (err) {
				reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			resolve(doc);
		});
	});
};

lib.postUsers = function (payload) {
	return new Promise((resolve, reject) => {
		db.users.save({
			name: payload.name,
		}, (err, doc) => {
			if (err) {
				reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			resolve(doc);
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
				$set: {
					name: payload.name,
				},
			},
			new: true,
		}, (err, doc) => {
			if (err) {
				reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			resolve(doc);
		});
	});
};

handlers.get = function (request, reply) {
	request.params = request.params || {};
	if (request.params.id) {
		reply(lib.getUser(request.params));
	}
	else {
		reply(lib.getUsers(request.query));
	}
};

handlers.post = function (request, reply) {
	request.params = request.params || {};
	if (request.params.id) {
		reply(lib.postUser(request.params, request.payload));
	}
	else {
		reply(lib.postUsers(request.payload));
	}
};

module.exports = {
	handlers,
	// export lib object for testing business logic
	lib: (process.env.NODE_ENV === 'test') ? lib : null
};
