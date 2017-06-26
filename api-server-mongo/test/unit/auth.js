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

const Config = require('../../server/config');

// we require the handlers directly, so we can test the "Lib" functions in isolation
const AuthCtrl = require('../../server/auth/auth.ctrl');

describe('Unit Tests - Auth', () => {
	it(`Should attach a default scope of USER to a user object`, (done) => {
	    expect(_.get(AuthCtrl.lib.attachScope({ name: "test" }), 'scope'))
	    .to.equal('USER');
	    done();
	});
});