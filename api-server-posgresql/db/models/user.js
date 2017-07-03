'use strict';

const Sequelize = require('sequelize');
const Db = require('../');

const User = Db.define('User', {
	name: Sequelize.STRING,
	username: Sequelize.STRING,
	phone_number: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING
}, {
	classMethods: {
		associate: function (models) {
      // associations can be defined here
		},
	},
});

module.exports = User;
