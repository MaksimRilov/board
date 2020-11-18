import express, { Express } from 'express';
import { Sequelize } from 'sequelize';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import sequelizeConnect from './dal/config';
import routes from './routes';
import PassportLocalStrategy from './passport/local';
import PassportJWTStrategy from './passport/jwt';

const PORT = 3000; // TODO: вынести в ENV

class Server {
  private app: Express;

  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
    this.app = express();
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
        exposedHeaders: 'Authorization',
      })
    );
    this.app.use(
      urlencoded({
        extended: true,
      })
    );
    this.app.use(json());

    this.app.use(passport.initialize());
    PassportJWTStrategy.init();
    PassportLocalStrategy.init();

    // TODO: натсроить логирование
    routes(this.app);

    this.app.listen(PORT, () =>
      console.log('info', `--> Server successfully started at port ${PORT}`)
    );

    try {
      this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

// eslint-disable-next-line no-new
new Server(sequelizeConnect);
