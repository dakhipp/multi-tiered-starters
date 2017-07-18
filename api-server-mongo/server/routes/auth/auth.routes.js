'use strict';

const Joi = require('joi');
const AuthCtrl = require('./auth.ctrl');
const Schema = require('../auth/auth.mod');

// similar to creating new user / register
const routes = (server) => [{
	method: 'POST',
	path: '/v1/register',
	config: {
		handler: AuthCtrl.handlers.register,
		description: 'Registers a new user to the database if one doesn\'t already esist and returns token.',
		tags: ['api', 'v1'],
		validate: {
			payload: {
				username: Joi
					.string()
					.required()
					.description('The username of the user.'),
				password: Joi
					.string()
					.required()
					.description('The password of the user.'),
				password_conf: Joi
					.string()
					.required()
					.description('The password confimation should match the password.'),
				name: Joi
					.string()
					.required()
					.description('The name of the user.'),
				phone_number: Joi
					.string()
					.required()
					.description('The phone number of the user.'),
				email: Joi
					.string()
					.required()
					.description('The email of the user.'),
			}
		},
		response: {
			// change to token
			schema: Schema.auth
		},
		auth: false,
	}
},
{
	method: 'POST',
	path: '/v1/login',
	config: {
		handler: AuthCtrl.handlers.login,
		description: 'Logs in an exsisting user and returns token.',
		tags: ['api', 'v1'],
		validate: {
			payload: {
				username: Joi
					.string()
					.required()
					.description('The username of the user.'),
				password: Joi
					.string()
					.required()
					.description('The password of the user.'),
			}
		},
		response: {
			// change to token
			schema: Schema.auth
		},
		auth: false,
	}
}];

module.exports = routes;
