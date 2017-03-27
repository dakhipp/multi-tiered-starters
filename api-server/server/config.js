const host = process.env.HOST || '0.0.0.0';
const	port = process.env.PORT || 8000;

const dbUser = process.env.USER || '';
const dbPass = process.env.DBPASS || '';
// TODO: come up with a better way to match the host name on 
// localhost and when using docker-compose 
//
// Ideas:
// (create init .sh script to add mongo to host file)
// (create nginx proxy to connect services)
//
// const dbHost = process.env.DBHOST || 'localhost';
const dbHost = process.env.DBHOST || 'mongo'; // for docker
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
