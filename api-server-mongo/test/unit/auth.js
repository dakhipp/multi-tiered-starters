'use strict';

// requires for testing
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const _ = require('lodash');
const lab = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;

// we require the handlers directly, so we can test the "Lib" functions in isolation
const AuthCtrl = require('../../server/routes/auth/auth.ctrl');

describe('Unit Tests - Auth', () => {
	it('Should attach a default scope of USER to a user object.', (done) => {
		expect(_.get(AuthCtrl.lib.attachScope({ name: 'test' }), 'scope'))
		.to.equal('USER');
		done();
	});

	it('Should attach a valid token to a user object.', (done) => {
		expect(_.get(AuthCtrl.lib.attachToken({ name: 'test' }), 'token'))
		.to.be.a.string();
		done();
	});

	it('Should create a new user in the database and return the user.', (done) => {
		const payload = {
			name: 'newUser',
			username: 'user123',
			phone_number: '123-123-1234',
			email: 'fake@yahoo.com',
			password: 'testpass'
		};

		AuthCtrl.lib.createUser(payload).then((user) => {
			expect(user).to.be.an.object();
			done();
		}, (err) => {
			done(err);
		});
	});

	// holds hashed password after first test so it can be checked later
	const fakeHashedUser = {
		password: ''
	};
	// holds password to be tested against
	const badPassword = 'password123!';

	it('Should take a text password and return the salted and hashed version.', (done) => {
		AuthCtrl.lib.hashPassword(badPassword).then((hashedPassword) => {
			fakeHashedUser.password = hashedPassword;
			expect(hashedPassword).to.be.an.string();
			done();
		}, (err) => {
			done(err);
		});
	});

	it('Should compare a plain text password to the hashed version.', (done) => {
		AuthCtrl.lib.comparePassword(badPassword, fakeHashedUser).then((user) => {
			expect(user).to.be.an.object();
			done();
		}, (err) => {
			done(err);
		});
	});

	it('Should return a user from the database based on their username.', (done) => {
		AuthCtrl.lib.getUserByUsername({ username: 'user123' }).then((user) => {
			expect(user).to.be.an.object();
			expect(user.name).to.equal('newUser');
			done();
		}, (err) => {
			done(err);
		});
	});
});
