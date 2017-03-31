'use strict';

// requires for testing
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;
// const before = lab.before;
// const after = lab.after;

// we require the handlers directly, so we can test the "Lib" functions in isolation
const UserCtrl = require('../../server/users/user.ctrl');

describe('Unit Tests - User', () => {
	it('Should return all array of all users.', (done) => {
    // test lib function
		UserCtrl.lib.getUsers().then((users) => {
			expect(users).to.be.an.array().and.have.length(10);
			done();
		}, (err) => {
			done(err);
		});
	});
});
