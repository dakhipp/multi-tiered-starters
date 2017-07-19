'use strict';
/*
	*** userUtils contains methods shared accross multiple controllers (ex: auth & user) ***
*/
const Boom = require('boom');

const UserModel = require('../routes/users/user.mod').sql;

// fetches a user by id
const getUserById = function (params) {
	return new Promise((resolve, reject) => {
		return UserModel.findById(params.id)
		.then((user) => {
			if (!user) {
				return reject(Boom.badRequest());
			}
			return resolve(user);
		})
		.catch(() => {
			return reject(Boom.badRequest());
		});
	});
};

module.exports = {
	getUserById,
};
