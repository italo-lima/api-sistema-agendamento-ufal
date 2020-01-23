'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.addColumn('equipment', 'color', 
      { 
        type: Sequelize.STRING,
        allowNull: true
      });
  },

  down: (queryInterface) => {
      return queryInterface.removeColumn('equipment', 'color');
  }
};
