import { Express } from 'express';
import UserRouter from './users';

const initialRoutes = (app: Express): void => {
  app.use('/api/user', UserRouter);
};

export default initialRoutes;
