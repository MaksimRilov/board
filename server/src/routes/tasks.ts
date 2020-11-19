import express from 'express';
import passport from 'passport';

import { TaskController } from '../controllers/index';

const taskRouter = express.Router();

taskRouter.post('', TaskController.TaskPost.createTask);

taskRouter.get(
  '/pending-task',
  passport.authenticate('jwt', { session: false }),
  TaskController.TaskGet.getAllPendingTask
);

export default taskRouter;
