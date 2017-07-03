'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		queryInterface.addColumn(
			'Users',
			'scope',
			{
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'USER',
			}
		);
	},

	down: function (queryInterface, Sequelize) {
		queryInterface.removeColumn('Users', 'scope');
	}
};
