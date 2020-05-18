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
    return queryInterface.bulkInsert('subjects', [
      { name: 'Physics' },
      { name: 'Math' },
      { name: 'Chemistry' },
      { name: 'Hindi' },
      { name: 'English' },
      { name: 'Computer' },
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
