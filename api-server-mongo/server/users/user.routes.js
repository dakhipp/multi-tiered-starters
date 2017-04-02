'use strict';

const Joi = require('joi');
const UserCtrl = require('./user.ctrl');
const Schema = require('./user.mod');

const routes = (server) => [{
	method: 'GET',
	path: '/v1/users',
	config: {
		handler: UserCtrl.handlers.get,
		description: 'Returns an array of users.',
		tags: ['api', 'v1', 'users'],
		validate: {
			query: {
				page: Joi
					.number()
					.integer()
					.min(0)
					.default(0)
					.description('The current page number of results.'),
				sort: Joi
					.string()
					.default('name')
					.description('The key on which to sort the results.')
			}
		},
		response: {
			schema: Schema.users
		}
	}
},
{
	method: 'GET',
	path: '/v1/users/{id}',
	config: {
		handler: UserCtrl.handlers.get,
		description: 'Return one user based on their ID.',
		tags: ['api', 'v1', 'users'],
		validate: {
			params: {
				id: Joi
					.string()
					.required()
					.description('The ID of the user.'),
			}
		},
	}
},
{
	method: 'POST',
	path: '/v1/users',
	config: {
		handler: UserCtrl.handlers.post,
		description: 'Posts a new user to the database.',
		tags: ['api', 'v1', 'users'],
		validate: {
			payload: {
				name: Joi
					.string()
					.required()
					.description('The name of the user.'),
			}
		},
		response: {
			schema: Schema.user
		}
	}
},
{
	method: 'POST',
	path: '/v1/users/{id}',
	config: {
		handler: UserCtrl.handlers.post,
		description: 'Updates a user based on their ID.',
		tags: ['api', 'v1', 'users'],
		validate: {
			params: {
				id: Joi
					.string()
					.required()
					.description('The ID of the user.'),
			},
			payload: {
				name: Joi
					.string()
					.required()
					.description('The name of the user.'),
			},
		},
		response: {
			schema: Schema.user
		}
	}
}];

module.exports = routes;
