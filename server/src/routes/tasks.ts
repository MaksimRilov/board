import express from 'express';

import { TaskController } from '../controllers/index';

const taskRouter = express.Router();

taskRouter.post('', TaskController.TaskPost.createTask);

export default taskRouter;
