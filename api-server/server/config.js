const host = process.env.HOST || 'localhost';
const	port = process.env.PORT || 8000;

const dbUser = process.env.USER || '';
const dbPass = process.env.DBPASS || '';
const dbHost = process.env.DBHOST || 'localhost';
const dbName = process.env.DBNAME || 'swaggerAPI';

// const dbConnectStr = `${dbUser}:${dbPass}@${dbHost}/${dbName}`;

const dbConnectStr = `${dbHost}/${dbName}`;

const dbCollections = ['users']

module.exports = {
	host,
	port,
	dbConnectStr,
	dbCollections,
}
