'use strict';

const Mongojs = require('mongojs');

const Config = require('../config');

const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// handlers that do work on the routes
const handlers = {};

// business specific logic for testing
const lib = {};

lib.getUsers = function (queryObj) {
	return new Promise((resolve, reject) => {
		let page = 0;
		let limit = 10;
		let sort = 'name';

		if (!queryObj === undefined) {
			page = queryObj.page || 0;
			limit = queryObj.limit || 10;
			sort = queryObj.sort || 'name';
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

lib.getUser = function (id) {
	return new Promise((resolve, reject) => {
		db.users.find({
			_id: id
		})
		.limit(1)
		.toArray((err, docs) => {
			if (err) {
				reject(Boom.wrap(err, 'Internal MongoDB error'));
			}

			resolve(docs);
		});
	});
};

handlers.get = function (request, reply) {
	request.query = request.query || {};
	if (request.query.id) {
		reply(lib.getUser(request.query.id));
	}
	else {
		reply(lib.getUsers(request.query));
	}
};

module.exports = {
	handlers,
	// export lib object for testing business logic
	lib: (process.env.NODE_ENV === 'test') ? lib : null
};
