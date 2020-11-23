module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('UsersTasks', {
      fields: ['taskId'],
      type: 'foreign key',
      name: 'tasks_fkey_constraint_id',
      references: {
        table: 'tasks',
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
    return queryInterface.removeConstraint('UsersTasks', 'tasks_fkey_constraint_id');
  },
};
