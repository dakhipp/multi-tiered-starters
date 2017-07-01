'use strict';

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const DBUtils = require('../db-utils');

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;

// require hapi server
const Server = require('../../server');

DBUtils.emptyUsers();

// user tests
describe('Integration Tests - Auth', () => {
	// register a new user
	it('POST - /v1/register - Should create a new user in the database.', (done) => {
		Server.inject({
			method: 'POST',
			url: '/v1/register',
			payload: {
				name: 'newUser',
				username: 'user123',
				phone_number: '123-123-1234',
				email: 'fake@yahoo.com',
				password: 'testpass',
			},
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result).to.be.an.object();
			// TODO: check for token
			done();
		});
	});

	// logs in an existing user
	it('POST - /v1/login - Should login a user.', (done) => {
		Server.inject({
			method: 'POST',
			url: '/v1/login',
			payload: {
				username: 'user123',
				password: 'testpass',
			},
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result).to.be.an.object();
			// TODO: check for token
			done();
		});
	});

	// TODO: figure out what to do with the validate function
});


