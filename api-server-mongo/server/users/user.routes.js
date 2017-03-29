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
				limit: Joi
					.number()
					.integer()
					.min(0)
					.max(20)
					.default(10)
					.description('Number of results to show per page.'),
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
}];

module.exports = routes;
