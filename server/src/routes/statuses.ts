import express from 'express';
import passport from 'passport';

import { StatusController } from '../controllers';

const statusRouter = express.Router();

statusRouter.get(
  '',
  passport.authenticate('jwt', { session: false }),
  StatusController.StatusGet.getAllStatus
);

export default statusRouter;
