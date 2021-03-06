import express from 'express';
import passport from 'passport';
import { UserController } from '../controllers';

const userRouter = express.Router();

userRouter.get('/me', passport.authenticate('jwt', { session: false }), UserController.UserGet.me);

userRouter.get(
  '',
  passport.authenticate('jwt', { session: false }),
  UserController.UserGet.allUsers
);

userRouter.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  UserController.UserPost.register
);

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  UserController.UserPost.login
);
export default userRouter;
