'use strict';

/*
	*** userUtils contains methods shared accross multiple controllers (ex: auth & user) ***
*/
const Mongojs = require('mongojs');
const Boom = require('boom');

const Config = require('../config');
const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// removes unwanted properties from user object, used before sending any users from db to client
// * remove right before sending to user
const removeUnwanted = function (user) {
	delete user.password;
	return user;
};

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
	removeUnwanted,
	getUserById,
};
