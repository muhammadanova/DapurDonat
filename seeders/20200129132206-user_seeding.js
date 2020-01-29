'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [
    {
      username: 'kevintan',
      password: 'makancuy',
      email: 'kevintan203@gmail.com',
      role: 'admin',
      isactive: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'anova',
      password: '12345',
      email: 'anovanurfaqih@gmail.com',
      role: 'admin',
      isactive: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});

  }
};
