'use strict';

const Joi = require('joi');

// eslint-disable-next-line hapi/hapi-capitalize-modules
const sql = require('../../../db/models/user');

const joi = {
	auth: Joi.object().keys({
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
		scope: Joi
			.string()
			.required()
			.description('The scope of a user\'s access rights.')
			.example('USER'),
		email: Joi
			.string()
			.required()
			.description('The email of the user.')
			.example('fake@yahoo.com'),
		token: Joi
			.string()
			.required()
			.description('The token used for future authentication.')
			.example('eyJhbJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyzQiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiX2lkIjoiNTk0MWVkNzM4Zjc1MWQwM2GciOiQyMzY5NTVjIiwiaWF0IjoxNDk3NDkyODUxfQ._9s1ocMklXB0x3TmLnz7yQUAZBhFWsOltea0D7sKmQYbmFtZSI6InVzZTEiLCJuYW1lIjoidGVzdCIsInBob25lX251bWJlciI6IjEyMzEyMzEyM'),
	}).label('auth'),
};

module.exports = {
	sql,
	joi,
};
