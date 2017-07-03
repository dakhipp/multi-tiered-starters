'use strict';

const Joi = require('joi');

const sql = require('../../../db/models/user');

const joi = {
	user: Joi.object().keys({
		id: Joi
			.number()
			.required()
			.description('Unique ID')
			.example(33),
		name: Joi
			.string()
			.required()
			.description('The name of the user.')
			.example('Luke'),
		username: Joi
			.string()
			.required()
			.description('The username of the user.')
			.example('user123'),
		phone_number: Joi
			.string()
			.required()
			.description('The phone number of the user.')
			.example('123-123-1234'),
		email: Joi
			.string()
			.required()
			.description('The email of the user.')
			.example('fake@yahoo.com'),
	}).label('user'),

	// Using a getter here so that I can refer to `this`, in reference to the character node of the schema object
	get users() {
		return Joi
			.array()
			.items(this.user)
			.label('list_of_users');
	}
};

module.exports = {
	sql,
	joi,
};

