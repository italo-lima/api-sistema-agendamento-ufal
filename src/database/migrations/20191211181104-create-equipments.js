'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable("equipment", 
      { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false
        },
        owner:{
          type: Sequelize.STRING,
          allowNull: false
        },
        active:{
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
  },

  down: (queryInterface) => {
   
      return queryInterface.dropTable("equipment");
  }
};
