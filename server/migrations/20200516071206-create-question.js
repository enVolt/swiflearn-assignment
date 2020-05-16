'use strict';

const { QUESTION_STATUS } = require("../app/constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('questions', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT
    },
    question: {
        allowNull: false,
        type: Sequelize.STRING
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING
    },
    status: {
        allowNull: false,
        defaultValue: QUESTION_STATUS.ACTIVE,
        type: Sequelize.ENUM(Object.values(QUESTION_STATUS))
    },
    subjectId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "subjects"
        },
        key: "id"
      }
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('questions');
  }
};
