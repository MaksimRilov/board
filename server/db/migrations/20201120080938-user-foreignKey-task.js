module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('UsersTasks', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'users_fkey_constraint_id',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('UsersTasks', 'users_fkey_constraint_id');
  },
};
