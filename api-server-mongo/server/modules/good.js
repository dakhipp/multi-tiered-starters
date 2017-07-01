'use strict';

// See: https://github.com/hapijs/good

const goodConfigObj = {
	register: require('good'),
	options: {
		reporters: {
			console: [{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{
					// Log everything
					log: '*',
					// Only log out responses tagged with `api` (prevents response logs for swagger assets)
					response: ['api', 'ops']
				}]
			},{
				module: 'good-console'
			}, 'stdout']
		}
	}
};

// turn off logging for clearer test output
if (process.env.NODE_ENV === 'test') {
	delete goodConfigObj.options.reporters.console[0].args;
}

module.exports = goodConfigObj;
