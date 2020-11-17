import express from 'express';
import passport from 'passport';
import { UserController } from '../controllers';

const userRouter = express.Router();

// TODO: доделать авторизацию пользователя JWT Token
// userRoute.get('', passport.authenticate('jwt', { session: false }), UserController.UserGet.me);

// TODO: доделать регистрацию пользователя
userRouter.post('', UserController.UserPost.register);

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  UserController.UserPost.login
);
export default userRouter;
