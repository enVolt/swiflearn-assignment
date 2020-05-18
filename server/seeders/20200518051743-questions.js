'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   const time = new Date();
   const start = new Date("2020-02-02T05:30:30");
   const end = new Date("2020-02-02T06:30:30");
   return queryInterface.bulkInsert('questions', [
     { question: "How to do X?", description: 'Class X by John', status: "ACTIVE", subjectId: 1 },
     { question: "How to do X?", description: 'Class X by John', status: "ACTIVE", subjectId: 2 },
     { question: "How to do X?", description: 'Class X by John', status: "ACTIVE", subjectId: 3 },
     { question: "How to do X?", description: 'Class X by John', status: "ACTIVE", subjectId: 4 },
   ].map(t => {
     t.createdAt = t.updatedAt = time;
     return t;
   }), {}); 
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return Promise.resolve();
  }
};
