import { Request, Response } from 'express';

import Task from '../../dal/models/task';

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
