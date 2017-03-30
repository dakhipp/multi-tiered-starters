'use strict';

const Mongojs = require('mongojs');

const Config = require('../server/config');

const db = Mongojs(Config.dbConnectStr, Config.dbCollections);

// seeds user database with 15 users
const seedFifUsers = function () {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < 15; i += 1) {
			db.users.save({
				// takes into account 0s, 01, 02, ..., 11
				'_id': Mongojs.ObjectId(`523209c4561c6400000000${('0' + i).slice(-2)}`),
				'name': `name-${i}`,
			}, (err, doc) => {
				if (err) {
					return reject(err);
				}
				return resolve(doc);
			});
		}
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
	seedFifUsers,
	emptyUsers,
};
