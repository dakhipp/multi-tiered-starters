const joi = require('joi');
const boom = require('boom');
const mongojs = require('mongojs');

const config = require('../config');

const db = mongojs(config.dbConnectStr, config.dbCollections);

const getAllUsers = (request, reply) => {
	const { page, limit, sort } = request.query;

	let sortObj = {};
	sortObj[sort] = 1
	
	db.users.find()
	.sort(sortObj)
	.limit(limit)
	.skip(page * limit)
	.toArray((err, docs) => {
    if (err) {
      return reply(Boom.wrap(err, 'Internal MongoDB error'));
    }

    reply(docs);
  });
}

module.exports = {
	getAllUsers,
}
