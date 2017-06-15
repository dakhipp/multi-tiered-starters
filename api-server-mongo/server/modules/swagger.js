'use strict';

// See: https://github.com/glennjones/hapi-swagger

const Pkg = require('../../package.json');

module.exports = {
	register: require('hapi-swagger'),
	options: {
		info: {
			title: 'Hapi Swagger Starter API',
			description: `
This API is a starter project for APIs using HapiJS.
<br />
<br />To see all routes, [click here](/).
<br />To see V1 routes only, [click here](/?tags=v1).
<br />To view the swagger.json, [click here](/swagger.json).
				`,
			// Get the version from package.json
			version: Pkg.version,
			contact: {
				name: 'Dakota Hipp',
//				url: 'https://dakotahipp.com/'
			},
			license: {
				// Get the license from package.json
				name: Pkg.license
			}
		},
		// Setup the documentation to be the root of this host
		documentationPath: '/',
		jsonEditor: true,
		tags: [{
			'name': 'users',
			'description': 'Routes that work with users.'
		},
		{
			'name': 'auth',
			'description': 'Routes that handle authentication.',
		}],
		// This is for use of grouping together paths.  Since each of our paths begin
		// with `/v{1,2}`, we want to ignore those first to arguments in the path,
		// since they won't help us group together resources
		// pathPrefixSize: 1,
		basePath: '/',
		// Also used for grouping paths together
		pathReplacements: [{
			// Replace the version in all paths
			replaceIn: 'groups',
			pattern: /v([0-9]+)\//,
			replacement: ''
		// }, {
		// 	// This allows grouping to include plural forms of the noun to be grouped
		// 	// with their singular counter-part (ie `characters` in the group `character`)
		// 	replaceIn: 'groups',
		// 	pattern: /s$/,
		// 	replacement: ''
		// },{
		// 	// Group all star wars related routes together
		// 	replaceIn: 'groups',
		// 	pattern: /\/(character|planet)/,
		// 	replacement: '/starwars'
		}]
	}
};
