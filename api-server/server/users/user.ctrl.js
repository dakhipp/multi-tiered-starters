const joi = require('joi');
const boom = require('boom');
const mongojs = require('mongojs');

const config = require('../config');

const db = mongojs(config.dbConnectStr, config.dbCollections);

const getAllUsers = (request, reply) => {
	const { page, limit, sort } = request.query;
	
	db.users.find((err, docs) => {
    if (err) {
      return reply(Boom.wrap(err, 'Internal MongoDB error'));
    }

    reply(docs);
  });
}

module.exports = {
	getAllUsers,
}
