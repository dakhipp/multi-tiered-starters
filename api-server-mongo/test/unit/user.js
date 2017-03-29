'use strict';

// requires for testing
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;

// we require the handlers directly, so we can test the "Lib" functions in isolation
const UserCtrl = require('../../server/users/user.ctrl');

describe('unit tests - user', () => {
	it('should return all users', (done) => {
    // test lib function
		UserCtrl.lib.getUsers().then((users) => {
			expect(users).to.be.an.array().and.have.length(1);
			done();
		}, (err) => {
			done(err);
		});
	});
});
