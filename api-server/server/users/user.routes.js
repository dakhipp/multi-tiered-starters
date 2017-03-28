const joi = require('joi');
const handlers = require('./user.ctrl');
const schema = require('./user.mod');

const routes = (server) => [{
	method: 'GET',
	path: '/v1/users',
	config: {
		handler: handlers.getAllUsers,
		description: 'Returns an array of users.',
		tags: ['api', 'v1', 'users'],
		validate: {
			query: {
				page: joi
					.number()
					.integer()
					.min(0)
					.default(0)
					.description('The current page number of results.'),
				limit: joi
					.number()
					.integer()
					.min(0)
					.max(20)
					.default(10)
					.description('Number of results to show per page.'),
				sort: joi
					.string()
					.default('name')
					.description('The key on which to sort the results.'),
			},
		},
		response: {
			schema: schema.users,
		},
	},
}];

module.exports = routes;
