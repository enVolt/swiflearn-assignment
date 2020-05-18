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
    return queryInterface.bulkInsert('lectures', [
      { description: 'Class X by John', start, end, subjectId: 1, teacherId: 1 },
      { description: 'Class XI by Doris', start, end, subjectId: 2, teacherId: 1 },
      { description: 'Class V by Vicky', start, end, subjectId: 3, teacherId: 1 },
      { description: 'Class VI by Nishant', start, end, subjectId: 4, teacherId: 1 },
      { description: 'Class VII by Bhavya', start, end, subjectId: 5, teacherId: 1 }
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
