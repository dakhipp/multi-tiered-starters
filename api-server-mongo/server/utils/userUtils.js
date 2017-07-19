'use strict';

/*
	*** userUtils contains methods shared accross multiple controllers (ex: auth & user) ***
*/
const Mongojs = require('mongojs');
const Boom = require('boom');

const Config = require('../config');
const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// fetches a user by id
const getUserById = function (params) {
	return new Promise((resolve, reject) => {
		db.users.findOne({
			_id: Mongojs.ObjectId(params._id),
		}, (err, doc) => {
			if (!doc || err) {
				reject(Boom.badRequest());
			}
			resolve(doc);
		});
	});
};

module.exports = {
	getUserById,
};
