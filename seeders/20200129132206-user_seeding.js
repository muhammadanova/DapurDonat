'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [
    {
      username: 'kevintan',
      password: 'makancuy',
      email: 'kevintan203@gmail.com',
      role: 'admin',
      isactive: 1
    },
    {
      username: 'anova',
      password: '12345',
      email: 'anovanurfaqih@gmail.com',
      role: 'admin',
      isactive: 1
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});

  }
};
