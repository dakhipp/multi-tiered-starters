'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
    //UNIQUE
		queryInterface.addConstraint('Users', ['username'], {
			type: 'UNIQUE',
			name: 'unique_usernames_constraint'
		});
	},

	down: function (queryInterface, Sequelize) {
		queryInterface.removeConstraint('Users', 'unique_usernames_constraint');
	}
};
