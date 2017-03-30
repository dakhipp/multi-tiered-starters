'use strict';

const host = process.env.HOST || '0.0.0.0';
const	port = process.env.PORT || 8000;

const fullHost = `http://${host}:${port}`;

const dbUser = process.env.USER || '';
const dbPass = process.env.DBPASS || '';

// set default db link name as localhost
let dbHost = process.env.DBHOST || 'localhost';
// if ENV var DOCKER === true use docker db link name instead
if (process.env.DOCKER === 'true') {
	dbHost = process.env.DBHOST || 'mongo';
}

let dbName = process.env.DBNAME || 'swaggerAPI';

// set string up with user and password later
// const dbConnectStr = `${dbUser}:${dbPass}@${dbHost}/${dbName}`;

if (process.env.NODE_ENV === 'testing') {
	dbName = 'swaggerAPI-test';
}

const dbConnectStr = `${dbHost}/${dbName}`;

const dbCollections = ['users'];

module.exports = {
	host,
	port,
	dbConnectStr,
	dbCollections,
	fullHost
};
