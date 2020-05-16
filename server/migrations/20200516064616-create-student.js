'use strict';

const { GRADE, EXAM_BOARD } = require("../app/constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },  
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      grade: {
        allowNull: false,
        type: Sequelize.ENUM(Object.values(GRADE))
      },
      board: {
        allowNull: false,
        type: Sequelize.ENUM(Object.values(EXAM_BOARD))
      },
      mobile: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};