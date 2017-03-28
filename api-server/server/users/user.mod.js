const joi = require('joi');
const boom = require('boom');
joi.objectId = require('joi-objectid')(joi);

module.exports = {
	user: joi.object().keys({
		// _id validation
		// be wary of this _id validation, not sure if it is too constraining
		_id: joi.object().keys({
			_bsontype: joi
				.string()
				.valid('ObjectID')
				.required(),
			id: joi
				.binary()
				.min(12)
				.max(12)
				.required(),
		}),
		// end of _id validation
		name: joi
			.string()
			.required()
			.description('The name of the user.')
			.example('Luke'),
	})
	.label('user'),
	// Using a getter here so that I can refer to `this`, in reference to the character node of the schema object
	get users () {
		return joi
			.array()
			.items(this.user)
			.label('list_of_users')
	}
};
