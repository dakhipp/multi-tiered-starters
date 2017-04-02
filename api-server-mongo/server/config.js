'use strict';

const host = process.env.HOST || '0.0.0.0';
const	port = process.env.PORT || 8000;

const fullHost = `http://${host}:${port}`;

const dbUser = process.env.USER || 'root';
const dbPass = process.env.DBPASS || 'toor';

// set default db link name as localhost
let dbHost = process.env.DBHOST || 'localhost';
// if ENV var DOCKER === true use docker db link name instead
if (process.env.DOCKER === 'true') {
	dbHost = process.env.DBHOST || 'mongo';
}

let dbName = process.env.DBNAME || 'swaggerAPI';

if (process.env.NODE_ENV === 'test') {
	dbName = 'swaggerAPITest';
}

// set string up with user and password later
const dbConnectStr = `${dbUser}:${dbPass}@${dbHost}/${dbName}?authSource=admin`;

const dbCollections = ['users'];

const usersPerPage = 10;

module.exports = {
	host,
	port,
	fullHost,
	dbConnectStr,
	dbCollections,
	usersPerPage,
};
