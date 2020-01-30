'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bcrypt = require('bcrypt');
    const saltRounds = 11;
   return queryInterface.bulkInsert('Users', [
    {
      username: 'kevintan',
      password: bcrypt.hashSync('makancuy', saltRounds),
      email: 'kevintan203@gmail.com',
      role: 'admin',
      isactive: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'anova',
      password: bcrypt.hashSync('123456', saltRounds),
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
