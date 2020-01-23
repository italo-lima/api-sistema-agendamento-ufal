'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.addColumn('users', 'cpf', 
      { 
        type: Sequelize.STRING,
        allowNull: true
      });
  },

  down: (queryInterface) => {
      return queryInterface.removeColumn('users', 'cpf');
  }
};
