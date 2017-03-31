'use strict';

// requires for testing
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const DBUtils = require('../db-utils');

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;
const before = lab.before;

// require hapi server
const Server = require('../../');

// TODO: refactor config.USERS_PER_CALL global
// TODO: create get route testing sort query param

// seed 15
// get all should have 10
// get all page 2 should have 5

before((done) => {
	const USERS_TO_SEED = 15;
	DBUtils.seedNUsers(USERS_TO_SEED)
	.then((res) => {
		console.log(`DB seeded with ${USERS_TO_SEED} users.`);
		done();
	});
});

// tests
describe('Integration Tests - Users', () => {
	it('/GET should get 10 users', (done) => {
    // make API call to self to test functionality end-to-end
		Server.inject({
			method: 'GET',
			url: '/v1/users'
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result).to.have.length(10);
			done();
		});
	});
	it('/GET:id should a user by ID.', (done) => {
		Server.inject({
			method: 'GET',
			url: '/v1/users/123'
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result).to.have.length(1);
			done();
		});
	});
	it('/POST should create a new user.', (done) => {
		Server.inject({
			method: 'POST',
			url: '/v1/users'
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			expect(response.result).to.have.length(1);
			done();
		});
	});
	// should fail if not same user
	// should fail if user not found
	it('/POST:id should update a given uesr in the database.', (done) => {
		Server.inject({
			method: 'POST',
			url: '/v1/users/12312'
		}, (response) => {
			expect(response.statusCode).to.equal(200);
			// double check this
			expect(response.result).to.have.length(1);
			done();
		});
	});
	it('/DELETE:id should remove a given uesr from the database.', (done) => {
		Server.inject({
			method: 'DELETE',
			url: '/v1/users/12312'
		}, (response) => {
			expect(response.statusCode).to.equal(200);

			Server.inject({
				method: 'DELETE',
				url: '/v1/users/12312'
			}, (response2) => {
				expect(response2.statusCode).to.equal(200);
				expect(response2.result).to.have.length(0);
				done();
			});
		});
	});
});

describe('Integration Tests - GET Documentation', () => {
	it('Should return documentation html page.', (done) => {
    // make API call to self to test functionality end-to-end
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
