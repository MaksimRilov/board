import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../dal/models/user';
import Role from '../../dal/models/role';
import secret from '../../passport/secret';

// eslint-disable-next-line import/prefer-default-export
export const register = (req: Request, res: Response): void => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { login, email, password, firstName, lastName, roleId = 1 } = req.body;

  User.usernameIsFree(login, email)
    .then((user) => {
      if (!user) {
        const salt = User.genSalt(10);
        const hashPassword = User.createPassword(password, salt);
        User.create({
          login,
          email,
          password: hashPassword,
          firstName,
          lastName,
          roleId,
          salt,
        })
          .then((createdUser) => {
            if (createdUser) {
              res.status(200).send({
                id: createdUser.id,
                login: createdUser.login,
                email: createdUser.email,
                lastName: createdUser.lastName,
                firstName: createdUser.firstName,
                password,
              });
            }
          })
          .catch((error) => res.status(400).send({ error }));
      } else {
        res.status(200).send(null);
      }
    })
    .catch((error) => res.status(400).send({ error }));
};

export const login = (req: Request, res: Response): void => {
  const { user } = req;

  if (user) {
    const payload = {
      id: user.id,
      roleId: user.roleId,
    };

    const token = jwt.sign(payload, secret);
    res.status(200).header('Authorization', `Bearer ${token}`).send({
      id: user.id,
      email: user.email,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.roles?.name,
    });
  } else {
    res.status(200).send(null);
  }
};
