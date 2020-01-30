'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [
    {
      username: 'kevintan',
      password: 'KVZ2Csfo+BCCTZlOn9zAEtTBvAmk49uoL5p9N4akFLk=',
      email: 'kevintan203@gmail.com',
      role: 'admin',
      isactive: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'anova',
      password: 'WZRHGrsBESr8wYFZ9sx0tPURuZgG2lmzyvWpwXPKz8U=',
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
