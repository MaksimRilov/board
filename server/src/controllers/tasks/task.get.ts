import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Task from '../../dal/models/task';
import User from '../../dal/models/user';

// eslint-disable-next-line import/prefer-default-export
export const getAllPendingTask = (req: Request, res: Response): void => {
  Task.findAll({
    where: {
      statusId: 1,
    },
    include: [{ association: Task.associations.statuses, attributes: ['id', 'name'] }],
    attributes: { exclude: ['StatusId'] },
  })
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((error) => res.status(400).send({ error }));
};

export const getAllApprovedTask = (req: Request, res: Response): void => {
  Task.findAll({
    where: {
      [Op.and]: [{ statusId: { [Op.not]: 1 } }, { statusId: { [Op.not]: 6 } }],
    },
    include: [
      { association: Task.associations.statuses, attributes: ['id', 'name'] },
      {
        association: Task.associations.users,
        attributes: ['id', 'email', 'firstName', 'lastName'],
        include: [{ association: User.associations.roles, attributes: ['id', 'name'] }],
      },
    ],
    attributes: { exclude: ['StatusId'] },
  })
    .then((tasks) => {
      if (tasks) {
        res.status(200).send(tasks);
      }
    })
    .catch((error) => res.status(400).send({ error }));
};
