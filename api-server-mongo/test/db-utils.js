'use strict';

const Mongojs = require('mongojs');

const Config = require('../server/config');

const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// seeds a user
const seedUser = function (i) {
	return new Promise((resolve, reject) => {
		db.users.save({
			// takes into account 0s, 01, 02, ..., 11
			'_id': Mongojs.ObjectId(`523209c4561c6400000000${('0' + i).slice(-2)}`),
			'name': `name-${('0' + i).slice(-2)}`,
			'username': `user-${('0' + i).slice(-2)}`,
			'password': `pass-${('0' + i).slice(-2)}`,
			'email': `email-${('0' + i).slice(-2)}@test.com`,
			'phone_number': `123-123-12${('0' + i).slice(-2)}`,
		}, (err, doc) => {
			if (err) {
				return reject(err);
			}
			resolve(doc);
		});
	});
};

// seeds the database with n number of users
const seedNUsers = function (n) {
	return new Promise((resolve, reject) => {
		const promises = [];

		for (let i = 0; i < n; i += 1) {
			promises.push(seedUser(i));
		}

		Promise.all(promises)
		.then((values) => {
			resolve(values);
		})
		.catch((err) => {
			reject(err);
		});
	});
};

// empties user database
const emptyUsers = function () {
	return new Promise((resolve, reject) => {
		db.users.remove({}, (err, docs) => {
			if (err) {
				return reject(err);
			}
			return resolve(doc);
		});
	});
};

module.exports = {
	seedNUsers,
	emptyUsers,
};
