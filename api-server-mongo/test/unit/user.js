'use strict';

// requires for testing
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;

const Config = require('../../server/config');

// we require the handlers directly, so we can test the "Lib" functions in isolation
const UserCtrl = require('../../server/routes/users/user.ctrl');
const UserUtils = require('../../server/utils/userUtils');

describe('Unit Tests - User', () => {
	it(`Should return an array of ${Config.usersPerPage} users.`, (done) => {
    // test lib function
		UserCtrl.lib.getUsers().then((users) => {
			expect(users).to.be.an.array().and.have.length(Config.usersPerPage);
			done();
		}, (err) => {
			done(err);
		});
	});
	it('Should return one user object by ID.', (done) => {
		const params = {
			_id: '523209c4561c640000000001',
		};
		UserUtils.getUserById(params).then((user) => {
			expect(user).to.be.an.object();
			expect(user.name).to.equal('name-01');
			done();
		}, (err) => {
			done(err);
		});
	});
	it('Should cause an error by attempting to get a user with an invalid ID.', (done) => {
		const params = {
			_id: '000000000000000000000000',
		};
		UserUtils.getUserById(params).then(() => {
			// should not ever hit here, will always throw error
			done(new Error('Should not get here.'));
		}, (error) => {
			expect(error).to.be.an.object();
			expect(error.message).to.equal('Bad Request');
			done();
		});
	});
	it('Should update a user in the database by ID.', (done) => {
		const params = {
			_id: '523209c4561c640000000014',
		};
		const payload = {
			name: 'Last',
			email: 'test@test.test',
		};
		UserCtrl.lib.postUser(params, payload).then((user) => {
			expect(user).to.be.an.object();
			expect(user.name).to.equal('Last');
			done();
		}, (err) => {
			done(err);
		});
	});
});
