import { Request, Response } from 'express';
// import { findUser } from '../../dal/models/user';

// eslint-disable-next-line import/prefer-default-export
export const me = (req: Request, res: Response): void => {
  const { user } = req;

  if (user) {
    res.status(200).send({
      id: user.id,
      email: user.email,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.roles?.name,
    });
  } else {
    res.status(400).send({ message: 'Произошла ошибка' });
  }
};
