'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      route_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      distance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      difficulty: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'medium'
      },
      start_location: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      end_location: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      waypoints: {
        type: Sequelize.JSON,
        allowNull: true
      },
      polyline: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('routes');
  }
};