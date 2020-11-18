import express from 'express';
import passport from 'passport';
import { UserController } from '../controllers';

const userRouter = express.Router();

// TODO: доделать авторизацию пользователя JWT Token
userRouter.get('', passport.authenticate('jwt', { session: false }), UserController.UserGet.me);

// TODO: доделать регистрацию пользователя
userRouter.post(
  '',
  passport.authenticate('jwt', { session: false }),
  UserController.UserPost.register
);

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  UserController.UserPost.login
);
export default userRouter;
