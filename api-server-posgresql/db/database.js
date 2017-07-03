'use strict';

const Config = require('../server/config');

const sequelizeConfig = { url: Config.dbConnectStr, dialect: 'postgres' };
sequelizeConfig.production = sequelizeConfig;
sequelizeConfig.test = sequelizeConfig;
sequelizeConfig.development = sequelizeConfig;

console.log(sequelizeConfig);

// Export final database config
module.exports = sequelizeConfig;
