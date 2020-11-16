module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', {
      type: 'foreign key',
      fields: ['roleId'],
      references: {
        table: 'roles',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'role_fkey_constraint_roleId');
  },
};
