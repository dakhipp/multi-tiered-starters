'use strict';

const UserRoutes = require('./users/user.routes.js');
const AuthRoutes = require('./auth/auth.routes.js');

// remove later
const Joi = require('joi');
const TestRoutes = [{
	method: 'GET',
	path: '/v1/roles/open',
	config: {
		handler: function (request, reply) {
			return reply({ success: true });
		},
		description: 'Returns success object if request is successful.',
		tags: ['api', 'v1', 'roles'],
		auth: false,
	},
},
{
	method: 'GET',
	path: '/v1/roles/user',
	config: {
		handler: function (request, reply) {
			return reply({ success: true });
		},
		description: 'Returns success object if request is successful.',
		tags: ['api', 'v1', 'roles'],
		validate: {
			headers: Joi.object({
				'authorization': Joi.string().required().description('The authorization token belonging to the current user.'),
			}).options({ allowUnknown: true }),
		},
		auth: {
			scope: ['USER', 'ADMIN'],
		},
	},
},
{
	method: 'GET',
	path: '/v1/roles/admin',
	config: {
		handler: function (request, reply) {
			return reply({ success: true });
		},
		description: 'Returns success object if request is successful.',
		tags: ['api', 'v1', 'roles'],
		validate: {
			headers: Joi.object({
				'authorization': Joi.string().required().description('The authorization token belonging to the current user.'),
			}).options({ allowUnknown: true }),
		},
		auth: {
			scope: 'ADMIN',
		},
	},
}];

module.exports = (server) => {
	return [].concat(UserRoutes(server), AuthRoutes(server), TestRoutes);
};
