'use strict';

// load .env environment variables
require('dotenv').config('../.env');

const host = process.env.HOST;
const port = process.env.PORT;

const fullHost = `http://${host}:${port}`;

const dbUser = process.env.DBUSER;
const dbPass = process.env.DBPASS;

const jwtSecret = process.env.JWTSECRET;

// set default db link name as localhost
let dbHost = process.env.DBHOST;
// if ENV var DOCKER === true use docker db link name instead
if (process.env.DOCKER === 'true') {
	dbHost = 'mongo';
}

// set default db name based on .env file, overwrite if testing
let dbName = process.env.DBNAME;
// if testing use the test db instead
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
	jwtSecret,
};
