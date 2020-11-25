import express from 'express';
import passport from 'passport';

import { TaskController } from '../controllers';

const taskRouter = express.Router();

taskRouter.post('', TaskController.TaskPost.createTask);

taskRouter.put(
  '/:taskId',
  passport.authenticate('jwt', { session: false }),
  TaskController.TaskPut.editTask
);

taskRouter.put(
  '/reject/:taskId',
  passport.authenticate('jwt', { session: false }),
  TaskController.TaskPut.rejectTask
);

taskRouter.get(
  '/pending-task',
  passport.authenticate('jwt', { session: false }),
  TaskController.TaskGet.getAllPendingTask
);

export default taskRouter;
