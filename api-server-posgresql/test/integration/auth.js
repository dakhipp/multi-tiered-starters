'use strict';

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const _ = require('lodash');
const lab = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;

// require hapi server
const Server = require('../../server');

// holds token after login to test the following role routes
let token = '';

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
			expect(_.get(response.result, 'token')).to.be.a.string();
			done();
		});
	});

	// trys to register an already exsisting user, should fail
	it('POST - /v1/register - Should fail at creating a new user since the user already exsists.', (done) => {
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
			expect(response.statusCode).to.equal(400);
			expect(response.result.message).to.equal('User already exsists.');
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
			// add valid token for next 3 tests
			token = response.result.token;
			expect(response.statusCode).to.equal(200);
			expect(response.result).to.be.an.object();
			expect(_.get(response.result, 'token')).to.be.a.string();
			done();
		});
	});

	// trys to login with non exsistant credentials, should fail
	it('POST - /v1/login - Attempts to login a user with a username and password that don\'t exist and fails.', (done) => {
		Server.inject({
			method: 'POST',
			url: '/v1/login',
			payload: {
				username: 'aaa',
				password: 'aaa',
			},
		}, (response) => {
			expect(response.statusCode).to.equal(400);
			expect(response.result.message).to.equal('Invalid credentials.');
			done();
		});
	});

	// trys to login an exsisting user with the wrong password, should fail
	it('POST - /v1/login - Attempts to login a user with the wrong password and fails.', (done) => {
		Server.inject({
			method: 'POST',
			url: '/v1/login',
			payload: {
				username: 'user123',
				password: 'aaa',
			},
		}, (response) => {
			expect(response.statusCode).to.equal(400);
			expect(response.result.message).to.equal('Invalid credentials.');
			done();
		});
	});

	// next three tests test the route scope function
	it('GET - /v1/roles/open - Should return 200 without a token.', (done) => {
		Server.inject({
			method: 'GET',
			url: '/v1/roles/open',
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});
	it('GET - /v1/roles/user - Should return 200 without a valid user token.', (done) => {
		Server.inject({
			method: 'GET',
			url: '/v1/roles/user',
			headers: {
				Authorization: token,
			}
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});
	it('GET - /v1/roles/admin - Should return 400 invalid scope with a valid user token.', (done) => {
		Server.inject({
			method: 'GET',
			url: '/v1/roles/admin',
			headers: {
				Authorization: token,
			}
		}, (response) => {
			expect(response.statusCode).to.equal(403);
			expect(response.result.message).to.equal('Insufficient scope');
			done();
		});
	});
});
