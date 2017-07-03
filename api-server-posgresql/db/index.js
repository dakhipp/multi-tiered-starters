'use strict';

const Sequelize = require('sequelize');
const Config = require('../server/config');

// Create shared instance to be used across models and in testing
const db = new Sequelize(Config.dbConnectStr, Config.dbConfig);

module.exports = db;
