'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bcrypt = require('bcrypt');
    const saltRounds = 11;
   return queryInterface.bulkInsert('Users', [
      {
        username: 'contoh',
        password: bcrypt.hashSync('member', saltRounds),
        email: 'kevinlast@yahoo.com',
        role: 'member',
        isactive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'gakaktif',
        password: bcrypt.hashSync('member', saltRounds),
        email: 'gakaktif@yahoo.com',
        role: 'member',
        isactive: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});

  }
};
