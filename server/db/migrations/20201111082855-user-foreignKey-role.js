module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', {
      type: 'foreign key',
      fields: ['role_id'],
      references: {
        table: 'roles',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'role_fkey_constraint_role_id');
  },
};
