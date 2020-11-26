// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'Максим',
          lastName: 'Рылов',
          email: 'mrylov@smartru.com',
          login: 'root',
          password: bcrypt.hashSync('root', salt),
          salt,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null);
  },
};
