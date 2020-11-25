import { Request, Response } from 'express';
import User from '../../dal/models/user';

// eslint-disable-next-line import/prefer-default-export
export const me = (req: Request, res: Response): void => {
  const { user } = req;

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send({ message: 'Произошла ошибка' });
  }
};

export const allUsers = (req: Request, res: Response): void => {
  User.findAll({
    attributes: {
      exclude: ['password', 'salt', 'roleId', 'createdAt', 'updatedAt', 'RoleId'],
    },
    include: [{ association: User.associations.roles, attributes: ['id', 'name'] }],
  })
    .then((users) => {
      if (users) {
        res.status(200).send(users);
      }
    })
    .catch((error) => res.status(400).send({ error }));
};
