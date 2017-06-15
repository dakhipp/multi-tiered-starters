'use strict';

const host = process.env.HOST || '0.0.0.0';
const	port = process.env.PORT || 8000;

const fullHost = `http://${host}:${port}`;

const dbUser = process.env.USER || 'root';
const dbPass = process.env.DBPASS || 'toor';

const jwtSecret = process.env.JWTSECRET || 'SdHTpdFvofraTeOtm4DBt+U/RLObDb8cZLsO8IkFZiFMC1NZ+6b0bzn2Rwdh+pTh0GHwNMg8qWf/MPlQPKFwusGDFdHsjy2COF03NojvXUB9Ij5wizOviGyH7Ww2yzuRemv9isOm/Tyt/hLgrGPqa2TwmEnD1vq4awIJlhAMsyoXfb85Ohxa9+q86exBmrsehILTVTkGMdXyVOH304eOvvgzdRCHmeXhWLm9BKcEYNaFsZyOqHSv0TyxXU8siUl0pLvCwl5PhhTeoOwhbAs4+rvFEUHbGRzQk4+L5e8JezPMtXWJwDEipl6f9VfPMGIDfYwr3NKs1eVGa7cSHxdLrA==';

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
	jwtSecret,
};
