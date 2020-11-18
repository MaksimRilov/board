import passport from 'passport';
import passportJWT from 'passport-jwt';
import secret from './secret';
import User from '../dal/models/user';

export default class PassportJWTStrategy {
  public static init(): void {
    passport.use(
      new passportJWT.Strategy(
        {
          jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: secret,
        },
        (payload, done) => {
          User.findOne({
            where: {
              id: payload.id,
            },
            include: [User.associations.roles],
          })
            .then((user) => {
              if (user) {
                return done(null, user);
              }
              return done(null, false);
            })
            .catch((error) => {
              console.log(error);
              return done(error, false);
            });
        }
      )
    );
  }
}
