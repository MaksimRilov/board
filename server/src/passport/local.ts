import LocalStrategy from 'passport-local';
import passport from 'passport';
import User from '../dal/models/user';

export default class PassportLocalStrategy {
  public static init(): void {
    passport.use(
      new LocalStrategy.Strategy((username, password, done) => {
        User.findUser(username)
          .then((user) => {
            if (!user) {
              return done(null, false);
            }
            if (!User.verifyPassword(password, user)) {
              return done(null, false);
            }
            console.log('user', user);
            return done(null, user);
          })
          .catch((err) => done(err));
      })
    );
  }
}
