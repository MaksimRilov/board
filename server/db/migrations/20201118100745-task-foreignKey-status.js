module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Tasks', {
      type: 'foreign key',
      fields: ['statusId'],
      references: {
        table: 'statuses',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Tasks', 'status_fkey_constraint_statusId');
  },
};
