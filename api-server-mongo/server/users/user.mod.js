'use strict';

const Joi = require('joi');

module.exports = {
	user: Joi.object().keys({
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
	}).label('user'),

	// Using a getter here so that I can refer to `this`, in reference to the character node of the schema object
	get users() {
		return Joi
			.array()
			.items(this.user)
			.label('list_of_users');
	}
};
