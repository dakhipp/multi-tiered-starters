'use strict';
/*
	*** userUtils contains methods shared accross multiple controllers (ex: auth & user) ***
*/
const Boom = require('boom');

const UserModel = require('../routes/users/user.mod').sql;

// removes unwanted properties from user object, used before sending any users from db to client
// * remove right before sending to user
const removeUnwanted = function (user) {
	delete user.password;
	delete user.scope;
	delete user.createdAt;
	delete user.updatedAt;
	return user;
};

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
	removeUnwanted,
	getUserById,
};
