'use strict';

const UserModel = require('../server/routes/users/user.mod').sql;

// seeds a user
const seedUser = function (i) {
	return new Promise((resolve, reject) => {
		UserModel.create({
			'id': i,
			'name': `name-${('0' + i).slice(-2)}`,
			'username': `user-${('0' + i).slice(-2)}`,
			'password': `pass-${('0' + i).slice(-2)}`,
			'email': `email-${('0' + i).slice(-2)}@test.com`,
			'phone_number': `123-123-12${('0' + i).slice(-2)}`,
		})
		.then((user) => {
			return resolve(user);
		})
		.catch((err) => {
			reject(err);
		});
	});
};

// seeds the database with n number of users
const seedNUsers = function (n) {
	return new Promise((resolve, reject) => {
		const promises = [];

		for (let i = 0; i < n; i += 1) {
			promises.push(seedUser(i + 1));
		}

		return Promise.all(promises)
		.then((values) => {
			return resolve(values);
		})
		.catch((err) => {
			return reject(err);
		});
	});
};

// empties user database
const emptyUsers = function () {
	return new Promise((resolve, reject) => {
		UserModel.destroy({ where: {} });
	});
};

module.exports = {
	seedNUsers,
	emptyUsers,
};
