'use strict';

const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const DBUtils = require('../db-utils');

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;
const before = lab.before;

const Config = require('../../server/config');

// require hapi server
const Server = require('../../server');

// TODO: create get route testing sort query param

// seed the db
before((done) => {
	const USERS_TO_SEED = 15;
	DBUtils.seedNUsers(USERS_TO_SEED)
	.then((res) => {
		// eslint-disable-next-line
		// console.log(`DB seeded with ${USERS_TO_SEED} users.`);
		done();
	});
});

// user tests
describe('Integration Tests - Users', () => {
	it(`GET - /v1/users - Should return an array of ${Config.usersPerPage} users.`, (done) => {
		Server.inject({
			method: 'GET',
			url: '/v1/users'
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result).to.have.length(Config.usersPerPage);
			done();
		});
	});
	it('GET - /v1/users/{_id} - Should return one user by ID.', (done) => {
		Server.inject({
			method: 'GET',
			url: '/v1/users/523209c4561c640000000001'
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result.name).to.equal('name-01');
			done();
		});
	});
	it('POST - /v1/users/{_id} - Should update a user by ID.', (done) => {
		Server.inject({
			method: 'POST',
			url: '/v1/users/523209c4561c640000000014',
			payload: {
				name: 'last'
			},
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result.name).to.equal('last');
			done();
		});
	});
});

// documentation tests, might move this later
describe('Integration Tests - GET Documentation', () => {
	it('GET - / - Should return documentation html page.', (done) => {
		Server.inject({
			method: 'GET',
			url: '/'
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result).to.be.a.string();
			done();
		});
	});
});
