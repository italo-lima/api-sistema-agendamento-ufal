'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('registers', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      equipment_id: {
        type: Sequelize.INTEGER,
        references: { model: 'equipment', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
   
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('registers');
   
  }
};
