import { Express } from 'express';
import UserRouter from './users';
import TaskRouter from './tasks';

const initialRoutes = (app: Express): void => {
  app.use('/api/user', UserRouter);
  app.use('/api/task', TaskRouter);
};

export default initialRoutes;
