import { Express } from 'express';
import UserRouter from './users';
import TaskRouter from './tasks';
import StatusRouter from './statuses';

const initialRoutes = (app: Express): void => {
  app.use('/api/user', UserRouter);
  app.use('/api/task', TaskRouter);
  app.use('/api/status', StatusRouter);
};

export default initialRoutes;
