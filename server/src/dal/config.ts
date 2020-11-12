import { Sequelize } from 'sequelize';

// TODO: вынести в отдельный конфиг
const sequelize = new Sequelize({
  database: 'smartru_board',
  username: 'root',
  password: 'rjkjyrf2',
  dialect: 'mysql',
  host: '127.0.0.1',
});

export default sequelize;
