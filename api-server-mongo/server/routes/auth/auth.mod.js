'use strict';

const Joi = require('joi');

module.exports = {
	auth: Joi.object().keys({
		// _id validation
		// be wary of this _id validation, not sure if it is too constraining
		_id: Joi.object().keys({
			_bsontype: Joi
				.string()
				.valid('ObjectID')
				.required(),
			id: Joi
				.binary()
				.min(12)
				.max(12)
				.required(),
		}),
		// end of _id validation
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
		token: Joi
			.string()
			.required()
			.description('The token used for future authentication.')
			.example('eyJhbJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyzQiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiX2lkIjoiNTk0MWVkNzM4Zjc1MWQwM2GciOiQyMzY5NTVjIiwiaWF0IjoxNDk3NDkyODUxfQ._9s1ocMklXB0x3TmLnz7yQUAZBhFWsOltea0D7sKmQYbmFtZSI6InVzZTEiLCJuYW1lIjoidGVzdCIsInBob25lX251bWJlciI6IjEyMzEyMzEyM'),
	}).label('auth'),
};