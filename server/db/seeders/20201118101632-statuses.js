module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'statuses',
      [
        {
          name: 'Не рассмотренно',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Принято к рассмотрению',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Запланировано',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'В работе',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Выполнено',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Отклонено',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('statuses', null);
  },
};
